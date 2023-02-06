import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import Customizer from '../components/extras/customizer/Customizer';
import Sidebar from './components/menu/vertical-menu/Sidebar';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import {
  changeMode,
  collapseSidebar,
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop,
} from '../redux/actions/customizer/index';
import { validateAccess } from '../redux/actions/auth/loginActions';
import '../assets/scss/plugins/tables/_agGridStyleOverride.scss';

class VerticalLayout extends PureComponent {
  state = {
    width: window.innerWidth,
    sidebarState: this.props.app.customizer.sidebarCollapsed,
    layout: this.props.app.customizer.theme,
    collapsedContent: this.props.app.customizer.sidebarCollapsed,
    sidebarHidden: false,
    currentLang: 'en',
    appOverlay: false,
    customizer: false,
    isTouropen: false,
    currRoute: this.props.location.pathname,
  };

  collapsedPaths = [];

  updateWidth = () => {
    this.setState(() => ({
      width: window.innerWidth,
    }));
  };

  handleCustomizer = bool => {
    this.setState({
      customizer: bool,
    });
  };

  componentWillMount() {
    this.props.validateAccess();
  }

  componentDidMount() {
    const {
      location: { pathname },
      app: {
        customizer: { theme, direction },
      },
    } = this.props;

    if (window !== 'undefined') {
      window.addEventListener('resize', this.updateWidth, false);
    }
    if (this.collapsedPaths.includes(pathname)) {
      this.setState({
        sidebarState: true,
        collapsedContent: true,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      location: { pathname },
      app: {
        customizer: { theme, sidebarCollapsed },
      },
    } = this.props;

    const layout = theme;
    if (layout === 'dark') {
      document.body.classList.remove('semi-dark-layout');
      document.body.classList.add('dark-layout');
    }
    if (layout === 'semi-dark') {
      document.body.classList.remove('dark-layout');
      document.body.classList.add('semi-dark-layout');
    }
    if (layout !== 'dark' && layout !== 'semi-dark') {
      document.body.classList.remove('dark-layout', 'semi-dark-layout');
    }

    if (
      prevProps.app.customizer.sidebarCollapsed !==
      this.props.app.customizer.sidebarCollapsed
    ) {
      this.setState({
        collapsedContent: sidebarCollapsed,
        sidebarState: sidebarCollapsed,
      });
    } else if (
      prevProps.location.pathname !== this.props.location.pathname &&
      prevProps.app.customizer.sidebarCollapsed ===
        this.props.app.customizer.sidebarCollapsed
    ) {
      this.setState({
        collapsedContent: sidebarCollapsed,
        sidebarState: sidebarCollapsed,
      });
    } else if (
      prevProps.location.pathname === this.props.location.pathname &&
      prevProps.app.customizer.sidebarCollapsed ===
        this.props.app.customizer.sidebarCollapsed
    ) {
      return;
    }

    if (this.collapsedPaths.includes(pathname)) {
      this.handleRouteChange();
    }
  }

  handleRouteChange = () => {
    if (this.collapsedPaths.includes(this.props.location.pathname)) {
      this.setState({
        sidebarState: true,
        collapsedContent: true,
      });
    } else {
      this.setState({
        sidebarState: false,
        collapsedContent: false,
      });
    }
  };

  handleCollapsedMenuPaths = item => {
    const { collapsedPaths } = this;
    if (!collapsedPaths.includes(item)) {
      collapsedPaths.push(item);
      this.collapsedPaths = collapsedPaths;
    }
  };

  toggleSidebarMenu = () => {
    this.setState({
      sidebarState: !this.state.sidebarState,
      collapsedContent: !this.state.collapsedContent,
    });
  };

  sidebarMenuHover = val => {
    this.setState({
      sidebarState: val,
    });
  };

  handleSidebarVisibility = () => {
    window.addEventListener('resize', () => {
      if (this.state.sidebarHidden) {
        this.setState({
          sidebarHidden: !this.state.sidebarHidden,
        });
      }
    });
    this.setState({
      sidebarHidden: !this.state.sidebarHidden,
    });
  };

  handleCurrentLanguage = lang => {
    this.setState({
      currentLang: lang,
    });
  };

  handleAppOverlay = value => {
    if (value.length > 0) {
      this.setState({
        appOverlay: true,
      });
    } else if (value.length < 0 || value === '') {
      this.setState({
        appOverlay: false,
      });
    }
  };

  handleAppOverlayClick = () => {
    this.setState({
      appOverlay: false,
    });
  };

  render() {
    const appProps = this.props.app.customizer;
    const menuThemeArr = [
      'primary',
      'success',
      'danger',
      'info',
      'warning',
      'dark',
    ];
    const data =['hello','hry']
    const sidebarProps = {
      toggleSidebarMenu: this.props.collapseSidebar,
      toggle: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarHover: this.sidebarMenuHover,
      sidebarVisibility: this.handleSidebarVisibility,
      visibilityState: this.state.sidebarHidden,
      activePath: this.props.match.path,
      collapsedMenuPaths: this.handleCollapsedMenuPaths,
      currentLang: this.state.currentLang,
      activeTheme: appProps.menuTheme,
      collapsed: this.state.collapsedContent,
      deviceWidth: this.state.width,
    };
    const navbarProps = {
      toggleSidebarMenu: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarVisibility: this.handleSidebarVisibility,
      currentLang: this.state.currentLang,
      changeCurrentLang: this.handleCurrentLanguage,
      handleAppOverlay: this.handleAppOverlay,
      appOverlayState: this.state.appOverlay,
      navbarColor: appProps.navbarColor,
      navbarType: appProps.navbarType,
    };

    const footerProps = {
      footerType: appProps.footerType,
      hideScrollToTop: appProps.hideScrollToTop,
    };

    const customizerProps = {
      customizerState: this.state.customizer,
      handleCustomizer: this.handleCustomizer,
      changeMode: this.props.changeMode,
      changeNavbar: this.props.changeNavbarColor,
      changeNavbarType: this.props.changeNavbarType,
      changeFooterType: this.props.changeFooterType,
      changeMenuTheme: this.props.changeMenuColor,
      collapseSidebar: this.props.collapseSidebar,
      hideScrollToTop: this.props.hideScrollToTop,
      activeMode: appProps.theme,
      activeNavbar: appProps.navbarColor,
      navbarType: appProps.navbarType,
      footerType: appProps.footerType,
      menuTheme: appProps.menuTheme,
      scrollToTop: appProps.hideScrollToTop,
      sidebarState: appProps.sidebarCollapsed,
    };
    return (
      <div>
        {this.props.userRole === null ? (
          <Spinner
            color="primary"
            size="xl"
            style={{
              textAlign: 'center',
              width: '100px',
              height: '100px',
              margin: '25% 45% 0% 45%',
            }}
          />
        ) : (
          <div
            className={classnames(
              `wrapper vertical-layout theme-${appProps.menuTheme}`,
              {
                'menu-collapsed':
                  this.state.collapsedContent === true &&
                  this.state.width >= 1200,
                'fixed-footer': appProps.footerType === 'sticky',
                'navbar-static': appProps.navbarType === 'static',
                'navbar-sticky': appProps.navbarType === 'sticky',
                'navbar-floating': appProps.navbarType === 'floating',
                'navbar-hidden': appProps.navbarType === 'hidden',
                'theme-primary': !menuThemeArr.includes(appProps.menuTheme),
              },
            )}
          >
            <Sidebar {...sidebarProps} />
            <div
              className={classnames('app-content content', {
                'show-overlay': this.state.appOverlay === true,
              })}
              onClick={this.handleAppOverlayClick}
            >
              <Navbar {...navbarProps} />
              <div className="content-wrapper">{this.props.children}</div>
            </div>

            <Footer {...footerProps} />
            {appProps.disableCustomizer !== true ? (
              <Customizer {...customizerProps} />
            ) : null}
            <div
              className="sidenav-overlay"
              onClick={this.handleSidebarVisibility}
            />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  app: state.customizer,
  userRole: state.auth.login.loggedInUser,
});
export default connect(
  mapStateToProps,
  {
    changeMode,
    collapseSidebar,
    changeNavbarColor,
    changeNavbarType,
    changeFooterType,
    changeMenuColor,
    hideScrollToTop,
    validateAccess,
  },
)(VerticalLayout);
