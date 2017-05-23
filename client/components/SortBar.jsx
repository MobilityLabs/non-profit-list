// @flow
import React, {Component} from 'react';

import Pagination from './Pagination';

import './SortBar.scss';

import type {Filters, SummaryData} from '../types';

type State = {
  expanded: boolean,
}

export default class SortBar extends Component {

  props: {
    filters: Filters,
    handlePageChange: Function,
    handleSortChange: Function,
    loading: boolean,
    summaryData: SummaryData,
  }

  state: State = {
    expanded: false,
  }

  handleClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const {filters, handleSortChange, handlePageChange, summaryData, loading} = this.props;
    const {expanded} = this.state;
    const addOnClick = (expanded ? " expanded" : "");
    return (
      <div className={"sort-bar " + (loading ? "loading" : "")}>
        <Pagination
          filters={filters}
          summaryData={summaryData}
          handlePageChange={handlePageChange}
        />
        <div className="sort-options">
          <span className="label-heading mr-1">Sort by: </span>
          <div
            className="btn-group btn-group-container"
            role="group"
            aria-label="Button group with nested dropdown"
          >
            <div className="btn-group" role="group">
              <button
                id="btnGroupName"
                type="button"
                className={"btn btn-sm menu-trigger" + addOnClick}
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.handleClick}
              >
                <span>Name</span>
                <i className="fa fa-fw fa-sort-down"/>
              </button>
              <div className={"menu" + addOnClick} aria-labelledby="btnGroupName">
                <a
                  className={" " + (filters.order.name === 'asc' ? 'active' : '')}
                  href="#"
                  name="name_asc"
                  onClick={handleSortChange.bind(null, {name: 'asc'})}
                >
                  <span>Name ASC</span>
                  <i className="fa fa-fw fa-sort-alpha-asc"/>
                </a>
                <a
                  // TODO: Add active states to these other ones
                  className=""
                  href="#"
                  name="name_desc"
                  onClick={handleSortChange.bind(null, {name: 'desc'})}
                >
                  <span>Name DESC</span>
                  <i className="fa fa-fw fa-sort-alpha-desc"/>
                </a>
              </div>
            </div>


            <div className="btn-group" role="group">
              <button
                id="btnGroupDate"
                type="button"
                className="btn btn-sm dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Date
              </button>
              <div className="dropdown-menu" aria-labelledby="btnGroupDate">
                <a
                  className="dropdown-item"
                  href="#"
                  name="tax_period_asc"
                  onClick={handleSortChange.bind(null, {tax_period: 'asc'})}
                >
                  Date ASC
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  name="tax_period_desc"
                  onClick={handleSortChange.bind(null, {tax_period: 'desc'})}
                >
                  Date DESC
                </a>
              </div>
            </div>
            <div className="btn-group" role="group">
              <button
                id="btnGroupFinancial"
                type="button"
                className="btn btn-sm dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Financials
              </button>
              <div className="dropdown-menu" aria-labelledby="btnGroupFinancial">
                <a
                  className="dropdown-item"
                  href="#"
                  name="income_amt_asc"
                  onClick={handleSortChange.bind(null, {income_amt: 'asc'})}
                >
                  Income Amount ASC
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  name="income_amt_desc"
                  onClick={handleSortChange.bind(null, {income_amt: 'desc'})}
                >
                  Income Amount DESC
                </a>
              </div>
            </div>
            <div className="btn-group" role="group">
              <button
                id="btnGroupFiling"
                type="button"
                className="btn btn-sm dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Filing Date
              </button>
              <div className="dropdown-menu" aria-labelledby="btnGroupFiling">
                <a
                  className="dropdown-item"
                  href="#"
                  name="ruling_asc"
                  onClick={handleSortChange.bind(null, {ruling: 'asc'})}
                >
                  Filing ASC
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  name="ruling_desc"
                  onClick={handleSortChange.bind(null, {ruling: 'desc'})}
                >
                  Filing DESC
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
