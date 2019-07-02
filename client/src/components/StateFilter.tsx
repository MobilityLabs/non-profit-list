import React, {Component} from 'react';
import Select from 'react-select';

import './StateFilter.scss';

import {FilterData} from '../types';

type Props = {
  filter?: FilterData,
  handleSelectState: any,
  selectedStates?: string[],
}

export default class StateFilter extends Component<Props> {
  render() {
    const {filter, handleSelectState, selectedStates} = this.props;
    if (!filter) return null
    return (
      <dl className="filter-container mb-4">
        <dt className="font_small text-muted mb-2">{filter && filter.label}</dt>
        <dd className="mb-0 filter-group">
          <Select
            multi={true}
            simpleValue={true}
            placeholder="Select States to Filter"
            value={selectedStates}
            // @ts-ignore
            options={filter.filters}
            onChange={handleSelectState} />
        </dd>
      </dl>
    );
  }
}
