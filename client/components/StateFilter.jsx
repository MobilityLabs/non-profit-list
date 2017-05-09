// @flow
import React, {Component} from 'react';
import Select from 'react-select';

import './StateFilter.scss';

export default class StateFilter extends Component {

  render() {
    const {filter, handleSelectState, selectedStates} = this.props;
    return (
      <dl className="filter-container mb-4">
        <dt className="font_small text-muted mb-2">{filter.label}</dt>
        <dd className="mb-0 filter-group">
          <Select
            multi
            simpleValue
            placeholder="Select States to Filter"
            value={selectedStates}
            options={filter.filters}
            onChange={handleSelectState} />
        </dd>
      </dl>
    );
  }
}
