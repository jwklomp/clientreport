package org.jwklomp.clientreport.service;

import org.jwklomp.clientreport.domain.StatusInformation;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link StatusInformation}.
 */
public interface StatusInformationService {

    /**
     * Save a statusInformation.
     *
     * @param statusInformation the entity to save.
     * @return the persisted entity.
     */
    StatusInformation save(StatusInformation statusInformation);

    /**
     * Get all the statusInformations.
     *
     * @return the list of entities.
     */
    List<StatusInformation> findAll();


    /**
     * Get the "id" statusInformation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StatusInformation> findOne(Long id);

    /**
     * Delete the "id" statusInformation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
