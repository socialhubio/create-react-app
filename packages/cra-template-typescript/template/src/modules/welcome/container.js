import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import WelcomeContainer from 'bananasplit/components/welcome';
import { navigateToOriginLink } from 'bananasplit/shared/url';

const mapDispatchToProps = {
  navigateToLink: navigateToOriginLink
};

export default connect(
  null,
  mapDispatchToProps
)(translate()(WelcomeContainer));
