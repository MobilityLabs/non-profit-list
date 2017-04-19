import _ from 'lodash';
import DocumentMeta from 'react-document-meta';
import React, {Component} from 'react';
import {Link} from 'react-router';

export default class App extends Component {
  render() {
    const appName = 'Export Tool';
    const meta = {
      title: appName,
      auto: {
        ograph: true
      }
    };
    return (
      <DocumentMeta {...meta}>
        {React.cloneElement(
          this.props.children,
          {
            appName: appName,
            ...this.props
          }
        )}
      </DocumentMeta>
    );
  }
}