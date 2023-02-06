import React from 'react';
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Badge,
} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as Icon from 'react-feather';

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
  };

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch,
    });
  };

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.userName}
              </span>
              <span className="user-status">{this.props.companyName}</span>
            </div>
            <span data-tour="user">
              <img
                src={this.props.userImg}
                className="round"
                height="40"
                width="40"
                alt=""
              />
            </span>
          </DropdownToggle>
        </UncontrolledDropdown>
      </ul>
    );
  }
}
export default NavbarUser;
