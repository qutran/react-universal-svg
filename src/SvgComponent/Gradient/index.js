import React, { Component, Children } from 'react';
import Context from './GradientContext';
import { omit } from '../../utils';

const getStopsCollector = (totalStops) => {
  let stops = [];

  return {
    upsert(stop) {
      this.isFilled() ? this.update(stop) : this.insert(stop);
      return this.isFilled();
    },
    insert(stop) {
      stops = [...stops, stop];
    },
    update(stop) {
      stops = stops.map((_stop) => stop.index === _stop.index ? stop : _stop);
    },
    isFilled() {
      return stops.length === totalStops;
    },
    get() {
      return stops;
    }
  };
};

export default (BaseGradient, BaseStop) => {
  class Gradient extends Component {

    state = {
      stops: [],
    };

    constructor(props) {
      super(props);
      this._stopsCollector = getStopsCollector(Children.count(this.props.children));
    }

    componentWillUnmount() {
      this._stopsCollector = null;
    }

    handleStopData = (stop) => {
      if (this._stopsCollector.upsert(stop)) {
        this.setState({ stops: this._stopsCollector.get() });
      }
    };

    render () {
      const { children } = this.props;
      const { stops } = this.state;

      return (
        <React.Fragment>
          <Context.Provider value={this.handleStopData}>
            {children}
          </Context.Provider>
          {this._stopsCollector.isFilled() && (
            <BaseGradient {...omit(this.props, ['children'])}>
              {stops.map((stop) => <BaseStop key={stop.index} {...stop} />)}
            </BaseGradient>
          )}
        </React.Fragment>
      );
    }
  }

  return Gradient;
};
