import React from 'react';
import _ from 'lodash';

const OrganizationTable = ({organizations}) => {

  const table = organizations.map((o) => (
    <div key={o.ein} className="card">
      <div className="card-block">
        <div className="form-check">
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
        <h4 className="card-title">{o.name}</h4>
        <dl>
          <dt>NTEE Code</dt>
          <dd className="card-text">{o.ntee_cd + " - "}</dd>
        </dl>
        <dl>
          <dt>Location</dt>
          <dd className="card-text">{_.startCase(_.toLower(o.city)) + ", " + o.state}</dd>
        </dl>
      </div>
    </div>
  ));
  return (
    <div className="card-group-vertical">
      {table}
    </div>
  );
}

export default OrganizationTable;
