// @flow
import React, {Component} from 'react';
import moment from 'moment';
import numeral from 'numeral';
import _ from 'lodash';

import './OrganizationList.scss';

import type {Organizations} from '../types';

export default class OrganizationTable extends Component {
  props: {
    organizations: Organizations,
  }
  formatDate = (date: ?number) => {
    let dateString = "Not Listed";
    if (date) {
      const filingDate = date.toString().match(/.{1,4}/g);
      // TODO: Convert this column to ISO format in database
      const month = moment(filingDate[1]).format("MMM");
      const year = filingDate[0];
      return(
        dateString = month + " " + year
      );
    }
    return dateString;
  };
  render() {
    const {organizations} = this.props;
    const table = organizations.map((o) => {
      const amountValidator = (number: number) => {return number ? numeral(number).format('$0,0') : "Not Listed";};
      return (
        <div key={o.ein} className="card">
          <div className="card-block list-card-container">
            <div className="card-container-interaction">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={"checkbox-" + o.ein}
                  value={"checked-" + o.ein}
                  aria-label="..."
                />
              </label>
              <label className="form-check-label">
                <input
                  className="form-check-input star"
                  type="checkbox"
                  id={"star-" + o.ein}
                  value={"starred-" + o.ein}
                  aria-label="..."
                />
              </label>
            </div>
            <div className="card-container-company">
              <div className="company-meta">
                <h2 className="card-title font_normal mt-0 h4">{o.name}</h2>
                <dl>
                  <dt className="font_micro">NTEE Code</dt>
                  <dd className="card-text font_mono">{o.ntee_cd + " - "}</dd>
                </dl>
                <dl className="mb-0">
                  <dt className="font_micro">Location</dt>
                  <dd className="card-text">{_.startCase(_.toLower(o.city)) + ", " + o.state}</dd>
                </dl>
              </div>
              <div className="company-financials">
                <dl>
                  <dt className="font_micro">Income</dt>
                  <dd className="card-text font_small">{amountValidator(o.revenue_amt)}</dd>
                </dl>
                <dl>
                  <dt className="font_micro">Assets</dt>
                  <dd className="card-text font_small">{amountValidator(o.asset_amt)}</dd>
                </dl>
                <dl className="mb-0">
                  <dt className="font_micro">Last Logged Tax Filing</dt>
                  <dd className="card-text font_small">{this.formatDate(o.tax_period)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="card-group-vertical">
        {table}
      </div>
    );
  }
}
