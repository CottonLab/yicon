import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,             // className (based on mouse position)
  instancePrefix: PropTypes.string.isRequired,  // unique prefix for the ids (used for aria)
  isDisabled: PropTypes.bool,              // the option is disabled
  isFocused: PropTypes.bool,               // the option is focused
  isSelected: PropTypes.bool,              // the option is selected
  onFocus: PropTypes.func,                 // method to handle mouseEnter on option element
  onSelect: PropTypes.func,                // method to handle click on option element
  onUnfocus: PropTypes.func,               // method to handle mouseLeave on option element
  option: PropTypes.object.isRequired,     // object that is base for that option
  optionIndex: PropTypes.number,
  // index of the option, used to generate unique ids for aria
};

export default class Option extends Component {
  // constructor(props) {
  //   super(props);
  // }
  onFocus(event) {
    if (!this.props.isFocused) {
      this.props.onFocus(this.props.option, event);
    }
  }
  blockEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    if ((event.target.tagName !== 'A') || !('href' in event.target)) {
      return;
    }
    if (event.target.target) {
      window.open(event.target.href, event.target.target);
    } else {
      window.location.href = event.target.href;
    }
  }
  handleMouseDown(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  }
  handleMouseEnter(event) {
    this.onFocus(event);
  }
  handleMouseMove(event) {
    this.onFocus(event);
  }
  handleTouchEnd(event) {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if (this.dragging) return;

    this.handleMouseDown(event);
  }
  handleTouchMove(event) {
    // Set a flag that the view is being dragged
    console.log(event);
    this.dragging = true;
  }
  handleTouchStart(event) {
    console.log(event);
    // Set a flag that the view is not being dragged
    this.dragging = false;
  }
  render() {
    const { option, instancePrefix, optionIndex } = this.props;
    const className = classNames(this.props.className, option.className);
    /* {instancePrefix + '-option-' + optionIndex}*/
    return option.disabled ? (
      <div
        className={className}
        onMouseDown={this.blockEvent}
        onClick={this.blockEvent}
      >
				{this.props.children}
      </div>
		) : (
      <div
        className={className}
        style={option.style}
        role="option"
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        id={`${instancePrefix}-option-${optionIndex}`}
        title={option.title}
      >
				{this.props.children}
      </div>
		);
  }
}


Option.propTypes = propTypes;