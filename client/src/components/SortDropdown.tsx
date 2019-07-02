// @flow
import onClickOutside from 'react-onclickoutside';
import React, {Component} from 'react';

import {Filters} from '../types';

type State = {
  expanded: boolean,
};

type Props = {
  filters?: Partial<Filters>,
  handleSortChange: any,
  name: string,
  label: string,
  keyName: string,
}

class SortDropdown extends Component<Props, State> {

  state: State = {
    expanded: false,
  }

  handleClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  handleClickOutside = () => {
    this.setState({
      expanded: false,
    });
  }
  render() {
    const {expanded} = this.state;
    const {filters, handleSortChange, name, label, keyName} = this.props;
    const addOnClick = (expanded ? " expanded" : "");
    let compiledName;
    if (filters && filters.order && filters.order[keyName]) {
      compiledName =(
        <div>
          {name + " " + filters.order[keyName].toUpperCase()}
          <i className={"fa fa-fw fa-sort-" + name === 'name' ? 'alpha' : 'numeric' + "-" +
          filters.order[keyName]}/>
        </div>
      );
    } else{
      compiledName = name;
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
          style={{minWidth: "120px"}}
        >
          <span>{compiledName}</span>
          <i className="fa fa-fw fa-sort-down"/>
        </button>
        <div className={"menu" + addOnClick} aria-labelledby="btnGroupName">
          <span
            className={" " + (filters && filters.order && filters.order.name === 'asc' ? 'active' : '')}
            onClick={handleSortChange.bind(null, {[keyName]: 'asc'})}
          >
            <span>{label} ASC</span>
            <i className={`fa fa-fw fa-sort-${name === 'Name' ? 'alpha' : 'numeric'}-asc`}/>
          </span>
          <span
            // TODO: Add active states to these other ones
            className=""
            onClick={handleSortChange.bind(null, {[keyName]: 'desc'})}
          >
            <span>{label} DESC</span>
            <i className={`fa fa-fw fa-sort-${name === 'Name' ? 'alpha' : 'numeric'}-desc`}/>
          </span>
        </div>
      </div>
    );
  }
}

export default onClickOutside(SortDropdown);
