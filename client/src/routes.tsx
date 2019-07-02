import App from './App'
import Dashboard from './containers/DashboardPage'

const routes = [
  {
    component: App,
    path: '/', // Must include this with newer version of webpack
    // @ts-ignore
    routes: [
      {
        path: '/',
        component: Dashboard,
        exact: true,
      },
    ]
  }
]

export default routes
