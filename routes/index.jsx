// @flow
import _ from 'lodash';
import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, createRoutes} from 'react-router';

import AppRouter from '../client/router.jsx';
import DataProvider from '../components/DataProvider.jsx';
import {getOrganizationsData} from '../queries';

const routes = createRoutes(AppRouter());
const router = express.Router();
const baseUrl = process.env.BASE_URL || '//datasaurus.org';

router.get('*', (req, res, next) => {
  match({routes, location: req.url}, async (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const data = await getOrganizationsData(req.query, next);
      data.summaryData = {};
      const content = renderToString(<DataProvider {...renderProps} data={data} />);
      res.render('index', {title: 'Welcome', data, content, baseUrl});
    } else {
      res.status(404).send('Not Found');
    }
  });
});

module.exports = router;
