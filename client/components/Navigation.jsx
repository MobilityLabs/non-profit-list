// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';

import SearchField from './SearchField';

import './Navigation.scss';

export default class Navigation extends Component {
  render() {
    return (
      <div className="main-nav row bg-light pt-md-3">
        <div className="col-sm-12 col-md-4">
          <Link to="/" className="h2 d-block my-3 my-md-0">Philanthrogator</Link>
        </div>
        <div className="col-sm-12 col-md-8">
          <div className="row mb-2">
            <div className="col-8 col-md-6">
              <SearchField {...this.props}/>
            </div>
            <div className="col col-md-6">
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  <a className="nav-link btn btn-primary" href="#">Sign Up</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" href="#">All Records</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">My Favorites</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
