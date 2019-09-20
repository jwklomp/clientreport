package org.jwklomp.clientreport.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import org.jwklomp.clientreport.domain.enumeration.ReportStatus;

/**
 * A Report.
 */
@Entity
@Table(name = "report")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Report implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "date_created", nullable = false)
    private Instant dateCreated;

    @NotNull
    @Column(name = "date_last_modified", nullable = false)
    private Instant dateLastModified;

    @NotNull
    @Column(name = "content", nullable = false)
    private String content;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ReportStatus status;

    @ManyToOne
    @JsonIgnoreProperties("reports")
    private Client client;

    @OneToMany(mappedBy = "report")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<StatusInformation> statusInformations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Report name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public Report dateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
        return this;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Instant getDateLastModified() {
        return dateLastModified;
    }

    public Report dateLastModified(Instant dateLastModified) {
        this.dateLastModified = dateLastModified;
        return this;
    }

    public void setDateLastModified(Instant dateLastModified) {
        this.dateLastModified = dateLastModified;
    }

    public String getContent() {
        return content;
    }

    public Report content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ReportStatus getStatus() {
        return status;
    }

    public Report status(ReportStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ReportStatus status) {
        this.status = status;
    }

    public Client getClient() {
        return client;
    }

    public Report client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Set<StatusInformation> getStatusInformations() {
        return statusInformations;
    }

    public Report statusInformations(Set<StatusInformation> statusInformations) {
        this.statusInformations = statusInformations;
        return this;
    }

    public Report addStatusInformation(StatusInformation statusInformation) {
        this.statusInformations.add(statusInformation);
        statusInformation.setReport(this);
        return this;
    }

    public Report removeStatusInformation(StatusInformation statusInformation) {
        this.statusInformations.remove(statusInformation);
        statusInformation.setReport(null);
        return this;
    }

    public void setStatusInformations(Set<StatusInformation> statusInformations) {
        this.statusInformations = statusInformations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Report)) {
            return false;
        }
        return id != null && id.equals(((Report) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Report{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", dateLastModified='" + getDateLastModified() + "'" +
            ", content='" + getContent() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
