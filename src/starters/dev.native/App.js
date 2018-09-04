import React from 'react';
import Svg from '../../svg.native';
import { StatusBar } from 'react-native';
import Expo from 'expo';

StatusBar.setHidden(true);
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);

Svg.addModules({
  mock: require('../assets/mock.svg'),
});

export default () => (
  <Svg src="https://upload.wikimedia.org/wikipedia/commons/4/42/Sample-image.svg" style={{ color: 'red', width: 100 }} />
);
