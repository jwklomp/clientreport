package org.jwklomp.clientreport.service.impl;

import org.jwklomp.clientreport.service.StatusInformationService;
import org.jwklomp.clientreport.domain.StatusInformation;
import org.jwklomp.clientreport.repository.StatusInformationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link StatusInformation}.
 */
@Service
@Transactional
public class StatusInformationServiceImpl implements StatusInformationService {

    private final Logger log = LoggerFactory.getLogger(StatusInformationServiceImpl.class);

    private final StatusInformationRepository statusInformationRepository;

    public StatusInformationServiceImpl(StatusInformationRepository statusInformationRepository) {
        this.statusInformationRepository = statusInformationRepository;
    }

    /**
     * Save a statusInformation.
     *
     * @param statusInformation the entity to save.
     * @return the persisted entity.
     */
    @Override
    public StatusInformation save(StatusInformation statusInformation) {
        log.debug("Request to save StatusInformation : {}", statusInformation);
        return statusInformationRepository.save(statusInformation);
    }

    /**
     * Get all the statusInformations.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<StatusInformation> findAll() {
        log.debug("Request to get all StatusInformations");
        return statusInformationRepository.findAll();
    }


    /**
     * Get one statusInformation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<StatusInformation> findOne(Long id) {
        log.debug("Request to get StatusInformation : {}", id);
        return statusInformationRepository.findById(id);
    }

    /**
     * Delete the statusInformation by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete StatusInformation : {}", id);
        statusInformationRepository.deleteById(id);
    }
}
