import {
  isEqual,
  debounce,
  mapValues,
  pull,
  each,
  isNil,
  isArray,
  map,
  cloneDeep,
} from 'lodash'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Helmet} from 'react-helmet'

import CheckboxFilters from '../components/CheckboxFilters'
import Navigation from '../components/Navigation'
import OrganizationList from '../components/OrganizationList'
import Pagination from '../components/Pagination'
import SelectedPopover from '../components/SelectedPopover'
import SortBar from '../components/SortBar'
import StateFilter from '../components/StateFilter'
import Summary from '../components/Summary'
import {defaultFilters} from '../filtersData'

import {RouteComponentProps} from 'react-router-dom'
import {Organizations, SummaryData, FiltersData, Filters} from '../types'

import SUMMARY_DATA from '../summaryData'

let timestamp = Date.now()

type Props = {
}

type State = {
  filters: Partial<Filters>,
  filtersData: FiltersData,
  loadingOrgs: boolean,
  loadingSummary: boolean,
  organizationsData: Organizations,
  summaryData: Partial<SummaryData>,
  error: Error|null,
}

export default class DashboardPage extends Component<RouteComponentProps<Props>, State> {

  state: State = {
    loadingOrgs: true,
    loadingSummary: true,
    filters: {},
    error: null,
    // Comes from server
    organizationsData: [],
    filtersData: {},
    summaryData: {},
  }

  componentDidMount() {
    if (this.props.location.search) {
      const newFilters = generateFiltersFromURL(this.state.filters, this.props.location.search)
      this.setState({filters: newFilters})
    }
    this.getSummary()
    if (this.state.organizationsData.length > 0) {
      return
    }
    this.getOrganizations()
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (!isEqual(prevState.filters, this.state.filters)) {
      this.getOrganizations()
      this.getSummary()
      window.scrollTo(0, 0)
    }
  }

  debouncedOrgs = debounce(async () => {
    const {filters} = this.state
    // Build a query string with an array of key=value strings
    let queryString = buildQueryString(filters)
    // Keep browser history in sync
    this.props.history.push({
      search: '?' + queryString
    })
    timestamp = Date.now()
    queryString += '&timestamp=' + timestamp
    try {
      const result = await(
        await fetch('/api/organizations?' + queryString, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
      ).json()
      if (parseInt(result.timestamp, 10) < timestamp) {
        return
      }
      this.setState({
        filtersData: result.filtersData,
        loadingOrgs: false,
        organizationsData: result.organizationsData,
      })
    } catch (err) {
      this.setState({loadingOrgs: false, error: err})
    }
  }, 500)

  async getOrganizations() {
    // Display loading indicator as soon as this is called
    this.setState({loadingOrgs: true})

    this.debouncedOrgs()
  }
  // Only call once every 500 miliseconds
  debouncedSummary = debounce(async () => {
    const {filters} = this.state
    console.log(filters)
    if (
      Object.keys(filters).length === 0 ||
      (Object.keys(filters).length === 1 && filters.page)
    ) {
      this.setState({
        loadingSummary: false,
        summaryData: SUMMARY_DATA,
      })
      return
    }
    // Build a query string with an array of key=value strings
    let queryString = buildQueryString(filters)
    this.props.history.push({
      search: '?' + queryString
    })
    queryString += '&timestamp=' + timestamp
    try {
      const result = await(
        await fetch('/api/summary?' + queryString, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
      ).json()
      if (parseInt(result.timestamp, 10) < timestamp) {
        return
      }
      // Convert summary data to numbers
      const summaryData = mapValues(result.summaryData, (v) => {
        if (v === null) {return v}
        return Math.round(v * 100) / 100
      })
      this.setState({
        loadingSummary: false,
        summaryData,
      })
    } catch (err) {
      this.setState({loadingSummary: false, error: err})
    }
  }, 500)

  async getSummary() {
    // Display loading indicator as soon as this is called
    this.setState({loadingSummary: true})

    this.debouncedSummary()
  }

  handleClearFilters = () => {
    this.setState({filters: defaultFilters})
  }

  handleSelectState = (selectedStates: string) => {
    const filters = {...this.state.filters} as Filters
    filters.state = selectedStates.split(',') // Need to ensure it is a new array
    filters.page = 1
    this.setState({filters})
  }

  handleSelectIncome = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const filters = {...this.state.filters} as Filters
    const target = e.currentTarget
    // @ts-ignore
    const value = parseInt(target.value, 10)
    filters.income_cd = filters.income_cd ? filters.income_cd.slice() : [] // Need to ensure it is a new array
    filters.page = 1
    if (target.checked) {
      filters.income_cd.push(value)
    } else {
      pull(filters.income_cd, value)
    }
    this.setState({filters})
  }

  handleSelectNTEE = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const filters = {...this.state.filters} as Filters
    const target = e.currentTarget
    filters.ntee_cd = filters.ntee_cd ? filters.ntee_cd.slice() : [] // Need to ensure it is a new array
    filters.page = 1
    if (target.checked) {
      filters.ntee_cd.push(target.value)
    } else {
      pull(filters.ntee_cd, target.value)
    }
    this.setState({filters})
  }

  handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const filters = {...this.state.filters} as Filters
    const target = e.currentTarget
    filters.name = target.value
    filters.page = 1
    this.setState({filters})
  }

  // Sorts but doesn't change the order
  // TODO: Make order an array and place new filter at beginning of array
  handleSortChange = (order: {[x: string]: 'asc'|'desc'}) => {
    let filters = {...this.state.filters} as Filters
    filters = cloneDeep({...filters}) // Using immutability helper to help detect state
    filters.order = {...filters.order, ...order}
    this.setState({filters})
  }

  handlePageChange = (newPage: number) => {
    const filters = {...this.state.filters} as Filters
    filters.page = newPage
    this.setState({filters})
  }

  render() {
    const {filtersData, organizationsData, filters, loadingOrgs, loadingSummary, summaryData} = this.state
    return (
      <React.Fragment>
        <Helmet
          title={`Datasaurus`}
          meta={[
            {
              name: 'description',
              content: 'Tax exempt organizations'
            }
          ]}
        />
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
      </React.Fragment>
    )
  }

  static contextTypes = {
    data: PropTypes.object
  }
}

const FILTER_KEYS = [
  'order',
  'state',
  'name',
  'income_cd',
  'ntee_cd',
  'page',
  'limit',
  'key',
]

function generateFiltersFromURL(stateFilters: Partial<Filters>, queryParams: any) {
  each(queryParams, (v, k) => {
    if (!FILTER_KEYS.includes(k)) return
    if (k === 'income_cd' || k === 'ntee_cd') {
      const arr = v.split(',')
      const final = arr.map((v: string) => {
        return typeof v === 'string' ? parseInt(v, 10) : v
      })
      stateFilters[k] = final
      return
    }
    stateFilters[k] = isFinite(v) ? parseInt(v, 10) : v
  })
  return stateFilters
}

function buildQueryString(filters: Partial<Filters>) {
  const queryStringArr: [] = []
  each(filters, (v: any, k) => {
    if (isNil(v) || v.length === 0) {return} // Do not include empty strings, arrays, null, or undefined
    let value = isArray(v) ? v.join(',') : v
    // Order is an object so treat it a little different
    if (k === 'order') {
      if (Object.keys(v).length === 0) { return }
      const values = map(v, (order: string, key: string) => (key + '-' + order))
      value = values.join(',')
    }
    // @ts-ignore
    queryStringArr.push(k + '=' + value)
  })
  return queryStringArr.join('&')
}
