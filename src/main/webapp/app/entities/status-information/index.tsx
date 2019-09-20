import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StatusInformation from './status-information';
import StatusInformationDetail from './status-information-detail';
import StatusInformationUpdate from './status-information-update';
import StatusInformationDeleteDialog from './status-information-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StatusInformationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StatusInformationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StatusInformationDetail} />
      <ErrorBoundaryRoute path={match.url} component={StatusInformation} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StatusInformationDeleteDialog} />
  </>
);

export default Routes;
