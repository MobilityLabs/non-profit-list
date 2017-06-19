// @flow
import React, {Component} from 'react';
import Select from 'react-select';

import './StateFilter.scss';

import type {FilterData} from '../types';

export default class StateFilter extends Component {
  props: {
    filter: FilterData,
    handleSelectState: Function,
    selectedStates: [],
  }
  render() {
    const {filter, handleSelectState, selectedStates} = this.props;
    return (
      <dl className="filter-container mb-4">
        <dt className="font_small text-muted mb-2">{filter.label}</dt>
        <dd className="mb-0 filter-group">
          <Select
            multi={true}
            simpleValue={true}
            placeholder="Select States to Filter"
            value={selectedStates}
            options={filter.filters}
            onChange={handleSelectState} />
        </dd>
      </dl>
    );
  }
}
