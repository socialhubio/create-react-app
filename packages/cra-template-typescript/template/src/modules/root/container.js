import React  from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';
import { Route, Switch } from 'react-router';
import SimpleModule from '../../modules/simple-module';

export class RootContainer extends React.Component {
    render(){
        return (
              <Grid fluid>
                  <Row>
                      <Switch>
                          <Route path="/" component={SimpleModule} />
                      </Switch>
                  </Row>
              </Grid>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect()(RootContainer);
