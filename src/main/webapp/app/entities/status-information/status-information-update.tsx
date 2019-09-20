import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IReport } from 'app/shared/model/report.model';
import { getEntities as getReports } from 'app/entities/report/report.reducer';
import { getEntity, updateEntity, createEntity, reset } from './status-information.reducer';
import { IStatusInformation } from 'app/shared/model/status-information.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStatusInformationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IStatusInformationUpdateState {
  isNew: boolean;
  reportId: string;
}

export class StatusInformationUpdate extends React.Component<IStatusInformationUpdateProps, IStatusInformationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      reportId: '0',
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

    this.props.getReports();
  }

  saveEntity = (event, errors, values) => {
    values.dateCreated = convertDateTimeToServer(values.dateCreated);

    if (errors.length === 0) {
      const { statusInformationEntity } = this.props;
      const entity = {
        ...statusInformationEntity,
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
    this.props.history.push('/entity/status-information');
  };

  render() {
    const { statusInformationEntity, reports, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clientreportApp.statusInformation.home.createOrEditLabel">
              <Translate contentKey="clientreportApp.statusInformation.home.createOrEditLabel">
                Create or edit a StatusInformation
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : statusInformationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="status-information-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="status-information-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateCreatedLabel" for="status-information-dateCreated">
                    <Translate contentKey="clientreportApp.statusInformation.dateCreated">Date Created</Translate>
                  </Label>
                  <AvInput
                    id="status-information-dateCreated"
                    type="datetime-local"
                    className="form-control"
                    name="dateCreated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.statusInformationEntity.dateCreated)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="messageLabel" for="status-information-message">
                    <Translate contentKey="clientreportApp.statusInformation.message">Message</Translate>
                  </Label>
                  <AvField
                    id="status-information-message"
                    type="text"
                    name="message"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="status-information-report">
                    <Translate contentKey="clientreportApp.statusInformation.report">Report</Translate>
                  </Label>
                  <AvInput id="status-information-report" type="select" className="form-control" name="report.id">
                    <option value="" key="0" />
                    {reports
                      ? reports.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/status-information" replace color="info">
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
  reports: storeState.report.entities,
  statusInformationEntity: storeState.statusInformation.entity,
  loading: storeState.statusInformation.loading,
  updating: storeState.statusInformation.updating,
  updateSuccess: storeState.statusInformation.updateSuccess
});

const mapDispatchToProps = {
  getReports,
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
)(StatusInformationUpdate);
