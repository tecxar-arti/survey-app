import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Power, User, Lock, Menu } from 'react-feather';
import { connect } from 'react-redux';
import NavbarUser from './NavbarUser';
import { logout } from '../../../redux/actions/auth/loginActions';
import userImage from '../../../assets/img/defaultImg.png';

class ThemeNavbar extends PureComponent {
  render() {
    const pageTitles = {
      '/': 'Dashboard',
      '/survey': 'Survey Form',
    };
    const { sidebarVisibility } = this.props;
    return (
      <React.Fragment>
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <Navbar className="header-navbar navbar-expand-lg navbar-expand-md navbar navbar-with-menu navbar-shadow navbar-light">
          <div className="navbar-wrapper">
            <div className="navbar-container content">
              <div
                className="navbar-collapse d-flex align-items-center"
                id="navbar-mobile"
              >
                <div className="bookmark-wrapper">
                  <ul className="navbar-nav d-xl-none">
                    <NavItem className="mobile-menu mr-auto">
                      <NavLink
                        className="nav-menu-main menu-toggle hidden-xs is-active"
                        onClick={sidebarVisibility}
                      >
                        <Menu className="ficon" />
                      </NavLink>
                    </NavItem>
                  </ul>
                </div>
                <h2 className="d-xl-none ml-1 mb-0">
                  {pageTitles[this.props.pageTitle]}
                </h2>
                {this.props.horizontal ? (
                  <div className="logo d-flex align-items-center">
                    <h2 className="text-primary brand-text mb-0">Survey</h2>
                  </div>
                ) : null}
                <UncontrolledDropdown className="dropdown-user nav-item ml-auto">
                  <DropdownToggle
                    tag="span"
                    data-toggle="dropdown"
                    className="nav-link dropdown-user-link"
                  >
                    <NavbarUser
                      handleAppOverlay={this.props.handleAppOverlay}
                      changeCurrentLang={this.props.changeCurrentLang}
                      userName={
                        this.props.loggedInUser !== undefined
                          ? this.props.loggedInUser.name
                          : null
                      }
                      userImg={userImage}
                      companyName={
                        this.props.loggedInUser !== undefined
                          ? this.props.loggedInUser.companyName
                          : null
                      }
                    />
                  </DropdownToggle>
                  <DropdownMenu right className="mt-5">
                    <DropdownItem
                      style={{ width: '100%' }}
                      onClick={() => {
                        this.props.logout();
                      }}
                    >
                      <Power size={14} className="mr-50" />
                      <span>Log Out</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          </div>
        </Navbar>
      </React.Fragment>
    );
  }
}

ThemeNavbar.propTypes = {
  sidebarVisibility: PropTypes.any,
  pageTitle: PropTypes.string,
  horizontal: PropTypes.bool,
  handleAppOverlay: PropTypes.any,
  changeCurrentLang: PropTypes.func,
  loggedInUser: PropTypes.object,
  logout: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedInUser: state.auth.login.loggedInUser,
  pageTitle: state.router.location.pathname,
});

export default connect(
  mapStateToProps,
  { logout },
)(ThemeNavbar);
