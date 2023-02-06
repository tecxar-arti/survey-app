import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './utils/history';
import Spinner from './components/extras/spinner/Loading-spinner';
import { ContextLayout } from './utility/context/Layout';

// Route-based code splitting
const Home = lazy(() => import('./views/pages/'));
const Survey = lazy(() => import('./views/pages/survey'));
const login = lazy(() => import('./views/pages/authentication/login/Login'));

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <ContextLayout.Consumer>
        {context => {
          const LayoutTag =
            fullLayout === true
              ? context.fullLayout
              : context.state.activeLayout === 'horizontal'
              ? context.horizontalLayout
              : context.VerticalLayout;
          return (
            <LayoutTag {...props} permission={props.user}>
              <Suspense fallback={<Spinner />}>
                <Component {...props} />
              </Suspense>
            </LayoutTag>
          );
        }}
      </ContextLayout.Consumer>
    )}
  />
);
const mapStateToProps = state => ({
  user: state.auth.login.loggedInUser,
});

const AppRoute = connect(mapStateToProps)(RouteConfig);

export default function AppRouter() {
  return (
    // Set the directory path if you are deploying in sub-folder
    <Router history={history}>
      <Switch>
        <AppRoute exact path="/" component={Home} />
        <AppRoute path="/survey" component={Survey} />
        <AppRoute path="/login" component={login} fullLayout />
      </Switch>
    </Router>
  );
}
