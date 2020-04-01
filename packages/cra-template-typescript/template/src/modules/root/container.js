import React, { Fragment }  from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';
import { Route, Switch } from 'react-router';
import LoginNavBar from 'bananasplit/dist/components/navbar/login-navbar';
import { NavbarStyled } from 'bananasplit/dist/styles/global/collapsed-navbar-base';

import SimpleModule from '../../modules/simple-module';
import { BootstrapStyled } from '../../styles/bootstrap'
// import { ComponentsStyled } from '../../styles/components';
// import { ResetStyled } from '../../styles/reset'; 

export class RootContainer extends React.Component {

  // Import CSS reset and Global Styles
  loadGlobalStyles() {
    return (
      <Fragment>
        <BootstrapStyled />
        {/* <ResetStyled /> */}
        {/* <ComponentsStyled /> */}
        <NavbarStyled />
      </Fragment>
    );
  }

  render(){
    return (
      <Fragment>
        {this.loadGlobalStyles()}
        <LoginNavBar />
        <Grid fluid>
          <Row>
            <Switch>
              <Route path="/" component={SimpleModule} />
            </Switch>
          </Row>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect()(RootContainer);
