// @flow
import DocumentMeta from 'react-document-meta';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, browserHistory} from 'react-router';

import OrganizationTable from '../components/OrganizationTable';

export default class DashboardPage extends Component {

  state = {
    organizations: []
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
    this.setState({organizations: result.data});
  }

  render() {
    const meta = {
      title: 'Export Tool',
      description: 'Description',
      auto: {
        ograph: true
      }
    };
    const {organizations} = this.state;
    return (
      <DocumentMeta {...meta}>
        <div className="container">
          <div className="row">
            <div className="col-md">
              <h1>Dashboard</h1>
              <OrganizationTable organizations={organizations}/>
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
