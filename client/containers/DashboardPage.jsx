// @flow
import _ from 'lodash';
import DocumentMeta from 'react-document-meta';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, browserHistory} from 'react-router';

import Filters from '../components/Filters';
import Navigation from '../components/Navigation';
import OrganizationTable from '../components/OrganizationTable';
import SelectedPopover from '../components/SelectedPopover';

import type {Organizations, SummaryData, FilterData} from '../types';

type State = {
  organizationsData: Organizations,
  summaryData: SummaryData,
  filtersData: FilterData,
};

export default class DashboardPage extends Component {

  state: State = {
    organizationsData: [],
    summaryData: {},
    filtersData: {
      revenueAmount: {
        label: 'Revenue Amount ($)',
        filters: [
          {
            value: 1,
            label: '1 to 9,999'
          },
          {
            value: 2,
            label: '10,000 to 24,999'
          },
          {
            value: 3,
            label: '10,000 to 24,999'
          },
          {
            value: 4,
            label: '10,000 to 24,999'
          },
          {
            value: 5,
            label: '10,000 to 24,999'
          },
          {
            value: 6,
            label: '10,000 to 24,999'
          },
          {
            value: 7,
            label: '10,000 to 24,999'
          },
          {
            value: 8,
            label: '10,000 to 24,999'
          },
          {
            value: 9,
            label: '10,000 to 24,999'
          },
        ]
      },
      PEA: {
        label: 'Primary Exempt Activity',
        filters: [
          {
            value: 1,
            label: 'Arts, Culture and Humanities'
          },
          {
            value: 2,
            label: 'Educational Institutions and Related Activities'
          },
        ]
      },
    },
    filters: {
      state: ['OH','MI'],
      name: 'Learning'
    }
  }

  componentDidMount() {
    this.getOrganizations();
  }

  async getOrganizations() {
    const {filters} = this.state;
    let queryString = [];
    _.each(filters, (v, k) => {
      const value = _.isArray(v) ? v.join(',') : v;
      queryString.push(k + '=' + value);
    });
    queryString = encodeURIComponent(queryString.join('&'))
    const result = await(
      await fetch('/api/organizations?' + queryString, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    ).json();
    this.setState({organizationsData: result.data});
  }

  render() {
    const meta = {
      title: 'Export Tool',
      description: 'Description',
      auto: {
        ograph: true
      }
    };
    const {filtersData, organizationsData} = this.state;
    return (
      <DocumentMeta {...meta}>
        <div className="bg-light">
          <div className="container">
            <Navigation />
          </div>
        </div>
        <div className="container py-4">
          <div className="row">
            <div className="col-md-4">
              <Filters filter={filtersData.revenueAmount}/>
              <Filters filter={filtersData.PEA}/>
            </div>
            <div className="col-md-8">
              <OrganizationTable organizations={organizationsData}/>
            </div>
          </div>
          <SelectedPopover />
        </div>
      </DocumentMeta>
    );
  }

  static contextTypes = {
    data: PropTypes.object
  }
}
