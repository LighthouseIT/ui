import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';

import { connectStyle } from '@shoutem/theme';

class Icon extends Component {
  static defaultProps = {
    size: 24,
    color: null,
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
  };

  render() {
    const IconComponent = Feather;
    const { color, ...props } = this.props;
    const style = { ...props.style };
    delete style.color;

    return (
      <IconComponent
        style={style}
        name={this.props.name}
        size={this.props.size}
        color={color || props.style.color}
      />
    );
  }
}

const StyledIcon = connectStyle('lh.ui.Icon')(Icon);

export { StyledIcon as Icon };
