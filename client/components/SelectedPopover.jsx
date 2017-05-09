// @flow
import React, {Component} from 'react';

import './SelectedPopover.scss';

export default class SelectedPopover extends Component {

  componentDidMount() {
    if (google && google.maps) {
      // Coordinates to center the map
      const myLatlng = new google.maps.LatLng(52.525595, 13.393085);
      // Other options for the map, pretty much selfexplanatory
      const mapOptions = {
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
      };
      // Attach a map to the DOM Element, with the defined settings
      const map = this.refs.map;
      new google.maps.Map(map, mapOptions);
    }
  }
  render() {
    return (
      <div className="fixed-bottom disable-click-events">
        <div className="container">
          <div className="row">
            <div className="push-md-8 col-md-4">
              <div className="selected-popover enable-click-events">
                <div className="header">
                  <h5 className="my-0 font_small">Selected Organizations <small className="text-muted">4</small></h5>
                  <div className="controls">
                    <button className="btn btn-link btn-sm">
                      <i className="fa fa-fw fa-window-minimize" aria-hidden="true"/>
                    </button>
                    <button className="btn btn-link btn-sm">
                      <i className="fa fa-fw fa-expand" aria-hidden="true"/>
                    </button>
                  </div>
                </div>
                <div className="body">
                  <div className="fixed-ratio-container">
                    <div className="fixed-ratio">
                      <div className="user-map" ref="map"/>
                    </div>
                  </div>
                  <div className="body-meta">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Average Revenue</th>
                          <th>$77,758</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Company Name</td>
                          <td>$120,093</td>
                        </tr>
                        <tr>
                          <td>Company Name</td>
                          <td>$120,093</td>
                        </tr>
                        <tr>
                          <td>Company Name</td>
                          <td>$120,093</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Average Revenue</th>
                          <th>$77,758</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Company Name</td>
                          <td>$120,093</td>
                        </tr>
                        <tr>
                          <td>Company Name</td>
                          <td>$120,093</td>
                        </tr>
                        <tr>
                          <td>Company Name</td>
                          <td>$120,093</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
