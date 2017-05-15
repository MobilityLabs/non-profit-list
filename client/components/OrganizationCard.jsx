// @flow
import _ from 'lodash';
import numeral from 'numeral';
import React, {Component} from 'react';

import './Collapse.scss';

import type {Organization} from '../types';

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
    if (this.props.expanded && google && google.maps) {
      this.loadGoogleMap();
    }
  }

  loadGoogleMap =() => {
    const googleMap = new google.maps.Map(this.refs.map, {
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
    });

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      address: this.formatAddress(this.props.organization)
    }, (results, status) => {
      if(status === google.maps.GeocoderStatus.OK) {
        new google.maps.Marker({
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
  render() {
    const feelingLuckyURL = (name: string) => {
      return "https://duckduckgo.com/?q=!ducky+" + encodeURIComponent(name);
    };
    const {organization, handleCardClick, expanded, summaryData} = this.props;
    const existValidator =(object: ?number|?string) => {return object ? object : "Not Listed";};
    const amountValidator = (number: ?number) => {return number ? numeral(number).format('$0,0.00') : "Not Listed";};
    const organizationCategory = (number: ?number) =>{
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
    };
    const deductibilityCategory = (number: ?number) =>{
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
    };
    const percentageFormatter = (number: number, key: string) =>{
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
            <div className="mb-2">
              <h2 className="card-title font_normal mt-0 mb-0 h4">{organization.name}</h2>
              <a className="font_small" target="_blank" href={feelingLuckyURL(organization.name)}>
                <em>I'm Feeling Lucky</em> web search
              </a>
            </div>
            <div className="company-container">
              <div className="company-meta">
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
              <div className="company-financials text-left text-md-right">
                <dl>
                  <dt className="font_micro">Income</dt>
                  <dd className="card-text font_small">
                    {percentageFormatter(organization.income_amt, 'income_avg')}
                    {amountValidator(organization.income_amt)}
                  </dd>
                </dl>
                <dl className={showOnClick}>
                  <dt className="font_micro">Revenue</dt>
                  <dd className="card-text font_small">
                    {percentageFormatter(organization.revenue_amt, 'revenue_avg')}
                    {amountValidator(organization.revenue_amt)}
                  </dd>
                </dl>
                <dl>
                  <dt className="font_micro">Assets</dt>
                  <dd className="card-text font_small">
                    {percentageFormatter(organization.asset_amt, 'asset_avg')}
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

