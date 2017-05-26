// @flow
import React, {Component} from 'react';

import Pagination from './Pagination';
import SortDropdown from './SortDropdown';

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

  render() {
    const {filters, handleSortChange, handlePageChange, summaryData, loading} = this.props;

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
            <SortDropdown
              filters={filters}
              handleSortChange={handleSortChange}
              name="Name"
              label="Name"
              keyName="name"
            />
           <SortDropdown
              filters={filters}
              handleSortChange={handleSortChange}
              name="Date"
              label="Date"
              keyName="tax_period"
            />
            <SortDropdown
              filters={filters}
              handleSortChange={handleSortChange}
              name="Income"
              label="Income"
              keyName="income_amt"
            />
            <SortDropdown
              filters={filters}
              handleSortChange={handleSortChange}
              name="Filing Date"
              label="Filing"
              keyName="ruling"
            />
          </div>
        </div>
      </div>
    );
  }
}
