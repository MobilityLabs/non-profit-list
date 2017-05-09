// @flow
import React, {Component} from 'react';

import OrganizationCard from './OrganizationCard';

import './OrganizationList.scss';

import type {Organizations} from '../types';

export default class OrganizationList extends Component {
  props: {
    organizations: Organizations,
  }

  state = {
    expandedEIN: 0,
  }

  handleCardClick = (expandedEIN: number) => {
    const oldExpandedEIN = this.state.expandedEIN;
    if (expandedEIN === oldExpandedEIN) {
      this.setState({expandedEIN: 0});
      return;
    }
    this.setState({expandedEIN});
  }

  render() {
    const {organizations} = this.props;
    const table = organizations.map((o) => {
      return (
        <OrganizationCard
          organization={o}
          key={o.ein}
          expanded={o.ein === this.state.expandedEIN}
          handleCardClick={this.handleCardClick}
        />
      );
    });
    return (
      <div className="card-group-vertical">
        {table}
      </div>
    );
  }
}
