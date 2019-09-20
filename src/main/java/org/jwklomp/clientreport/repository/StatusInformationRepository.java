package org.jwklomp.clientreport.repository;
import org.jwklomp.clientreport.domain.StatusInformation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StatusInformation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StatusInformationRepository extends JpaRepository<StatusInformation, Long> {

}
