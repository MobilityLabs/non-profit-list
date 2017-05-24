// @flow
import React, {Component} from 'react';
import Select from 'react-select';

import type {Filters, SummaryData} from '../types';

type State = {
  expanded: boolean,
}

export default class SortDropdown extends Component {
  props: {
    filters: Filters,
    handleSortChange: Function,
    name: string,
    label: string,
    keyName: string,
  }

  state: State = {
    expanded: false,
  }

  handleClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  render() {
    const {expanded} = this.state;
    const {filters, handleSortChange, name, label, keyName} = this.props;
    const addOnClick = (expanded ? " expanded" : "");
    return (
      <div className="btn-group" role="group">
        <button
          id="btnGroupName"
          type="button"
          className={"btn btn-sm menu-trigger" + addOnClick}
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.handleClick}
          style={{"min-width": "150px" }}
        >
          <span>{name}</span>
          <i className="fa fa-fw fa-sort-down"/>
        </button>
        <div className={"menu" + addOnClick} aria-labelledby="btnGroupName">
          <a
            className={" " + (filters.order.name === 'asc' ? 'active' : '')}
            href="#"
            name={keyName + "_asc"}
            onClick={handleSortChange.bind(null, {[keyName]: 'asc'})}
          >
            <span>{label} ASC</span>
            <i className="fa fa-fw fa-sort-alpha-asc"/>
          </a>
          <a
            // TODO: Add active states to these other ones
            className=""
            href="#"
            name={keyName + "_desc"}
            onClick={handleSortChange.bind(null, {[keyName]: 'desc'})}
          >
            <span>{label} DESC</span>
            <i className="fa fa-fw fa-sort-alpha-desc"/>
          </a>
        </div>
      </div>
    );
  }
}
