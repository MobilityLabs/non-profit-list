// @flow
import _ from 'lodash';
import DocumentMeta from 'react-document-meta';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import update from 'immutability-helper';

import CheckboxFilters from '../components/CheckboxFilters';
import Navigation from '../components/Navigation';
import OrganizationTable from '../components/OrganizationTable';
import SortBar from '../components/SortBar';
import SelectedPopover from '../components/SelectedPopover';
import StateFilter from '../components/StateFilter';

import type {Organizations, SummaryData, FiltersData, Filters} from '../types';

type State = {
  error: string,
  filters: Filters,
  filtersData: FiltersData,
  loading: boolean,
  organizationsData: Organizations,
  summaryData: SummaryData,
  error?: Error,
};

let timeout;

export default class DashboardPage extends Component {

  state: State = {
    organizationsData: [],
    summaryData: {},
    filtersData: {
      income_cd: {
        label: 'Income Amount ($)',
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
            label: '25,000 to 99,999'
          },
          {
            value: 4,
            label: '100,000 to 499,999'
          },
          {
            value: 5,
            label: '500,000 to 999,999'
          },
          {
            value: 6,
            label: '1,000,000 to 4,999,999'
          },
          {
            value: 7,
            label: '5,000,000 to 9,999,999'
          },
          {
            value: 8,
            label: '10,000,000 to 49,999,999'
          },
          {
            value: 9,
            label: '50,000,000 to greater'
          }
        ]
      },
      ntee_cd: {
        label: 'Primary Exempt Activity',
        filters: [
          {
            value: 'A',
            label: 'Arts, Culture and Humanities'
          },
          {
            value: 'B',
            label: 'Educational Institutions and Related Activities'
          },
          {
            value: 'C',
            label: 'Environmental Quality, Protection and Beautification'
          },
          {
            value: 'D',
            label: 'Animal-Related'
          },
          {
            value: 'E',
            label: 'Health – General and Rehabilitative'
          },
          {
            value: 'F',
            label: 'Mental Health, Crisis Intervention'
          },
          {
            value: 'G',
            label: 'Diseases, Disorders, Medical Disciplines'
          },
          {
            value: 'H',
            label: 'Medical Research'
          },
          {
            value: 'I',
            label: 'Crime, Legal-Related'
          },
          {
            value: 'J',
            label: 'Employment, Job-Related'
          },
          {
            value: 'K',
            label: 'Food, Agriculture and Nutrition'
          },
          {
            value: 'L',
            label: 'Housing, Shelter'
          },
          {
            value: 'M',
            label: 'Public Safety, Disaster Preparedness and Relief'
          },
          {
            value: 'N',
            label: 'Recreation, Sports, Leisure, Athletics'
          },
          {
            value: 'O',
            label: 'Youth Development'
          },
          {
            value: 'P',
            label: 'Human Services – Multipurpose and Other'
          },
          {
            value: 'Q',
            label: 'International, Foreign Affairs and National Security'
          },
          {
            value: 'R',
            label: 'Civil Rights, Social Action, Advocacy'
          },
          {
            value: 'S',
            label: 'Community Improvement, Capacity Building'
          },
          {
            value: 'T',
            label: 'Philanthropy, Voluntarism and Grantmaking Foundations'
          },
          {
            value: 'U',
            label: 'Science and Technology Research Institutes, Services'
          },
          {
            value: 'V',
            label: 'Social Science Research Institutes, Services'
          },
          {
            value: 'W',
            label: 'Public, Society Benefit – Multipurpose and Other'
          },
          {
            value: 'X',
            label: 'Religion-Related, Spiritual Development'
          },
          {
            value: 'Y',
            label: 'Mutual/Membership Benefit Organizations, Other'
          },
          {
            value: 'Z',
            label: 'Unknown'
          }
        ]
      },
      state: {
        label: 'State',
        filters: [
          {
            value: 'AK',
            label: 'Alaska'
          },
          {
            value: 'AL',
            label: 'Alabama'
          },
        ]
      },
    },
    filters: {
      page: 1,
      state: [],
      name: '',
      income_cd: [],
      limit: 50,
      ntee_cd: [],
      order: {},
    },
    loading: false,
  }

  componentDidMount() {
    this.getOrganizations(0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.filters, this.state.filters)) {
      this.getOrganizations(750);
    }
  }

  async getOrganizations(timer: number) {
    // Display loading indicator as soon as this is called
    this.setState({loading: true});
    
    // Clear existing timeouts to prevent call
    clearTimeout(timeout);
    
    // New timeout to call organizations
    timeout = setTimeout(async () => {
      const {filters} = this.state;
      // Build a query string with an array of key=value strings
      const queryStringArr: [] = [];
      _.each(filters, (v, k) => {
        let value = _.isArray(v) ? v.join(',') : v;
        // Order is an object so treat it a little different
        if (k === 'order') {
          if (Object.keys(v).length === 0) { return; }
          const values = _.map(v, (order: string, key: string) => (key + '-' + order));
          value = values.join(',');
        }
        queryStringArr.push(k + '=' + value);
      });
      const queryString = queryStringArr.join('&');
      try {
        const result = await(
          await fetch('/api/organizations?' + queryString, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          })
        ).json();
        this.setState({organizationsData: result.data, loading: false});
      } catch (err) {
        this.setState({loading: false, error: err});
      }
    }, timer);
  }

  handleSelectState = (selectedState: string) => {
    const filters = Object.assign({}, this.state.filters);
    filters.state = filters.state ? filters.state.slice() : []; // Need to ensure it is a new array
    filters.state.push(selectedState);
    this.setState({filters});
  }

  handleSelectIncome = (e: DOMEvent) => {
    const filters = Object.assign({}, this.state.filters);
    const target = e.target;
    const value = parseInt(target.value, 10);
    filters.income_cd = filters.income_cd ? filters.income_cd.slice() : []; // Need to ensure it is a new array
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
    this.setState({filters});
  }

  // Sorts but doesn't change the order
  // TODO: Make order an array and place new filter at beginning of array
  handleSortChange = (order: {}) => {
    let filters = Object.assign({}, this.state.filters);
    filters = update(filters, {order: {$merge: order}}); // Using immutability helper to help detect state
    this.setState({filters});
  }

  render() {
    const meta = {
      title: 'Export Tool',
      description: 'Description',
      auto: {
        ograph: true
      }
    };
    const {filtersData, organizationsData, filters, loading} = this.state;
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
              <h3 className="h6 text-muted">Filters</h3>
              {filtersData.income_cd && (
                <CheckboxFilters
                  filter={filtersData.income_cd}
                  handleSelect={this.handleSelectIncome}
                  filterValues={filters.income_cd}
                />
              )}
              <StateFilter
                handleSelectState={this.handleSelectState}
                filter={filtersData.state}
                selectedStates={filters.state}
              />
              {filtersData.ntee_cd && (
                <CheckboxFilters
                  filter={filtersData.ntee_cd}
                  handleSelect={this.handleSelectNTEE}
                  filterValues={filters.ntee_cd}
                  beforeContent={true}
                />
              )}
            </div>
            <div className={"col-sm-12 col-md-8 " + (loading ? "loading" : "")}>
              <SortBar filters={filters} handleSortChange={this.handleSortChange} />
              <OrganizationTable organizations={organizationsData}/>
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
