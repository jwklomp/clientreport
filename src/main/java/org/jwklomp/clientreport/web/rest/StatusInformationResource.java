package org.jwklomp.clientreport.web.rest;

import org.jwklomp.clientreport.domain.StatusInformation;
import org.jwklomp.clientreport.service.StatusInformationService;
import org.jwklomp.clientreport.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.jwklomp.clientreport.domain.StatusInformation}.
 */
@RestController
@RequestMapping("/api")
public class StatusInformationResource {

    private final Logger log = LoggerFactory.getLogger(StatusInformationResource.class);

    private static final String ENTITY_NAME = "statusInformation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StatusInformationService statusInformationService;

    public StatusInformationResource(StatusInformationService statusInformationService) {
        this.statusInformationService = statusInformationService;
    }

    /**
     * {@code POST  /status-informations} : Create a new statusInformation.
     *
     * @param statusInformation the statusInformation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new statusInformation, or with status {@code 400 (Bad Request)} if the statusInformation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/status-informations")
    public ResponseEntity<StatusInformation> createStatusInformation(@Valid @RequestBody StatusInformation statusInformation) throws URISyntaxException {
        log.debug("REST request to save StatusInformation : {}", statusInformation);
        if (statusInformation.getId() != null) {
            throw new BadRequestAlertException("A new statusInformation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StatusInformation result = statusInformationService.save(statusInformation);
        return ResponseEntity.created(new URI("/api/status-informations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /status-informations} : Updates an existing statusInformation.
     *
     * @param statusInformation the statusInformation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated statusInformation,
     * or with status {@code 400 (Bad Request)} if the statusInformation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the statusInformation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/status-informations")
    public ResponseEntity<StatusInformation> updateStatusInformation(@Valid @RequestBody StatusInformation statusInformation) throws URISyntaxException {
        log.debug("REST request to update StatusInformation : {}", statusInformation);
        if (statusInformation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StatusInformation result = statusInformationService.save(statusInformation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, statusInformation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /status-informations} : get all the statusInformations.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of statusInformations in body.
     */
    @GetMapping("/status-informations")
    public List<StatusInformation> getAllStatusInformations() {
        log.debug("REST request to get all StatusInformations");
        return statusInformationService.findAll();
    }

    /**
     * {@code GET  /status-informations/:id} : get the "id" statusInformation.
     *
     * @param id the id of the statusInformation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the statusInformation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/status-informations/{id}")
    public ResponseEntity<StatusInformation> getStatusInformation(@PathVariable Long id) {
        log.debug("REST request to get StatusInformation : {}", id);
        Optional<StatusInformation> statusInformation = statusInformationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(statusInformation);
    }

    /**
     * {@code DELETE  /status-informations/:id} : delete the "id" statusInformation.
     *
     * @param id the id of the statusInformation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/status-informations/{id}")
    public ResponseEntity<Void> deleteStatusInformation(@PathVariable Long id) {
        log.debug("REST request to delete StatusInformation : {}", id);
        statusInformationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
