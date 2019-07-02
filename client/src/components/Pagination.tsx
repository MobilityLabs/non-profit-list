import React, {Component} from 'react';
import numeral from 'numeral';

import {Filters, SummaryData} from '../types';

type Props = {
  filters?: Partial<Filters>,
  handlePageChange: any,
  loading?: boolean,
  summaryData: Partial<SummaryData>,
}

export default class Pagination extends Component<Props> {

  render() {
    const {filters, handlePageChange, summaryData, loading} = this.props;
    const count = summaryData.count ? summaryData.count : 1
    const page = filters && filters.page && typeof filters.page === 'number' && filters.page > 1 ? filters.page : 1;
    const limit = filters && filters.limit ? filters.limit : 50;
    const upperItem = Math.min(page * limit, count);
    const lowerItem = upperItem > 0 ? Math.max(upperItem - limit + 1, 1) : 0;
    return (
      <div className={"pagination " + (loading ? "loading" : "")}>
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
          // @ts-ignore
          disabled={upperItem >= summaryData.count}
        >
          <i className="fa fa-angle-double-right" aria-hidden="true"/>
        </button>
      </div>
    );
  }
}
