package org.jwklomp.clientreport.web.rest;

import org.jwklomp.clientreport.ClientreportApp;
import org.jwklomp.clientreport.domain.StatusInformation;
import org.jwklomp.clientreport.repository.StatusInformationRepository;
import org.jwklomp.clientreport.service.StatusInformationService;
import org.jwklomp.clientreport.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.jwklomp.clientreport.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link StatusInformationResource} REST controller.
 */
@SpringBootTest(classes = ClientreportApp.class)
public class StatusInformationResourceIT {

    private static final Instant DEFAULT_DATE_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_DATE_CREATED = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    @Autowired
    private StatusInformationRepository statusInformationRepository;

    @Autowired
    private StatusInformationService statusInformationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restStatusInformationMockMvc;

    private StatusInformation statusInformation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StatusInformationResource statusInformationResource = new StatusInformationResource(statusInformationService);
        this.restStatusInformationMockMvc = MockMvcBuilders.standaloneSetup(statusInformationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StatusInformation createEntity(EntityManager em) {
        StatusInformation statusInformation = new StatusInformation()
            .dateCreated(DEFAULT_DATE_CREATED)
            .message(DEFAULT_MESSAGE);
        return statusInformation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StatusInformation createUpdatedEntity(EntityManager em) {
        StatusInformation statusInformation = new StatusInformation()
            .dateCreated(UPDATED_DATE_CREATED)
            .message(UPDATED_MESSAGE);
        return statusInformation;
    }

    @BeforeEach
    public void initTest() {
        statusInformation = createEntity(em);
    }

    @Test
    @Transactional
    public void createStatusInformation() throws Exception {
        int databaseSizeBeforeCreate = statusInformationRepository.findAll().size();

        // Create the StatusInformation
        restStatusInformationMockMvc.perform(post("/api/status-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statusInformation)))
            .andExpect(status().isCreated());

        // Validate the StatusInformation in the database
        List<StatusInformation> statusInformationList = statusInformationRepository.findAll();
        assertThat(statusInformationList).hasSize(databaseSizeBeforeCreate + 1);
        StatusInformation testStatusInformation = statusInformationList.get(statusInformationList.size() - 1);
        assertThat(testStatusInformation.getDateCreated()).isEqualTo(DEFAULT_DATE_CREATED);
        assertThat(testStatusInformation.getMessage()).isEqualTo(DEFAULT_MESSAGE);
    }

    @Test
    @Transactional
    public void createStatusInformationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = statusInformationRepository.findAll().size();

        // Create the StatusInformation with an existing ID
        statusInformation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStatusInformationMockMvc.perform(post("/api/status-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statusInformation)))
            .andExpect(status().isBadRequest());

        // Validate the StatusInformation in the database
        List<StatusInformation> statusInformationList = statusInformationRepository.findAll();
        assertThat(statusInformationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateCreatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = statusInformationRepository.findAll().size();
        // set the field null
        statusInformation.setDateCreated(null);

        // Create the StatusInformation, which fails.

        restStatusInformationMockMvc.perform(post("/api/status-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statusInformation)))
            .andExpect(status().isBadRequest());

        List<StatusInformation> statusInformationList = statusInformationRepository.findAll();
        assertThat(statusInformationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMessageIsRequired() throws Exception {
        int databaseSizeBeforeTest = statusInformationRepository.findAll().size();
        // set the field null
        statusInformation.setMessage(null);

        // Create the StatusInformation, which fails.

        restStatusInformationMockMvc.perform(post("/api/status-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statusInformation)))
            .andExpect(status().isBadRequest());

        List<StatusInformation> statusInformationList = statusInformationRepository.findAll();
        assertThat(statusInformationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStatusInformations() throws Exception {
        // Initialize the database
        statusInformationRepository.saveAndFlush(statusInformation);

        // Get all the statusInformationList
        restStatusInformationMockMvc.perform(get("/api/status-informations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(statusInformation.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateCreated").value(hasItem(DEFAULT_DATE_CREATED.toString())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getStatusInformation() throws Exception {
        // Initialize the database
        statusInformationRepository.saveAndFlush(statusInformation);

        // Get the statusInformation
        restStatusInformationMockMvc.perform(get("/api/status-informations/{id}", statusInformation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(statusInformation.getId().intValue()))
            .andExpect(jsonPath("$.dateCreated").value(DEFAULT_DATE_CREATED.toString()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStatusInformation() throws Exception {
        // Get the statusInformation
        restStatusInformationMockMvc.perform(get("/api/status-informations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStatusInformation() throws Exception {
        // Initialize the database
        statusInformationService.save(statusInformation);

        int databaseSizeBeforeUpdate = statusInformationRepository.findAll().size();

        // Update the statusInformation
        StatusInformation updatedStatusInformation = statusInformationRepository.findById(statusInformation.getId()).get();
        // Disconnect from session so that the updates on updatedStatusInformation are not directly saved in db
        em.detach(updatedStatusInformation);
        updatedStatusInformation
            .dateCreated(UPDATED_DATE_CREATED)
            .message(UPDATED_MESSAGE);

        restStatusInformationMockMvc.perform(put("/api/status-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStatusInformation)))
            .andExpect(status().isOk());

        // Validate the StatusInformation in the database
        List<StatusInformation> statusInformationList = statusInformationRepository.findAll();
        assertThat(statusInformationList).hasSize(databaseSizeBeforeUpdate);
        StatusInformation testStatusInformation = statusInformationList.get(statusInformationList.size() - 1);
        assertThat(testStatusInformation.getDateCreated()).isEqualTo(UPDATED_DATE_CREATED);
        assertThat(testStatusInformation.getMessage()).isEqualTo(UPDATED_MESSAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingStatusInformation() throws Exception {
        int databaseSizeBeforeUpdate = statusInformationRepository.findAll().size();

        // Create the StatusInformation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStatusInformationMockMvc.perform(put("/api/status-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statusInformation)))
            .andExpect(status().isBadRequest());

        // Validate the StatusInformation in the database
        List<StatusInformation> statusInformationList = statusInformationRepository.findAll();
        assertThat(statusInformationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStatusInformation() throws Exception {
        // Initialize the database
        statusInformationService.save(statusInformation);

        int databaseSizeBeforeDelete = statusInformationRepository.findAll().size();

        // Delete the statusInformation
        restStatusInformationMockMvc.perform(delete("/api/status-informations/{id}", statusInformation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StatusInformation> statusInformationList = statusInformationRepository.findAll();
        assertThat(statusInformationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StatusInformation.class);
        StatusInformation statusInformation1 = new StatusInformation();
        statusInformation1.setId(1L);
        StatusInformation statusInformation2 = new StatusInformation();
        statusInformation2.setId(statusInformation1.getId());
        assertThat(statusInformation1).isEqualTo(statusInformation2);
        statusInformation2.setId(2L);
        assertThat(statusInformation1).isNotEqualTo(statusInformation2);
        statusInformation1.setId(null);
        assertThat(statusInformation1).isNotEqualTo(statusInformation2);
    }
}
