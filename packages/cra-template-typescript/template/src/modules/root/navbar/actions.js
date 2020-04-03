import { createActions } from 'reduxsauce';

export default createActions({
  navigateToLink: ['link'],
  navigateToExternalLink: ['link', 'openInNewWindow'],
  openSupportBox: null,
  supportBoxOpened: null,
  unmaskUser: null
});
