import 'bootstrap/dist/css/bootstrap.css';
import { createGlobalStyle } from 'styled-components';
import 'bananasplit/styles/global/collapsed-navbar-base';

// All bootstrap overrides:
export const BootstrapStyled = createGlobalStyle`
  // Prevent CP2 navbar collapse:
  .navbar > .container .navbar-brand,
  .navbar > .container-fluid .navbar-brand {
    margin-left: -15px;
  }

  .container > .navbar-header,
  .container-fluid > .navbar-header,
  .container > .navbar-collapse,
  .container-fluid > .navbar-collapse {
    margin-right: 0;
    margin-left: 0;
  }

  // Custom Tooltip for Tags
  .tags-tooltip .tooltip-inner {
    background-color: #fff;
    border: 1px solid black;
    text-align: left;
  }

  // Custom Tooltip for Approval Email Validation
  .approval-email-tooltip .tooltip-inner {
    background-color: #d0011b;
    border: 1px solid #d0011b;
    color: #fff;
  }
  .approval-email-tooltip .tooltip-arrow {
    border-color: white;
    border-right-color: #d0011b !important;
  }
`;
