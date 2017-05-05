import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import './Filters.scss';

const Filters = ({filter}) => {
  const filterCheckboxes = filter.filters.map((f) => {
    return(
      <div className="form-check">
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input mr-2" value={f.value}/>
          {f.label}
        </label>
      </div>
    );
  });
  return(
    <dl className="filter-container mb-4">
      <dt className="font_small mb-2">{filter.label}</dt>
      <dd className="mb-0 filter-group">
        {filterCheckboxes}
      </dd>
    </dl>
  );

}

export default Filters;