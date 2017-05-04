import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import './OrganizationList.scss';

const Filters = ({filter}) => {
  const filterCheckboxes = filter.filters.map((f) => {
    return(
      <div key={f} className="form-check">
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input mr-2" value={f.value}/>
          {f.label}
        </label>
      </div>
    );
  });
  return(
    <dl>
      <dt>{filter.label}</dt>
      <dd>
        {filterCheckboxes}
      </dd>
    </dl>
  );

}

export default Filters;