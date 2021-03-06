import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View as RNView, ViewPropTypes } from 'react-native';

import { connectStyle } from '@shoutem/theme';
import { connectAnimation } from '@shoutem/animation';

class View extends Component {
  static propTypes = {
    ...ViewPropTypes,
    style: PropTypes.object,
  };

  render() {
    const { style, ...props } = this.props;

    return (
      <RNView style={style} {...props}>
        {this.props.children}
      </RNView>
    );
  }
}

const AnimatedView = connectAnimation(View);
const StyledView = connectStyle('lh.ui.View')(AnimatedView);

export { StyledView as View };
