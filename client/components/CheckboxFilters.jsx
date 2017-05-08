// @flow
import _ from 'lodash';
import React from 'react';

import './Filters.scss';

const CheckboxFilters = ({filter, handleSelect, filterValues, beforeContent}: {filter: {filters: [], label: string}, handleSelect: Function, beforeContent: boolean}) => {
  const filterCheckboxes = filter.filters.map((f) => (
    <div className="form-check" key={f.value}>
      <label className="form-check-label">
        <input
          type="checkbox"
          className={"form-check-input mr-2"}
          value={f.value}
          onChange={handleSelect}
          checked={_.includes(filterValues, f.value)}
        />
        <span
          data-before={beforeContent ? f.value + "-" : ""}
          className={beforeContent ? "before-content" : ""}
        >
          {f.label}
        </span>
      </label>
    </div>
  ));
  return(

    <dl className="filter-container mb-4">
      <dt className="font_small mb-2 text-muted;">{filter.label}</dt>
      <dd className="mb-0 filter-group">
        {filterCheckboxes}
      </dd>
    </dl>
  );
};

export default CheckboxFilters;
