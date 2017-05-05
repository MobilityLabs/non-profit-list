import moment from 'moment';
import React, {Component} from 'react';
import {Link} from 'react-router';

import './Navigation.scss';

export default class Navigation extends Component {
   render() {
    return (
      <div className="main-nav row bg-light pt-3">
        <div className="col-md-4">
          <h1 className="my-0">Philanthrogator</h1>
        </div>
        <div className="col-md-8">
          <div className="row mb-2">
            <div className="col-md-6">
              <div className="input-group btn-in-form nav-search">
                <input type="text" className="form-control" placeholder="Search for..."/>
                <span className="input-group-btn">
                  <button className="btn" type="button">
                    <i className="fa fa-fw fa-search" aria-hidden="true"></i>
                  </button>
                </span>
              </div>
            </div>
            <div className="col-md-6">
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