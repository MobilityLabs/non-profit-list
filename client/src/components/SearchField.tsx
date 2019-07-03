import React, {Component} from 'react';

import './Filters.scss';

type Props = {
  handleNameChange: any,
  name?: string,
}

export default class SearchField extends Component<Props> {
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
