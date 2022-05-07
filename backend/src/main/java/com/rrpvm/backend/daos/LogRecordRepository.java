package com.rrpvm.backend.daos;

import com.rrpvm.backend.entities.LogRecord;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface LogRecordRepository extends CrudRepository<LogRecord,Long> {
    List<LogRecord>findAllByBannerIdAndRequestTimeBefore(Long bannerId, Date maxCooldown);
}
