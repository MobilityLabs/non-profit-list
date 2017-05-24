// @flow
import onClickOutside from 'react-onclickoutside'
import React, {Component} from 'react';

import type {Filters, SummaryData} from '../types';

type State = {
  expanded: boolean,
};

class SortDropdown extends Component {

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
   handleClickOutside = evt => {
    this.setState({
      expanded: false,
    });
  }
  render() {
    const {expanded} = this.state;
    const {filters, handleSortChange, name, label, keyName} = this.props;
    const addOnClick = (expanded ? " expanded" : "");
    let compiledName;
    if (filters.order[keyName]){
      compiledName =(
        <div>
          {name + " " + filters.order[keyName].toUpperCase()} <i className={"fa fa-fw fa-sort-alpha-" + filters.order[keyName]}/>
        </div>
      )
    } else{
      compiledName = name
    }
    return (
      <div className="btn-group" role="group">
        <button
          id="btnGroupName"
          type="button"
          className={"btn btn-sm menu-trigger" + addOnClick}
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.handleClick}
          style={{"minWidth": "120px" }}
        >
          <span>{compiledName}</span>
          <i className="fa fa-fw fa-sort-down"/>
        </button>
        <div className={"menu" + addOnClick} aria-labelledby="btnGroupName">
          <a
            className={" " + (filters.order.name === 'asc' ? 'active' : '')}
            name={keyName + "_asc"}
            onClick={handleSortChange.bind(null, {[keyName]: 'asc'})}
          >
            <span>{label} ASC</span>
            <i className="fa fa-fw fa-sort-alpha-asc"/>
          </a>
          <a
            // TODO: Add active states to these other ones
            className=""
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

export default onClickOutside(SortDropdown);
