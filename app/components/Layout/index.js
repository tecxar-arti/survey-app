/* eslint-disable react/prop-types */
import React, { Component, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import { TinyButton as ScrollUpButton } from 'react-scroll-up-button';

// Layout Components
const Topbar = React.lazy(() => import('./Topbar'));
const Footer = React.lazy(() => import('./Footer'));

class Layout extends Component {
  Loader = () => (
    <div id="preloader">
      <div id="status">
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <React.Fragment>
        <Suspense fallback={this.Loader()}>
          <Topbar />
          {this.props.children}
          <Footer />
          <div id="bottomIcon">
            <ScrollUpButton className="bottomIcon" />
          </div>
        </Suspense>
      </React.Fragment>
    );
  }
}

export default withRouter(Layout);
