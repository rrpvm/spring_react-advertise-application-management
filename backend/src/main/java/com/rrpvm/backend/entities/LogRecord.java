package com.rrpvm.backend.entities;

import java.sql.Date;
import java.util.List;

public class LogRecord {
    private String requestIpAddress;
    private String userAgent;
    private Date requestTime;
    private Integer bannerId;
    private List<Integer> categoriesId;
    private Integer bannerPrice;
    //boolean successRequest //204 -> false
}
