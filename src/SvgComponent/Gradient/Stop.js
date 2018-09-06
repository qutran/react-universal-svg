import React, { PureComponent } from 'react';
import Context from './GradientContext';
import { omit } from '../../utils';

export default class Stop extends PureComponent {
  componentDidMount() {
    this._callback(this.getStopProps());
  }

  componentDidUpdate() {
    this._callback(this.getStopProps());
  }

  componentWillUnmount() {
    this._callback = null;
  }

  getStopProps = () => {
    return omit(this.props, ['children']);
  }

  handleCallback = (callback) => {
    this._callback = callback;
  };

  render () {
    return (
      <Context.Consumer>
        {this.handleCallback}
      </Context.Consumer>
    );
  }
}
