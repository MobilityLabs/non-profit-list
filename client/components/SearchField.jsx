// @flow
import _ from 'lodash';
import React from 'react';

import './Filters.scss';

const SearchField = ({name, handleNameChange}) => (
  <div className="input-group btn-in-form nav-search">
    <input
      type="text"
      className="form-control"
      placeholder="Search for..."
      onChange={handleNameChange}
      value={name}
    />
    <span className="input-group-btn">
      <button className="btn" type="button">
        <i className="fa fa-fw fa-search" aria-hidden="true"/>
      </button>
    </span>
  </div>
);

export default SearchField;
