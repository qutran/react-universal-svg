import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit } from '../utils';
import getSvgDimensions from '../utils/getSvgDimensions';
import getTargetScale from '../utils/getTargetScale';
import getTargetTranslate from '../utils/getTargetTranslate';
import getTargetDimensions from '../utils/getTargetDimensions';
import compileSvg, { ColorProvider, ParamsProvider } from '../utils/compileSvg';
import transformSrc from '../utils/transformSrc';
import createFetch from '../utils/createFetch';

let _modules = {};
let _cache = {};

const defaultStyles = {
  overflow: 'hidden',
  backgroundColor: 'transparent',
};

const setContent = (content, originDimensions) => (prevState) => ({
  ...prevState,
  content,
  originDimensions,
});

const setError = (error) => (prevState) => ({
  ...prevState,
  error,
});

const setLoading = (loading) => (prevState) => ({
  ...prevState,
  loading,
});

export default class SvgBase extends Component {

  static propTypes = {
    children: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    params: PropTypes.object,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  static addModules = (modules) => {
    _modules = { ..._modules, ...modules };
  };

  static getModules = () => _modules;

  state = {
    content: null,
    error: null,
    loading: true,
    originDimensions: {},
  };

  componentDidMount() {
    this.fetchSvgContent();
  }

  componentDidUpdate(prevProps) {
    if (this.props.src !== prevProps.src) {
      this.fetchSvgContent();
    }
  }

  componentWillUnmount() {
    if (typeof this._abortFetch === 'function') {
      this._abortFetch();
    }
  }

  fromCacheOrFetch = async () => {
    const { src } = this.props;
    const assetSrc = transformSrc(src);

    if (!_cache[assetSrc]) {
      const { fetch, abort } = createFetch();
      this._abortFetch = abort;
      const content = await fetch(assetSrc);
      this._abortFetch = null;
      _cache[assetSrc] = content;
    }

    return _cache[assetSrc];
  };

  fetchSvgContent = async () => {
    this.setState(setLoading(true));
    try {
      const content = await this.fromCacheOrFetch();
      const originDimensions = await getSvgDimensions(content);
      this.setState(setContent(compileSvg(content), originDimensions));
    } catch (exception) {
      this.setState(setError(exception));
    } finally {
      this.setState(setLoading(false));
    }
  };

  render () {
    const { style, params, children } = this.props;
    const { loading, error, content, originDimensions } = this.state;

    if (loading) {
      return children({ loading });
    }

    const scale = getTargetScale(originDimensions, style);
    const targetDimensions = getTargetDimensions(originDimensions, scale, style);
    const translate = getTargetTranslate(originDimensions, scale, style);

    const containerStyle = omit({
      ...defaultStyles,
      ...style,
      ...originDimensions,
      transform: [
        ...translate,
        ...(style.transform || []),
        { scale },
      ],
    }, ['color']);

    const contentElement = (
      <ColorProvider value={style.color}>
        <ParamsProvider value={params}>
          {content}
        </ParamsProvider>
      </ColorProvider>
    );

    return children({
      loading,
      error,
      content: contentElement,
      containerStyle,
      targetDimensions,
    });
  }
}
