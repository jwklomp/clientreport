import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './client.reducer';
import { IClient } from 'app/shared/model/client.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClientProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Client extends React.Component<IClientProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { clientList, match } = this.props;
    return (
      <div>
        <h2 id="client-heading">
          <Translate contentKey="clientreportApp.client.home.title">Clients</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="clientreportApp.client.home.createLabel">Create a new Client</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {clientList && clientList.length > 0 ? (
            <Table responsive aria-describedby="client-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clientreportApp.client.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clientreportApp.client.email">Email</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clientreportApp.client.location">Location</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {clientList.map((client, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${client.id}`} color="link" size="sm">
                        {client.id}
                      </Button>
                    </td>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.location ? <Link to={`location/${client.location.id}`}>{client.location.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${client.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${client.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${client.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="clientreportApp.client.home.notFound">No Clients found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ client }: IRootState) => ({
  clientList: client.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Client);
