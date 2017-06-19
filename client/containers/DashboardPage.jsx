// @flow
import _ from 'lodash';
import DocumentMeta from 'react-document-meta';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import update from 'immutability-helper';
import {browserHistory} from 'react-router';

import CheckboxFilters from '../components/CheckboxFilters';
import Navigation from '../components/Navigation';
import OrganizationList from '../components/OrganizationList';
import Pagination from '../components/Pagination';
import SelectedPopover from '../components/SelectedPopover';
import SortBar from '../components/SortBar';
import StateFilter from '../components/StateFilter';
import Summary from '../components/Summary';
import {defaultFilters} from '../../filtersData';

import type {Organizations, SummaryData, FiltersData, Filters} from '../types';

type State = {
  filters: Filters,
  filtersData: FiltersData,
  loadingOrgs: boolean,
  loadingSummary: boolean,
  organizationsData: Organizations,
  summaryData: SummaryData,
  error?: Error,
};

const timestamp = Date.now();

export default class DashboardPage extends Component {

  props: {
    location: {query: {}}
  }

  state: State = this.context.data || // Coming from the server
    window.__INITIAL_STATE__ ||
    // Equivalent to initial state
    {
      filters: {},
      filtersData: {},
      loadingOrgs: true,
      loadingSummary: true,
      organizationsData: [],
      summaryData: {},
      error: null,
    };

  componentDidMount() {
    if (this.props.location.query) {
      const newFilters = generateFiltersFromURL(this.state.filters, this.props.location.query);
      this.setState({filters: newFilters});
    }
    this.getSummary();
    if (this.state.organizationsData.length > 0) {
      return;
    }
    this.getOrganizations();
  }

  componentDidUpdate(prevProps, prevState: State) {
    if (!_.isEqual(prevState.filters, this.state.filters)) {
      this.getOrganizations();
      this.getSummary();
      window.scrollTo(0, 0);
    }
  }

