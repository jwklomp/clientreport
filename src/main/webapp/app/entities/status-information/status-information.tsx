import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './status-information.reducer';
import { IStatusInformation } from 'app/shared/model/status-information.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStatusInformationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class StatusInformation extends React.Component<IStatusInformationProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { statusInformationList, match } = this.props;
    return (
      <div>
        <h2 id="status-information-heading">
          <Translate contentKey="clientreportApp.statusInformation.home.title">Status Informations</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="clientreportApp.statusInformation.home.createLabel">Create a new Status Information</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {statusInformationList && statusInformationList.length > 0 ? (
            <Table responsive aria-describedby="status-information-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clientreportApp.statusInformation.dateCreated">Date Created</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clientreportApp.statusInformation.message">Message</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clientreportApp.statusInformation.report">Report</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {statusInformationList.map((statusInformation, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${statusInformation.id}`} color="link" size="sm">
                        {statusInformation.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={statusInformation.dateCreated} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{statusInformation.message}</td>
                    <td>
                      {statusInformation.report ? (
                        <Link to={`report/${statusInformation.report.id}`}>{statusInformation.report.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${statusInformation.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${statusInformation.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${statusInformation.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="clientreportApp.statusInformation.home.notFound">No Status Informations found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ statusInformation }: IRootState) => ({
  statusInformationList: statusInformation.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusInformation);
