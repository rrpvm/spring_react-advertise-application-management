package com.rrpvm.backend.entities;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "log_records")
public class LogRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long logId;
    @Column(name = "selected_banner_id")
    private Long bannerId;
    @Column(name = "request_ip_address")
    private String requestIpAddress;
    @Column(name = "request_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date requestTime;
    @Column(name = "user_agent")
    private String userAgent;
    @Column(name = "selected_banner_category_ids")
    @ElementCollection
    @CollectionTable(
            name = "record_category_ids",
            joinColumns = @JoinColumn(name = "log_id")
    )
    private List<Long> categoryIds;//айдишники связанных категорий с выбранным баннером
    @Column(name = "selected_banner_price")
    private Double bannerPrice;
    @Column(name = "no_content_reason", columnDefinition = "bit default false")
    private boolean bNoContentReason;
    public LogRecord(Long logId, Long bannerId, String requestIpAddress, Date requestTime, String userAgent, List<Long> categoryIds, Double bannerPrice, boolean bNoContentReason) {
        this.logId = logId;
        this.bannerId = bannerId;
        this.requestIpAddress = requestIpAddress;
        this.userAgent = userAgent;
        this.categoryIds = categoryIds;
        this.bannerPrice = bannerPrice;
        this.bNoContentReason = bNoContentReason;
        this.requestTime = requestTime;
    }

    public LogRecord(Long bannerId, String requestIpAddress, Date requestTime, String userAgent, List<Long> categoryIds, Double bannerPrice) {
        this.logId = -1l;
        this.bannerId = bannerId;
        this.requestIpAddress = requestIpAddress;
        this.userAgent = userAgent;
        this.categoryIds = categoryIds;
        this.bannerPrice = bannerPrice;
        this.requestTime = requestTime;
        this.bNoContentReason = false;
    }

    public LogRecord(String requestIpAddress, Date requestTime, String userAgent) {
        this.requestIpAddress = requestIpAddress;
        this.requestTime = requestTime;
        this.userAgent = userAgent;
        this.logId = -1l;
        this.bannerId = null;
        this.categoryIds = null;
        this.bannerPrice = null;
        this.bNoContentReason = true;
    }

    public LogRecord() {
    }

    public Long getLogId() {
        return logId;
    }

    public void setLogId(Long logId) {
        this.logId = logId;
    }

    public Long getBannerId() {
        return bannerId;
    }

    public void setBannerId(Long bannerId) {
        this.bannerId = bannerId;
    }

    public String getRequestIpAddress() {
        return requestIpAddress;
    }

    public void setRequestIpAddress(String requestIpAddress) {
        this.requestIpAddress = requestIpAddress;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public List<Long> getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(List<Long> categoryIds) {
        this.categoryIds = categoryIds;
    }

    public Double getBannerPrice() {
        return bannerPrice;
    }

    public void setBannerPrice(Double bannerPrice) {
        this.bannerPrice = bannerPrice;
    }

    public boolean isbNoContentReason() {
        return bNoContentReason;
    }

    public void setbNoContentReason(boolean bNoContentReason) {
        this.bNoContentReason = bNoContentReason;
    }

    public Date getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(Date requestTime) {
        this.requestTime = requestTime;
    }
}
