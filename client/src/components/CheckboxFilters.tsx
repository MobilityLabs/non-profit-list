import {includes} from 'lodash'
import React, {Component} from 'react'

import './Filters.scss'

import {FilterData} from '../types'

type State = {
  expanded: boolean,
}
type Props = {
  beforeContent?: boolean,
  filter?: FilterData,
  filterValues: any,
  handleSelect: (e: React.SyntheticEvent<HTMLInputElement, Event>) => void,
}
export default class CheckboxFilters extends Component<Props, State> {
  state: State = {
    expanded: false,
  }

  handleClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  render() {
    const {filter, handleSelect, filterValues, beforeContent} = this.props
    const {expanded} = this.state
    const hideOnClick = (expanded ? " d-none" : " expanded")
    const showOnClick = (expanded ? " expanded" : " d-none")
    const addClassOnClick = (expanded ? " expanded" : "")
    const filterCheckboxes = filter && filter.filters && filter.filters.map((f) => (
      <div className={"form-check" + hideOnClick} key={f.value}>
        <label className="form-check-label">
          <input
            type="checkbox"
            className={"form-check-input mr-2"}
            value={f.value}
            onChange={handleSelect}
            checked={includes(filterValues, f.value)}
          />
          <span
            data-before={beforeContent ? f.value + "-" : ""}
            className={beforeContent ? "before-content" : ""}
          >
            {f.label}
          </span>
        </label>
      </div>
    ))
    return(
      <dl className="filter-container mb-4">
        <dt className="font_small mb-2 text-muted d-flex justify-content-between">
          {filter && filter.label}
          <button className="btn btn-link btn-sm" onClick={this.handleClick}>
            <i className={"fa fa-caret-up " + hideOnClick} aria-hidden="true"/>
            <i className={"fa fa-caret-down" + showOnClick} aria-hidden="true"/>
          </button>
        </dt>
        <dd className={"mb-0 filter-group" + addClassOnClick}>
          {filterCheckboxes}
        </dd>
      </dl>
    )
  }
}
