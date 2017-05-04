import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import './OrganizationList.scss';

const OrganizationTable = ({organizations}) => {

  const table = organizations.map((o) => {
    const filingDate = o.tax_period ? o.tax_period.toString().match(/.{1,4}/g) : "not found";
    const month = moment(filingDate[1]).format("MMM");
    const year = filingDate[0];
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
              <h4 className="card-title font_normal mt-0">{o.name}</h4>
              <dl>
                <dt className="font_micro">NTEE Code</dt>
                <dd className="card-text">{o.ntee_cd + " - "}</dd>
              </dl>
              <dl className="mb-0">
                <dt className="font_micro">Location</dt>
                <dd className="card-text">{_.startCase(_.toLower(o.city)) + ", " + o.state}</dd>
              </dl>
            </div>
            <div className="company-financials">
              <dl>
                <dt className="font_micro">Income</dt>
                <dd className="card-text font_small">{"$" + o.revenue_amt}</dd>
              </dl>
              <dl>
                <dt className="font_micro">Assets</dt>
                <dd className="card-text font_small">{"$" + o.asset_amt}</dd>
              </dl>
              <dl className="mb-0">
                <dt className="font_micro">Last Logged Tax Filing</dt>
                <dd className="card-text font_small">{month + " " + year}</dd>
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

export default OrganizationTable;
