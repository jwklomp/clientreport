package org.jwklomp.clientreport.service.impl;

import org.jwklomp.clientreport.service.ReportService;
import org.jwklomp.clientreport.domain.Report;
import org.jwklomp.clientreport.repository.ReportRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Report}.
 */
@Service
@Transactional
public class ReportServiceImpl implements ReportService {

    private final Logger log = LoggerFactory.getLogger(ReportServiceImpl.class);

    private final ReportRepository reportRepository;

    public ReportServiceImpl(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    /**
     * Save a report.
     *
     * @param report the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Report save(Report report) {
        log.debug("Request to save Report : {}", report);
        return reportRepository.save(report);
    }

    /**
     * Get all the reports.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Report> findAll() {
        log.debug("Request to get all Reports");
        return reportRepository.findAll();
    }


    /**
     * Get one report by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Report> findOne(Long id) {
        log.debug("Request to get Report : {}", id);
        return reportRepository.findById(id);
    }

    /**
     * Delete the report by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Report : {}", id);
        reportRepository.deleteById(id);
    }
}
