import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit, pick } from '..';
import parseTemplate, { getParamsFromTemplate } from '../parseTemplate';

const ParamsContext = React.createContext({});

class ParamsConsumer extends Component {

  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const values = Object.values(omit(props, ['children']));
    this._watch = values.reduce((acc, next) => [...acc, ...getParamsFromTemplate(next)], []);
    this._watch = [...new Set(this._watch)];
  }

  assignParams = (props, nextParams) => {
    const paramsForParsing = pick(nextParams, this._watch);
    const nextProps = {};

    for (const [key, value] of Object.entries(omit(props, ['children']))) {
      nextProps[key] = parseTemplate(value, paramsForParsing);
    }

    return nextProps;
  };

  render () {
    if (!this._watch.length) {
      return this.props.children(this.props);
    }

    return (
      <ParamsContext.Consumer>
        {(params) => this.props.children(this.assignParams(this.props, params))}
      </ParamsContext.Consumer>
    );
  }
}

export default {
  Provider: ParamsContext.Provider,
  Consumer: ParamsConsumer,
};
