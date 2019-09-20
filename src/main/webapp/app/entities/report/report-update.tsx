import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IClient } from 'app/shared/model/client.model';
import { getEntities as getClients } from 'app/entities/client/client.reducer';
import { getEntity, updateEntity, createEntity, reset } from './report.reducer';
import { IReport } from 'app/shared/model/report.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReportUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IReportUpdateState {
  isNew: boolean;
  clientId: string;
}

export class ReportUpdate extends React.Component<IReportUpdateProps, IReportUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getClients();
  }

  saveEntity = (event, errors, values) => {
    values.dateCreated = convertDateTimeToServer(values.dateCreated);
    values.dateLastModified = convertDateTimeToServer(values.dateLastModified);

    if (errors.length === 0) {
      const { reportEntity } = this.props;
      const entity = {
        ...reportEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/report');
  };

  render() {
    const { reportEntity, clients, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clientreportApp.report.home.createOrEditLabel">
              <Translate contentKey="clientreportApp.report.home.createOrEditLabel">Create or edit a Report</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : reportEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="report-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="report-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="report-name">
                    <Translate contentKey="clientreportApp.report.name">Name</Translate>
                  </Label>
                  <AvField
                    id="report-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateCreatedLabel" for="report-dateCreated">
                    <Translate contentKey="clientreportApp.report.dateCreated">Date Created</Translate>
                  </Label>
                  <AvInput
                    id="report-dateCreated"
                    type="datetime-local"
                    className="form-control"
                    name="dateCreated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.reportEntity.dateCreated)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLastModifiedLabel" for="report-dateLastModified">
                    <Translate contentKey="clientreportApp.report.dateLastModified">Date Last Modified</Translate>
                  </Label>
                  <AvInput
                    id="report-dateLastModified"
                    type="datetime-local"
                    className="form-control"
                    name="dateLastModified"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.reportEntity.dateLastModified)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="contentLabel" for="report-content">
                    <Translate contentKey="clientreportApp.report.content">Content</Translate>
                  </Label>
                  <AvField
                    id="report-content"
                    type="text"
                    name="content"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="report-status">
                    <Translate contentKey="clientreportApp.report.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="report-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && reportEntity.status) || 'DRAFT'}
                  >
                    <option value="DRAFT">{translate('clientreportApp.ReportStatus.DRAFT')}</option>
                    <option value="COMPLETED">{translate('clientreportApp.ReportStatus.COMPLETED')}</option>
                    <option value="SENT">{translate('clientreportApp.ReportStatus.SENT')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="report-client">
                    <Translate contentKey="clientreportApp.report.client">Client</Translate>
                  </Label>
                  <AvInput id="report-client" type="select" className="form-control" name="client.id">
                    <option value="" key="0" />
                    {clients
                      ? clients.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/report" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  clients: storeState.client.entities,
  reportEntity: storeState.report.entity,
  loading: storeState.report.loading,
  updating: storeState.report.updating,
  updateSuccess: storeState.report.updateSuccess
});

const mapDispatchToProps = {
  getClients,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportUpdate);
