// @flow
import * as React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

import routes from './routes'

import './style.scss'

render(
  <BrowserRouter>
    {renderRoutes(routes)}
  </BrowserRouter>,
  document.getElementById('root')
)
