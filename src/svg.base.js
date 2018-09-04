import { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import getSvgDimensions from './utils/getSvgDimensions';
import getTargetScale from './utils/getTargetScale';
import getTargetTranslate from './utils/getTargetTranslate';
import getTargetDimensions from './utils/getTargetDimensions';
import parseTemplate from './utils/parseTemplate';

let _modules = {};
let _cache = {};

const IDENTITY = (input) => input;

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
    params: PropTypes.object.isRequired,
    onDimensions: PropTypes.func.isRequired,
    style: PropTypes.object,
    transformSrc: PropTypes.func,
    transformContent: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    transformSrc: IDENTITY,
    transformContent: IDENTITY,
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

  fromCacheOrFetch = async () => {
    const { src, transformSrc, transformContent } = this.props;
    const assetSrc = transformSrc(src);

    if (!_cache[assetSrc]) {
      const response = await fetch(assetSrc);
      const content = transformContent(await response.text());
      _cache[assetSrc] = content;
    }

    return _cache[assetSrc];
  };

  fetchSvgContent = async () => {
    this.setState(setLoading(true));
    try {
      const content = await this.fromCacheOrFetch();
      const originDimensions = await getSvgDimensions(content);
      this.setState(setContent(content, originDimensions));
    } catch (exception) {
      this.setState(setError(exception));
    } finally {
      this.setState(setLoading(false));
    }
  };

  handleDimensions(scale) {
    const { style, onDimensions } = this.props;
    const { originDimensions } = this.state;
    const nextDimensions = getTargetDimensions(originDimensions, scale, style);
    if (this._targetWidth !== nextDimensions.width || this._targetHeight !== nextDimensions.height) {
      this._targetWidth = nextDimensions.width;
      this._targetHeight = nextDimensions.height;
      requestAnimationFrame(() => {
        onDimensions({
          width: this._targetWidth,
          height: this._targetHeight,
        });
      });
    }
  }

  render () {
    const { style, params, children } = this.props;
    const { loading, error, content, originDimensions } = this.state;

    if (loading) {
      return children({ loading });
    }

    const scale = getTargetScale(originDimensions, style);
    const targetDimensions = getTargetDimensions(originDimensions, scale, style);
    const translate = getTargetTranslate(originDimensions, scale, style);
    this.handleDimensions(scale);

    const containerStyle = omit({
      ...defaultStyles,
      ...style,
      ...originDimensions,
      transform: [
        ...translate,
        ...(style.transform || {}),
        { scale },
      ],
    }, ['color']);

    return children({
      loading,
      error,
      content: parseTemplate(content, params),
      containerStyle,
      color: style.color,
      targetDimensions,
    });
  }
}
