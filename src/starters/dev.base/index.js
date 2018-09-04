import React, { Component } from 'react';
import PropTypes from 'prop-types';

const setComponent = (Component) => (prevState) => ({
  ...prevState,
  Component,
});

const setLoading = (loading) => (prevState) => ({
  ...prevState,
  loading,
});

const setError = (error) => (prevState) => ({
  ...prevState,
  error,
});

export default class DevBase extends Component {

  static propTypes = {
    loader: PropTypes.object.isRequired,
  };

  state = {
    Component: null,
    loading: true,
    error: null,
  };

  async componentDidMount() {
    const { loader } = this.props;

    try {
      this.setState(setLoading(true));
      this.setState(setComponent(await loader));
    } catch (ex) {
      this.setState(setError(ex));
    }
  }

  render () {
    const { loading, error, Component } = this.state;
    console.log({ loading, error, Component });

    if (loading) {
      return 'loading ...';
    }

    if (error) {
      return (
        <div style={{ color: 'red' }}>
          Error occurred: {error}
        </div>
      );
    }

    return <Component />;
  }
}
