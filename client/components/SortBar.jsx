// @flow
import React, {Component} from 'react';
import numeral from 'numeral';

import './SortBar.scss';

import type {Filters, SummaryData} from '../types';

export default class SortBar extends Component {

  props: {
    filters: Filters,
    handleSortChange: Function,
    handlePageChange: Function,
    summaryData: SummaryData,
  }

  render() {
    const {filters, handleSortChange, handlePageChange, summaryData} = this.props;
    const page = filters.page > 1 ? filters.page : 1;
    const limit = filters.limit ? filters.limit : 50;
    const upperItem = Math.min(page * limit, summaryData.count);
    const lowerItem = upperItem > 0 ? Math.max(upperItem - limit + 1, 1) : 0;
    return (
      <div className="sort-bar">
        <div className="pagination">
          <button
            type="button"
            className="btn btn-link btn-sm"
            onClick={handlePageChange.bind(null, page-1)}
            disabled={page - 1 < 1}
          >
            <i className="fa fa-angle-double-left" aria-hidden="true"/>
          </button>
          <span>{lowerItem}-{upperItem}<span> of </span>{numeral(summaryData.count).format('0,0')}</span>
          <button
            type="button"
            className="btn btn-link btn-sm"
            onClick={handlePageChange.bind(null, page+1)}
            disabled={upperItem >= summaryData.count}
          >
            <i className="fa fa-angle-double-right" aria-hidden="true"/>
          </button>
        </div>
        <div className="sort-options">
          <span className="label-heading">Sort by: </span>
          <div
            className="btn-group btn-group-container"
            role="group"
            aria-label="Button group with nested dropdown"
          >
            <div className="btn-group" role="group">
              <button
                id="btnGroupName"
                type="button"
                className="btn btn-sm dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Name
              </button>
              <div className="dropdown-menu" aria-labelledby="btnGroupName">
                <a
                  className={"dropdown-item " + (filters.order.name === 'asc' ? 'active' : '')}
                  href="#"
                  name="name_asc"
                  onClick={handleSortChange.bind(null, {name: 'asc'})}
                >
                  Name ASC
                </a>
                <a
                  // TODO: Add active states to these other ones
                  className="dropdown-item"
                  href="#"
                  name="name_desc"
                  onClick={handleSortChange.bind(null, {name: 'desc'})}
                >
                  Name Desc
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
