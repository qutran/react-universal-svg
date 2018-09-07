# react-universal-svg

The flexible universal SVG component that renders with DOM and react-native (expo) in an identical way.

# Installation
```npm i --save @kotolis/react-universal-svg```

# Usage
For web, android, ios:
```javascript
import React from 'react';
import Svg from '@kotolis/react-universal-svg';

Svg.addModules({
  mock: require('./assets/mock.svg'),
  front: require('./assets/card_front.svg'),
});

const SampleComponentWithForSvg = () => (
  <React.Fragment>
    {/* local svg with color sample */}
    <Svg
      src="mock"
      style={{ color: 'red', width: 100 }}
    />
    {/* local svg with color and params sample (just put ${a} inside your svg file) */}
    <Svg
      src="front" style={{ color: 'red', width: 100 }}
      params={{ a: 'A' }}
    />
    {/* remote svg sample */}
    <Svg
      src="https://upload.wikimedia.org/wikipedia/commons/4/42/Sample-image.svg"
      style={{ width: 100 }}
    />
  </React.Fragment>
);
```

# What is this?
This library attempts to propose SVG component loader with:
  1. universal way of loading and usage SVG files on web and native (using [Expo](https://github.com/expo/expo)) platforms.
  2. possibility to apply parameters for interactions on the component level and making your SVG more flexible.
  3. possibility to use ```currentColor``` as a value on the properties for native platforms, that doesn't provided by [Expo's](https://github.com/expo/expo) Svg component, that uses [react-native-svg](https://github.com/react-native-community/react-native-svg) package by default, and on the web platform, where doesn't allow to do this by DOM using ```<img src>``` way.
  4. determination of the correct SVG dimensions even if you are applying ```scale``` transformation on it.
