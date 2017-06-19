// @flow
import _ from 'lodash';
import React, {Component} from 'react';

import './Filters.scss';

export default class SearchField extends Component {
  props: {
    handleNameChange: Function,
    name: string,
  }
  render() {
    const {handleNameChange, name} = this.props;
    return (
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
  }
}
