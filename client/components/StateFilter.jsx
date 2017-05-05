import React from 'react';
import Select from 'react-select';

import './StateFilter.scss';

const STATES = [
  { label: 'Alaska', value: 'AK' },
  { label: 'Alabama', value: 'AL' },
];


var MultiSelectField = React.createClass({
  displayName: 'MultiSelectField',
  getInitialState () {
    return {
      disabled: false,
      crazy: false,
      options: STATES,
      value: [],
    };
  },
  handleSelectChange (value) {
    console.log('You\'ve selected:', value);
    this.setState({ value });
  },
  toggleDisabled (e) {
    this.setState({ disabled: e.target.checked });
  },
  render () {
    return (
      <dl className="filter-container mb-4">
        <dt className="font_small mb-2">State</dt>
        <dd className="mb-0 filter-group">
          <Select multi simpleValue disabled={this.state.disabled} value={this.state.value} placeholder="Select States to Filter" options={this.state.options} onChange={this.handleSelectChange} />
        </dd>
      </dl>
    );
  }
});
module.exports = MultiSelectField;