// @flow
import _ from 'lodash';
import numeral from 'numeral';
import React, {Component} from 'react';

import './Collapse.scss';

import type {Organization, SummaryData} from '../types';

const MONTHS = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
};

export default class OrganizationCard extends Component {
  props: {
    organization: Organization,
    expanded: Boolean,
    handleCardClick: Function,
    summaryData: SummaryData,
  }

  componentDidUpdate() {
    if (this.props.expanded && window.google && window.google.maps) {
      this.loadGoogleMap();
    }
  }

  loadGoogleMap =() => {
    const googleMap = new window.google.maps.Map(this.refs.map, {
      zoom: 14,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
    });

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({
      address: this.formatAddress(this.props.organization)
    }, (results, status) => {
      if(status === window.google.maps.GeocoderStatus.OK) {
        new window.google.maps.Marker({
          position: results[0].geometry.location,
          map: googleMap
        });
        googleMap.setCenter(results[0].geometry.location);
      }
    });
  }

  formatAddress = (organization: Organization) => {
    return organization.street + ", " + organization.city + ", " + organization.state + " " + organization.zip;
  }

  formatDate = (date: ?number) => {
    let dateString = "Not Listed";
    if (date) {
      const filingDate = date.toString().match(/.{1,4}/g);
      // TODO: Convert this column to ISO format in database
      const month = MONTHS[filingDate[1]];
      const year = filingDate[0];
      return(
        dateString = month + " " + year
      );
    }
    return dateString;
  };

  percentageFormatter = (number: number, key: string) =>{
    const intNumber = parseInt(number, 10);
    const base = this.props.summaryData[key];
    let percentage = ((intNumber - base) / base);
    percentage = numeral(percentage).format('0%');
    if (intNumber > base) {
      return(
        <small className="mr-1 text-success">{percentage}</small>
      );
    } else if (intNumber < base) {
      return(
        <small className="mr-1 text-danger">{percentage}</small>
      );
    }
    return null;
  };

  render() {
    const {organization, handleCardClick, expanded} = this.props;
    const icoFormatter =(name: string) => {return name ? name.replace(/[!@#$%^&* ]( )/gm, "") : "Not Listed";};
    const hideOnClick = (expanded ? " d-none" : " expanded");
    const showOnClick = (expanded ? " expanded" : " d-none");
    const addClassOnClick = (expanded ? " expanded" : "");
    return (
      <div
        className={"organization-card card" + addClassOnClick}
        onClick={handleCardClick.bind(null, organization.ein)}
      >
        <div className="card-block list-card-container">
          <div className="card-container-interaction flex-column">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                id={"checkbox-" + organization.ein}
                value={"checked-" + organization.ein}
                aria-label="..."
                disabled={true}
              />
            </label>
            <label className="form-check-label">
              <input
                className="form-check-input star disabled"
                type="checkbox"
                id={"star-" + organization.ein}
                value={"starred-" + organization.ein}
                aria-label="..."
                disabled={true}
              />
            </label>
          </div>
          <div className="card-container-company">
            <div className="mb-2">
              <h2 className="card-title font_normal mt-0 mb-0 h4">{organization.name}</h2>
              <a className="font_small" target="_blank" href={feelingLuckyURL(organization.name)}>
                <em>I'm Feeling Lucky</em> web search
              </a>
            </div>
            <div className="company-container">
              <div className="company-meta col-md-6 px-0">
                <dl>
                  <dt className="font_micro">NTEE Code</dt>
                  <dd className="card-text font_mono">{existValidator(organization.ntee_cd)}</dd>
                </dl>
                <dl className={hideOnClick}>
                  <dt className="font_micro">Location</dt>
                  <dd className="card-text">
                    <a target="_blank" href={'http://maps.google.com/?q='+this.formatAddress(organization)}>
                      {_.startCase(_.toLower(organization.city)) + ", " + organization.state}
                    </a>
                  </dd>
                </dl>
                <dl className={showOnClick}>
                  <dt className="font_micro">Address</dt>
                  <dd className="card-text">
                    <a target="_blank" href={'http://maps.google.com/?q='+this.formatAddress(organization)}>
                      {
                        organization.street + ", " +
                        _.startCase(_.toLower(organization.city)) + ", " + organization.state + " " +
                        organization.zip
                      }
                    </a>
                  </dd>
                </dl>
                <div className={"company-map mb-sm-2 mb-md-0" + showOnClick}>
                  <div className="user-map" ref="map"/>
                </div>
              </div>
              <div className="company-financials col-md-6 px-0 text-left text-md-right">
                <dl>
                  <dt className="font_micro">Income</dt>
                  <dd className="card-text font_small">
                    {this.percentageFormatter(organization.income_amt, 'income_med')}
                    {amountValidator(organization.income_amt)}
                  </dd>
                </dl>
                <dl className={showOnClick}>
                  <dt className="font_micro">Revenue</dt>
                  <dd className="card-text font_small">
                    {this.percentageFormatter(organization.revenue_amt, 'revenue_med')}
                    {amountValidator(organization.revenue_amt)}
                  </dd>
                </dl>
                <dl>
                  <dt className="font_micro">Assets</dt>
                  <dd className="card-text font_small">
                    {this.percentageFormatter(organization.asset_amt, 'asset_med')}
                    {amountValidator(organization.asset_amt)}
                  </dd>
                </dl>
                <dl>
                  <dt className="font_micro">Last Logged Tax Filing</dt>
                  <dd className="card-text font_small">{this.formatDate(organization.tax_period)}</dd>
                </dl>
                <dl className={showOnClick}>
                  <dt className="font_micro">'In Care Of' name</dt>
                  <dd className="card-text font_small">
                    {icoFormatter(organization.ico)}
                  </dd>
                </dl>
                <dl className={showOnClick}>
                  <dt className="font_micro">Organization Type</dt>
                  <dd className="card-text font_small">{organizationCategory(organization.organization)}</dd>
                </dl>
                <dl className={showOnClick}>
                  <dt className="font_micro">Deductibility</dt>
                  <dd className="card-text font_small">{deductibilityCategory(organization.deductibility)}</dd>
                </dl>
                <dl className={showOnClick}>
                  <dt className="font_micro">EIN</dt>
                  <dd className="card-text font_small font_mono">{existValidator(organization.ein)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function feelingLuckyURL(name: string) {
  return "https://duckduckgo.com/?q=!ducky+" + encodeURIComponent(name);
}
function existValidator(object: ?number|?string) {return object ? object : "Not Listed";}
function amountValidator(number: ?number) {return number ? numeral(number).format('$0,0.00') : "Not Listed";}
function organizationCategory(number: ?string) {
  let category = "";
  switch (number) {
  case 1:
    category = "Corporation";
    break;
  case 2:
    category = "Trust";
    break;
  case 3:
    category = "Co-operative";
    break;
  case 4:
    category = "Partnership";
    break;
  case 5:
    category = "Association";
    break;
  default:
    category = "Not listed";
  }
  return category;
}
function deductibilityCategory(number: ?string) {
  let deductibilityCategory = "";
  switch (number) {
  case 1:
    deductibilityCategory = "Contributions are deductible";
    break;
  case 2:
    deductibilityCategory = "Contributions are not deductible";
    break;
  case 4:
    deductibilityCategory = "Contributions are deductible by treaty (foreign organizations)";
    break;
  default:
    deductibilityCategory = "Not listed";
  }
  return deductibilityCategory;
}
