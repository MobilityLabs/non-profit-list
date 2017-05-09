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
    const icoFormatter =(name: String) => {return name ? name.replace(/[!@#$%^&* ]( )/gm, "") : "Not Listed";};
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
            <div className="company-meta">
              <h2 className="card-title font_normal mt-0 h4">{organization.name}</h2>
              <dl>
                <dt className="font_micro">NTEE Code</dt>
                <dd className="card-text font_mono">{organization.ntee_cd}</dd>
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
              <div className={"company-map" + showOnClick}>
                <div className="user-map" ref="map"/>
              </div>
            </div>
            <div className="company-financials">
              <dl>
                <dt className="font_micro">Income</dt>
                <dd className="card-text font_small">{amountValidator(organization.income_amt)}</dd>
              </dl>
              <dl className={showOnClick}>
                <dt className="font_micro">Revenue</dt>
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
                <dt className="font_micro">EIN</dt>
                <dd className="card-text font_small font_mono">{existValidator(organization.ein)}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

