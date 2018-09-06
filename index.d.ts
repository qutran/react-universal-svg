import * as React from 'react';

export interface SvgProps {
  /**
   * Svg source. 
   */
  src: string;
  /**
   * Svg style.
   */
  style: any;
  /**
   * Params injectable into svg template. Ex. { color: 'red' } will put value 'red' where ${color} string presents.
   */
  params: any;
}

export interface ModulesSignature {
  [key: string]: any;
}

/**
 * Universal Svg component
 */
export default class svg extends React.Component<SvgProps> {
  /**
   * Function for local svg modules registry. Ex. addModules({ mySvg: require('assets/mySvg') }). After that usse Svg component's prop src like src="mySvg".
   * @param modules Local svg modules registry.
   */ 
  static addModules(modules: ModulesSignature): null;
}
