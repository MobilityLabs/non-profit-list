// @flow
import _ from 'lodash';
import DocumentMeta from 'react-document-meta';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class App extends Component {
  props: {
    children: PropTypes.node,
  }
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
            appName,
            ...this.props
          }
        )}
      </DocumentMeta>
    );
  }
}
