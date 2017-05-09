// @flow
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import React, {Component} from 'react';

import './Collapse.scss';

import type {Organization} from '../types';

export default class OrganizationCard extends Component {
  props: {
    organization: Organization,
    expanded: Boolean,
    handleCardClick: Function,
  }
  formatDate = (date: ?number) => {
    let dateString = "Not Listed";
    if (date) {
      const filingDate = date.toString().match(/.{1,4}/g);
      // TODO: Convert this column to ISO format in database
      const month = moment(filingDate[1]).format("MMM");
      const year = filingDate[0];
      return(
        dateString = month + " " + year
      );
    }
    return dateString;
  };
  render() {
    const {organization, handleCardClick, expanded} = this.props;
    const existValidator =(object: ?number) => {return object ? object : "Not Listed";};
    const amountValidator = (number: ?number) => {return number ? numeral(number).format('$0,0') : "Not Listed";};
    const organizationCategory = (number: ?number) =>{
      if (number) {
        if (number === 1) {return("Corporation");}
        if (number === 2) {return("Trust");}
        if (number === 3) {return("Co-operative");}
        if (number === 4) {return("Partnership");}
        if (number === 5) {return("Association");}
      }
      return(
        "Not Listed"
      );
    };
    const icoFormatter =(name: String) => {return name ? name.replace(/[!@#$%^&*]/g, "") : "Not Listed";};
    const hideOnClick = (expanded ? " d-none" : " expanded");
    const showOnClick = (expanded ? " expanded" : " d-none");
    const addClassOnClick = (expanded ? " expanded" : "");
    return (
      <div
        className={"organization-card card" + addClassOnClick}
        onClick={handleCardClick.bind(null, organization.ein)}
      >
        <div className="card-block list-card-container">
          <div className="card-container-interaction">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                id={"checkbox-" + organization.ein}
                value={"checked-" + organization.ein}
                aria-label="..."
              />
            </label>
            <label className="form-check-label">
              <input
                className="form-check-input star"
                type="checkbox"
                id={"star-" + organization.ein}
                value={"starred-" + organization.ein}
                aria-label="..."
              />
            </label>
          </div>
          <div className="card-container-company">
            <div className="company-meta">
              <h2 className="card-title font_normal mt-0 h4">{organization.name}</h2>
              <dl>
                <dt className="font_micro">NTEE Code</dt>
                <dd className="card-text font_mono">{organization.ntee_cd + " - "}</dd>
              </dl>
              <dl className={hideOnClick}>
                <dt className="font_micro">Location</dt>
                <dd className="card-text">{_.startCase(_.toLower(organization.city)) + ", " + organization.state}</dd>
              </dl>
              <dl className={showOnClick}>
                <dt className="font_micro">Address</dt>
                <dd className="card-text">
                  {
                    organization.street + ",\n" +
                    _.startCase(_.toLower(organization.city)) + ", " + organization.state + "\n " +
                    organization.zip
                  }
                </dd>
              </dl>
              <dl className={showOnClick}>
                <dt className="font_micro">'In Care Of' name</dt>
                <dd className="card-text">
                  {icoFormatter(organization.ico)}
                </dd>
              </dl>
            </div>
            <div className="company-financials">
              <dl>
                <dt className="font_micro">Income</dt>
                <dd className="card-text font_small">{amountValidator(organization.revenue_amt)}</dd>
              </dl>
              <dl>
                <dt className="font_micro">Assets</dt>
                <dd className="card-text font_small">{amountValidator(organization.asset_amt)}</dd>
              </dl>
              <dl>
                <dt className="font_micro">Last Logged Tax Filing</dt>
                <dd className="card-text font_small">{this.formatDate(organization.tax_period)}</dd>
              </dl>
              <dl className={showOnClick}>
                <dt className="font_micro">EIN</dt>
                <dd className="card-text font_small">{existValidator(organization.ein)}</dd>
              </dl>
              <dl className={showOnClick}>
                <dt className="font_micro">Organization Type</dt>
                <dd className="card-text font_small">{organizationCategory(organization.organization)}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

