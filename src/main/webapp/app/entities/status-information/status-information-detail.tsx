import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './status-information.reducer';
import { IStatusInformation } from 'app/shared/model/status-information.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStatusInformationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StatusInformationDetail extends React.Component<IStatusInformationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { statusInformationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clientreportApp.statusInformation.detail.title">StatusInformation</Translate> [
            <b>{statusInformationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="dateCreated">
                <Translate contentKey="clientreportApp.statusInformation.dateCreated">Date Created</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={statusInformationEntity.dateCreated} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="message">
                <Translate contentKey="clientreportApp.statusInformation.message">Message</Translate>
              </span>
            </dt>
            <dd>{statusInformationEntity.message}</dd>
            <dt>
              <Translate contentKey="clientreportApp.statusInformation.report">Report</Translate>
            </dt>
            <dd>{statusInformationEntity.report ? statusInformationEntity.report.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/status-information" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/status-information/${statusInformationEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ statusInformation }: IRootState) => ({
  statusInformationEntity: statusInformation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusInformationDetail);
