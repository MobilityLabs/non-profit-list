// @flow
import _ from 'lodash';
import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, createRoutes} from 'react-router';

import AppRouter from '../client/router.jsx';
import DataProvider from '../components/DataProvider.jsx';
import db from '../config/database';
import {filtersData, defaultFilters} from '../filtersData';

const routes = createRoutes(AppRouter());
const router = express.Router();

router.get('*', (req, res, next) => {
  match({routes, location: req.url}, async (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      try {
        const selectOrganizations = await db.select('*')
          .from('organizations')
          .orderBy('name', 'asc')
          .limit(50);
        const theData = Object.assign(
          {},
          {
            loading: false,
            organizationsData: selectOrganizations,
            filtersData: filtersData,
            filters: defaultFilters,
          }
        );
        const content = renderToString(<DataProvider {...renderProps} data={theData} />);
        res.render('index', {title: 'Welcome', data: theData, content});
      } catch (err) {
        return next(err);
      }
    } else {
      res.status(404).send('Not Found');
    }
  });
});

module.exports = router;
