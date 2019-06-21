/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import React, { Component } from 'react';


export default class TouchableOpacity extends Component {
  state={
    pressed: false,
  }

  handleButtonPress= () => {
    const { onLongPress, withoutFeedback } = this.props;
    this.setState({ pressed: true });
    this.buttonPressTimer = setTimeout(onLongPress, 500);
  }

  handleButtonRelease= () => {
    this.setState({ pressed: false });
    clearTimeout(this.buttonPressTimer);
  }


  render() {
    const { children, onPress, withoutFeedback } = this.props;
    const { pressed } = this.state;
    let { style } = this.props;
    if (!withoutFeedback) {
      style = { ...styles.container, ...(pressed ? styles.containerPressed : styles.containerNotPressed), ...style };
    }
    return (
      <div
        style={style}
        onClick={onPress}
        onTouchStart={this.handleButtonPress}
        onTouchEnd={this.handleButtonRelease}
        onMouseDown={this.handleButtonPress}
        onMouseUp={this.handleButtonRelease}
        onMouseLeave={this.handleButtonRelease}
      >
        {children}
      </div>
    );
  }
}

const styles = {
  container: {
    cursor: 'pointer',
  },
  containerNotPressed: {
    opacity: 1,
  },
  containerPressed: {
    opacity: 0.5,
  },
};

TouchableOpacity.defaultProps = {
  onPress: () => {},
  onLongPress: () => {},
  withoutFeedback: false,
  style: {},
};

TouchableOpacity.propTypes = {
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  children: PropTypes.node,
  withoutFeedback: PropTypes.bool,
  style: PropTypes.object,
};
