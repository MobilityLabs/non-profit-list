import express from 'express';
import request from 'request';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {renderToString} from 'react-dom/server';
import {RouterContext, match, createRoutes} from 'react-router';

import appRouter from '../client/router.jsx';

const routes = createRoutes(appRouter());

export default class DataProvider extends Component {
  getChildContext() {
    return {data: this.props.data};
  }
  
  render() {
    return <RouterContext {...this.props}/>;
  }
  
  static propTypes = { 
    data: PropTypes.object
  }
  
  static childContextTypes = { 
    data: PropTypes.object
  }
}

