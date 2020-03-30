import React from 'react';
import { Route } from 'react-router';
// import { ConnectedRouter } from 'react-router-redux';
import { RouterToUrlQuery } from 'react-url-query';

import { ConnectedRouter } from 'connected-react-router'

import { connect } from 'react-redux';

import Root from '../modules/root/container';
import { history } from '../redux/store/factory';


const Router = () => (
    <ConnectedRouter history={history}>
      <RouterToUrlQuery>
        <div>
          <Route path="/" component={Root} />
        </div>
      </RouterToUrlQuery>
    </ConnectedRouter>
);

export default connect()(Router);