  debouncedOrgs = _.debounce(async () => {
    const {filters} = this.state;
    // Build a query string with an array of key=value strings
    let queryString = buildQueryString(filters);
    // Keep browser history in sync
    browserHistory.push({
      search: '?' + queryString
    });
    queryString += '&timestamp=' + timestamp;
    try {
      const result = await(
        await fetch('/api/organizations?' + queryString, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
      ).json();
      if (parseInt(result.timestamp, 10) < timestamp) {
        return;
      }
      this.setState({
        filtersData: result.filtersData,
        loadingOrgs: false,
        organizationsData: result.organizationsData,
      });
    } catch (err) {
      this.setState({loadingOrgs: false, error: err});
    }
  }, 500)

  async getOrganizations() {
    // Display loading indicator as soon as this is called
    this.setState({loadingOrgs: true});

    this.debouncedOrgs();
  }
  // Only call once every 500 miliseconds
  debouncedSummary = _.debounce(async () => {
    const {filters} = this.state;
    // Build a query string with an array of key=value strings
    let queryString = buildQueryString(filters);
    browserHistory.push({
      search: '?' + queryString
    });
    queryString += '&timestamp=' + timestamp;
    try {
      const result = await(
        await fetch('/api/summary?' + queryString, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
      ).json();
      if (parseInt(result.timestamp, 10) < timestamp) {
        return;
      }
      // Convert summary data to numbers
      const summaryData = _.mapValues(result.summaryData, (v) => {
        if (v === null) {return v;}
        return Math.round(v * 100) / 100;
      });
      this.setState({
        loadingSummary: false,
        summaryData,
      });
    } catch (err) {
      this.setState({loadingSummary: false, error: err});
    }
  }, 500)

  async getSummary() {
    // Display loading indicator as soon as this is called
    this.setState({loadingSummary: true});

    this.debouncedSummary();
  }

  handleClearFilter = (filter: string, emptyFilterValue: {}|[]) => {
    const filters = Object.assign({}, this.state.filters);
    filters[filter] = emptyFilterValue;
    this.setState({filters});
  }

  handleClearFilters = () => {
    this.setState({filters: defaultFilters});
  }

  handleSelectState = (selectedStates: string) => {
    const filters = Object.assign({}, this.state.filters);
    filters.state = selectedStates.split(','); // Need to ensure it is a new array
    filters.page = 1;
    this.setState({filters});
  }

  handleSelectIncome = (e: DOMEvent) => {
    const filters = Object.assign({}, this.state.filters);
    const target = e.target;
    const value = parseInt(target.value, 10);
    filters.income_cd = filters.income_cd ? filters.income_cd.slice() : []; // Need to ensure it is a new array
    filters.page = 1;
    if (target.checked) {
      filters.income_cd.push(value);
    } else {
      _.pull(filters.income_cd, value);
    }
    this.setState({filters});
  }

  handleSelectNTEE = (e: DOMEvent) => {
    const filters = Object.assign({}, this.state.filters);
    const target = e.target;
    filters.ntee_cd = filters.ntee_cd ? filters.ntee_cd.slice() : []; // Need to ensure it is a new array
    filters.page = 1;
    if (target.checked) {
      filters.ntee_cd.push(target.value);
    } else {
      _.pull(filters.ntee_cd, target.value);
    }
    this.setState({filters});
  }

  handleNameChange = (e: DOMEvent) => {
    const filters = Object.assign({}, this.state.filters);
    const target = e.target;
    filters.name = target.value;
    filters.page = 1;
    this.setState({filters});
  }

  // Sorts but doesn't change the order
  // TODO: Make order an array and place new filter at beginning of array
  handleSortChange = (order: {}) => {
    let filters = Object.assign({}, this.state.filters);
    filters = update(filters, {order: {$merge: order}}); // Using immutability helper to help detect state
    this.setState({filters});
  }

  handlePageChange = (newPage: number) => {
    const filters = Object.assign({}, this.state.filters);
    filters.page = newPage;
    this.setState({filters});
  }

  render() {
    const meta = {
      title: 'Datasaurus',
      description: 'Description',
      auto: {
        ograph: true
      }
    };
    const {filtersData, organizationsData, filters, loadingOrgs, loadingSummary, summaryData} = this.state;
    return (
      <DocumentMeta {...meta}>
        <div className="bg-light">
          <div className="container">
            <Navigation name={filters.name} handleNameChange={this.handleNameChange}/>
          </div>
        </div>
        <div className="container py-3">
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <h3 className="h6 label-heading d-flex justify-content-between align-items-baseline">
                Filters
                <button onClick={this.handleClearFilters} className="btn btn-link btn-sm">Clear Filters</button>
              </h3>
              <CheckboxFilters
                filter={filtersData.income_cd}
                handleSelect={this.handleSelectIncome}
                filterValues={filters.income_cd}
              />
              <StateFilter
                handleSelectState={this.handleSelectState}
                filter={filtersData.state}
                selectedStates={filters.state}
              />
              <CheckboxFilters
                filter={filtersData.ntee_cd}
                handleSelect={this.handleSelectNTEE}
                filterValues={filters.ntee_cd}
                beforeContent={true}
              />
            </div>
            <div className="col-sm-12 col-md-8">
              <SortBar
                filters={filters}
                summaryData={summaryData}
                handleSortChange={this.handleSortChange}
                handlePageChange={this.handlePageChange}
                loading={loadingSummary}
              />
              <Summary summaryData={summaryData} classes={"mb-3"} loading={loadingSummary}/>
              <OrganizationList organizations={organizationsData} summaryData={summaryData} loading={loadingOrgs}/>
              <div className="row">
                <div className="col-sm-12 mt-4 mb-4 text-center">
                  <Pagination
                    filters={filters}
                    summaryData={summaryData}
                    handlePageChange={this.handlePageChange}
                    loading={loadingSummary}
                  />
                </div>
              </div>
            </div>
          </div>
          {false && <SelectedPopover />}
        </div>
      </DocumentMeta>
    );
  }

  static contextTypes = {
    data: PropTypes.object
  }
}

function generateFiltersFromURL(stateFilters, queryParams) {
  _.each(queryParams, (v, k) => {
    if (k === 'income_cd' || k === 'ntee_cd') {
      const arr = v.split(',');
      const final = arr.map((v) => {
        return isFinite(v) ? parseInt(v, 10) : v;
      });
      stateFilters[k] = final;
      return;
    }
    stateFilters[k] = isFinite(v) ? parseInt(v, 10) : v;
  });
  return stateFilters;
}

function buildQueryString(filters: Filters) {
  const queryStringArr: [] = [];
  _.each(filters, (v, k) => {
    if (_.isNil(v) || v.length === 0) {return;} // Do not include empty strings, arrays, null, or undefined
    let value = _.isArray(v) ? v.join(',') : v;
    // Order is an object so treat it a little different
    if (k === 'order') {
      if (Object.keys(v).length === 0) { return; }
      const values = _.map(v, (order: string, key: string) => (key + '-' + order));
      value = values.join(',');
    }
    queryStringArr.push(k + '=' + value);
  });
  return queryStringArr.join('&');
}
