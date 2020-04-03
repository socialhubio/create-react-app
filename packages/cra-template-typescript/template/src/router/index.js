import React from 'react';
import { Route } from 'react-router';
import { RouterToUrlQuery } from 'react-url-query';
import { ConnectedRouter } from 'react-router-redux';
// import { ConnectedRouter } from 'connected-react-router'

import Root from '../modules/root/container';
import history from './history';

const Router = () => (
    <ConnectedRouter history={history}>
      <RouterToUrlQuery>
        <div>
          <Route path="/" component={Root} />
        </div>
      </RouterToUrlQuery>
    </ConnectedRouter>
);

export default Router;
