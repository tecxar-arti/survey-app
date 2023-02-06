/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Customizer from '../components/extras/customizer/Customizer';
import Sidebar from './components/menu/horizontal-menu/HorizontalMenu';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import themeConfig from '../configs/themeConfig';
import {
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop,
  changeMode,
} from '../redux/actions/customizer/index';

class HorizontalLayout extends PureComponent {
  state = {
    width: window.innerWidth,
    sidebarState: false,
    layout: this.props.app.customizer.theme,
    collapsedContent: false,
    sidebarHidden: false,
    currentLang: 'en',
    appOverlay: false,
    customizer: false,
    currRoute: this.props.location.pathname,
    menuOpen: themeConfig.menuOpen,
  };

  updateWidth = () => {
    this.setState(() => ({
      width: window.innerWidth,
    }));
  };

  updateScroll = () => {
    this.setState({ scroll: window.pageYOffset });
  };

  handleCustomizer = bool => {
    this.setState({
      customizer: bool,
    });
  };

  componentDidMount() {
    if (window !== 'undefined') {
      window.addEventListener('resize', this.updateWidth, false);
      window.addEventListener('scroll', this.updateScroll, false);
    }
    if (this.props.location.pathname === '/pages/profile') {
      this.setState({
        sidebarState: true,
        collapsedContent: true,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.currRoute !== this.props.location.pathname) {
      this.handleRouteChange();
      this.setState({
        currRoute: this.props.location.pathname,
      });
    }
  }

  handleRouteChange = () => {
    if (this.props.location.pathname === '/pages/profile') {
      this.setState({
        collapsedContent: true,
      });
    } else {
      this.setState({
        sidebarState: false,
        collapsedContent: false,
      });
    }
  };

  toggleSidebarMenu = () => {
    this.setState({
      sidebarState: !this.state.sidebarState,
      collapsedContent: !this.state.collapsedContent,
    });
  };

  sidebarMenuHover = () => {
    this.setState({
      sidebarState: !this.state.sidebarState,
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
    if (value.length > 0)
      this.setState({
        appOverlay: true,
      });
    else if (value.length > 0 || value === '') {
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
    const customizerProps = this.props.app.customizer;
    const navbarTypeArr = ['sticky', 'static', 'sticky', 'floating', 'hidden'];
    const menuThemeArr = [
      'primary',
      'success',
      'danger',
      'info',
      'warning',
      'dark',
    ];
    return (
      <div
        className={classnames(
          `wrapper horizontal-layout theme-${customizerProps.menuTheme}`,
          {
            'menu-collapsed':
              this.state.collapsedContent === true && this.state.width > 1200,
            'fixed-footer': customizerProps.footerType === 'sticky',
            'navbar-static': customizerProps.navbarType === 'static',
            'navbar-sticky': customizerProps.navbarType === 'sticky',
            'navbar-floating':
              customizerProps.navbarType === 'floating' ||
              !navbarTypeArr.includes(customizerProps.navbarType),
            'navbar-hidden': customizerProps.navbarType === 'hidden',
            'theme-primary': !menuThemeArr.includes(customizerProps.menuTheme),
          },
        )}
      >
        <Sidebar
          toggleSidebarMenu={this.toggleSidebarMenu}
          sidebarState={this.state.sidebarState}
          sidebarHover={this.sidebarMenuHover}
          sidebarVisibility={this.handleSidebarVisibility}
          visibilityState={this.state.sidebarHidden}
          activePath={this.props.match.path}
          currentLang={this.state.currentLang}
          activeTheme={customizerProps.menuTheme}
          collapsed={this.state.collapsedContent}
          menuOpen={this.state.menuOpen}
          navbarType={customizerProps.navbarType}
        />
        <div
          className={classnames('app-content content', {
            'show-overlay': this.state.appOverlay === true,
          })}
          onClick={this.handleAppOverlayClick}
        >
          <Navbar
            horizontal
            scrolling={this.state.scroll > 50}
            toggleSidebarMenu={this.toggleSidebarMenu}
            sidebarState={this.state.sidebarState}
            sidebarVisibility={this.handleSidebarVisibility}
            currentLang={this.state.currentLang}
            changeCurrentLang={this.handleCurrentLanguage}
            handleAppOverlay={this.handleAppOverlay}
            appOverlayState={this.state.appOverlay}
            navbarColor={customizerProps.navbarColor}
            navbarType={customizerProps.navbarType}
          />
          <div className="content-wrapper">{this.props.children}</div>
        </div>

        <Footer
          footerType={customizerProps.footerType}
          hideScrollToTop={customizerProps.hideScrollToTop}
        />
        {customizerProps.disableCustomizer !== true ? (
          <Customizer
            scrollToTop={customizerProps.hideScrollToTop}
            activeNavbar={customizerProps.navbarColor}
            activeMode={customizerProps.theme}
            navbarType={customizerProps.navbarType}
            footerType={customizerProps.footerType}
            menuTheme={customizerProps.menuTheme}
            customizerState={this.state.customizer}
            handleCustomizer={this.handleCustomizer}
            changeNavbar={this.props.changeNavbarColor}
            changeNavbarType={this.props.changeNavbarType}
            changeFooterType={this.props.changeFooterType}
            changeMenuTheme={this.props.changeMenuColor}
            hideScrollToTop={this.props.hideScrollToTop}
            changeMode={this.props.changeMode}
          />
        ) : null}
        <div
          className="sidenav-overlay"
          onClick={this.handleSidebarVisibility}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  app: state.customizer,
});
export default connect(
  mapStateToProps,
  {
    changeNavbarColor,
    changeNavbarType,
    changeFooterType,
    changeMenuColor,
    hideScrollToTop,
    changeMode,
  },
)(HorizontalLayout);
