import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './report.reducer';
import { IReport } from 'app/shared/model/report.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReportProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Report extends React.Component<IReportProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { reportList, match } = this.props;
    return (
      <div>
        <h2 id="report-heading">
          <Translate contentKey="clientreportApp.report.home.title">Reports</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="clientreportApp.report.home.createLabel">Create a new Report</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {reportList && reportList.length > 0 ? (
            <Table responsive aria-describedby="report-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clientreportApp.report.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clientreportApp.report.dateCreated">Date Created</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clientreportApp.report.dateLastModified">Date Last Modified</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clientreportApp.report.content">Content</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clientreportApp.report.status">Status</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clientreportApp.report.client">Client</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {reportList.map((report, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${report.id}`} color="link" size="sm">
                        {report.id}
                      </Button>
                    </td>
                    <td>{report.name}</td>
                    <td>
                      <TextFormat type="date" value={report.dateCreated} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={report.dateLastModified} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{report.content}</td>
                    <td>
                      <Translate contentKey={`clientreportApp.ReportStatus.${report.status}`} />
                    </td>
                    <td>{report.client ? <Link to={`client/${report.client.id}`}>{report.client.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${report.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${report.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${report.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="clientreportApp.report.home.notFound">No Reports found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ report }: IRootState) => ({
  reportList: report.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);
