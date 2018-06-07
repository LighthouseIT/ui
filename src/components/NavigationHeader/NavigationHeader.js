import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, Platform, View } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import * as _ from 'lodash';
import color from 'tinycolor2';

import { connectStyle } from '@shoutem/theme';
import { connectAnimation } from '@shoutem/animation';

import composeComponents from './ComposeComponents';

class NavigationHeader extends Component {
  static defaultProps = {
    id: 'default',
  };

  static propTypes = {
    leftComponent: PropTypes.node,
    centerComponent: PropTypes.node,
    rightComponent: PropTypes.node,
    style: PropTypes.object,
    id: PropTypes.string,
  };

  componentDidMount() {
    const backgroundColor = this.getBackgroundColor(this.props.style);
    this.setStatusBarStyle(backgroundColor);
  }

  componentWillUnmount() {
    const backgroundColor = this.getBackgroundColor(this.props.style);
    this.unsetStatusBarStyle(backgroundColor);
  }

  getBackgroundColor = (style) => {
    const bgColor = _.find(style, (styleDef) =>
      styleDef.backgroundColor && styleDef.backgroundColor !== 'transparent'
    );
    return bgColor && bgColor.backgroundColor || 'transparent';
  }

  getBackgroundColorBrightness = (backgroundColor) => {
    return color(backgroundColor).isDark();
  }

  setStatusBarStyle = (backgroundColor) => {
    const barStyle = this.getBackgroundColorBrightness(backgroundColor)
      ? 'light-content'
      : 'dark-content';

    StatusBar.setBarStyle(barStyle);
  }

  unsetStatusBarStyle = (backgroundColor) => {
    const barStyle = !this.getBackgroundColorBrightness(backgroundColor)
      ? 'light-content'
      : 'dark-content';

    StatusBar.setBarStyle(barStyle);
  }

  render() {
    const {
      leftComponent,
      rightComponent,
      centerComponent,
      style,
      id,
    } = this.props;

    return (
      <SafeAreaView key={id} style={style.container} forceInset={{ top: 'always' }}>
        <View style={style.componentsContainer}>
          <View style={style.leftComponent}>{leftComponent}</View>
          <View style={style.centerComponent}>{centerComponent}</View>
          <View style={style.rightComponent}>{rightComponent}</View>
        </View>
      </SafeAreaView>
    );
  }
}

const AnimatedNavigationHeader = connectAnimation(NavigationHeader);
const StyledNavigationHeader = connectStyle('lh.ui.NavigationHeader')(AnimatedNavigationHeader);
const ComposedNavigationHeader = withNavigation(
  composeComponents(StyledNavigationHeader)
);

export {
  ComposedNavigationHeader as NavigationHeader,
};
