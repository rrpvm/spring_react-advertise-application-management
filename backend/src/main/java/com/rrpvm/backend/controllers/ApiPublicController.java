package com.rrpvm.backend.controllers;

import com.rrpvm.backend.daos.BannerRepository;
import com.rrpvm.backend.daos.CategoryRepository;
import com.rrpvm.backend.daos.LogRecordRepository;
import com.rrpvm.backend.entities.Banner;
import com.rrpvm.backend.entities.Category;
import com.rrpvm.backend.entities.LogRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/")
public class ApiPublicController {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private BannerRepository bannerRepository;
    @Autowired
    private LogRecordRepository logRecordRepository;

    @GetMapping("/api/public/getCategories")
    private List<Category> responseCategories() {
        List<Category> categories = categoryRepository.findAllByDeleted(false);
        return categories;
    }

    private ResponseEntity<String> responseNoContent(
            @NotNull String ipAddress,
            @NotNull Date requestTime,
            @NotNull String userAgent) {
        logRecordRepository.save(new LogRecord(ipAddress, requestTime, userAgent));
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    private Optional<Banner> getRequiredBanner(@NotNull String[] queryParameters, @NotNull String USER_AGENT, @NotNull String REMOTE_IP) {    // можно использовать ORDER BY price, но это - путь слабых
        double maxPrice = -1.0;
        Long bannerId = -1L;
        for (String requestId : queryParameters) {
            Category category = categoryRepository.findCategoryByRequestId(requestId);//not null  and not deleted 100%
            if (category == null || category.isDeleted()) continue;
            List<Banner> allBannersWithThisCategory = bannerRepository.findAllByCategoriesAndIsDeleted(category, false);
            if (allBannersWithThisCategory == null || allBannersWithThisCategory.isEmpty()) continue;
            double ctxMaxPrice = -1.0;//inner iterable max price
            Long ctxBannerId = -1l;//inner iterable required banner id
            for (Banner bannerCtx : allBannersWithThisCategory) {
                final LocalDateTime now = java.time.LocalDateTime.now();
                final Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
                List<LogRecord> records = logRecordRepository.findAllByBannerIdAndRequestTimeBefore(bannerCtx.getId(), date);
                boolean bMathces = true;
                for (LogRecord record : records) {
                    if (record.getUserAgent().equals(USER_AGENT) && record.getRequestIpAddress().equals(REMOTE_IP)) {
                        bMathces = false;
                        break;
                    }
                }
                if (!bMathces) continue;
                ctxMaxPrice = Math.max(ctxMaxPrice, bannerCtx.getPrice());
                if (ctxMaxPrice == bannerCtx.getPrice()) { // changed the same situation
                    ctxBannerId = bannerCtx.getId();
                }
            }
            maxPrice = Math.max(maxPrice, ctxMaxPrice);
            if (maxPrice == ctxMaxPrice) { // changed the same situation
                bannerId = ctxBannerId;
            }
        }
        return bannerRepository.findById(bannerId);
    }

    @GetMapping("/bid")
    private ResponseEntity<String> responseBannerText(
            HttpServletRequest httpServletRequest,
            @RequestHeader(name = "user-agent", required = true) String userAgent,
            @RequestHeader(name = "x-forwarded-for", required = false) String remoteIP,
            @RequestParam(name = "cat", required = false) String[] params
    ) {
        final Date requestTime = new Date(Instant.now().toEpochMilli());
        if (remoteIP == null) {
            remoteIP = httpServletRequest.getRemoteAddr();
        }
        if (params == null || params.length == 0) return responseNoContent(remoteIP, requestTime, userAgent);
        Optional<Banner> requiredBanner = getRequiredBanner(params, userAgent, remoteIP);
        if (requiredBanner.isEmpty()) return responseNoContent(remoteIP, requestTime, userAgent);
        logRecordRepository.save(new LogRecord(
                requiredBanner.get().getId(),
                remoteIP,
                requestTime,
                userAgent,
                requiredBanner.get().getLinkedCategories().stream().map(Category::getId).collect(Collectors.toList()),
                requiredBanner.get().getPrice()
        ));
        return ResponseEntity.ok(requiredBanner.get().getTextField());
    }
}
