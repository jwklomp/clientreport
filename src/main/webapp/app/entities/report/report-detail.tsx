import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './report.reducer';
import { IReport } from 'app/shared/model/report.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReportDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ReportDetail extends React.Component<IReportDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { reportEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clientreportApp.report.detail.title">Report</Translate> [<b>{reportEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="clientreportApp.report.name">Name</Translate>
              </span>
            </dt>
            <dd>{reportEntity.name}</dd>
            <dt>
              <span id="dateCreated">
                <Translate contentKey="clientreportApp.report.dateCreated">Date Created</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={reportEntity.dateCreated} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="dateLastModified">
                <Translate contentKey="clientreportApp.report.dateLastModified">Date Last Modified</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={reportEntity.dateLastModified} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="content">
                <Translate contentKey="clientreportApp.report.content">Content</Translate>
              </span>
            </dt>
            <dd>{reportEntity.content}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="clientreportApp.report.status">Status</Translate>
              </span>
            </dt>
            <dd>{reportEntity.status}</dd>
            <dt>
              <Translate contentKey="clientreportApp.report.client">Client</Translate>
            </dt>
            <dd>{reportEntity.client ? reportEntity.client.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/report" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/report/${reportEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ report }: IRootState) => ({
  reportEntity: report.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportDetail);
