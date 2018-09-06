import Expo from 'expo';
import SvgBase from '../../SvgBase';
export default (src) => SvgBase.getModules()[src] ? Expo.Asset.fromModule(SvgBase.getModules()[src]).uri : src;
