// @flow
import DocumentMeta from 'react-document-meta';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, browserHistory} from 'react-router';

import Filters from '../components/Filters';
import OrganizationTable from '../components/OrganizationTable';

export default class DashboardPage extends Component {

  state = {
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
        ]
      }
    }
  }

  componentDidMount() {
    this.getOrganizations();
  }

  async getOrganizations() {
    const result = await(
      await fetch('/api/organizations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-md-4">
              <Filters filter={filtersData.revenueAmount}/>
            </div>
            <div className="col-md-8">
              <OrganizationTable organizations={organizationsData}/>
            </div>
          </div>
        </div>
      </DocumentMeta>
    );
  }

  static contextTypes = {
    data: PropTypes.object
  }
}
