import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import NavBarContainer from 'bananasplit/components/navbar';
import { emptyFn } from 'bananasplit/shared/utils';
import CommonNavBarActions from 'bananasplit/components/navbar/actions';
import * as CommonNavBarSelectors from 'bananasplit/components/navbar/selectors';

import NavbarActions from './actions';
import {
  navbarSelector,
  featureLinksSelector,
  accountLinksSelector,
  userLinksSelector,
  getAccountAvailableSelect,
  getSelectedTeamSelector,
  getSupportAvailableSelect,
  getTeamsSelector,
  teamsFeatureSelector
} from './selectors';

const mapStateToProps = state => {
  const props = {
    ...navbarSelector(state),
    changeLogIconVersion: CommonNavBarSelectors.getNavigationBarVersionClicked(state),
    accountAvailable: getAccountAvailableSelect(state),
    accountLinks: accountLinksSelector(state),
    featureLinks: featureLinksSelector(state),
    logout: emptyFn,
    onSelectTeam: emptyFn,
    selectedTeam: getSelectedTeamSelector(state),
    supportAvailable: getSupportAvailableSelect(state),
    teams: getTeamsSelector(state),
    teamsFeatureAvailable: teamsFeatureSelector(state),
    userLinks: userLinksSelector(state)
  };
  return props;
};

const mapDispatchToProps = {
  onExpire: NavbarActions.Creators.navigateToLink,
  openSupportBox: NavbarActions.Creators.openSupportBox,
  setChangeLogVersionClicked: CommonNavBarActions.Creators.setChangeLogVersionClicked,
  unmaskUser: NavbarActions.Creators.unmaskUser
};


export default translate()(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarContainer));
