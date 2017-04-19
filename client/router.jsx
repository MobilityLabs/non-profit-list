import React from 'react';
import {Router, browserHistory, IndexRoute, Route} from 'react-router';
import logPageView from './utilities/analytics';

import App from './App.jsx';
import DashboardPage from './containers/DashboardPage';

const AppRouter = () => {
  return (
    <Router history={browserHistory} onUpdate={logPageView}>
      <Route path="/" component={App}>
        <IndexRoute component={DashboardPage}/>
      </Route>
    </Router>
  );
};

export default AppRouter;
