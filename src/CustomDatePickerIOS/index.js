import React, { Component, PropTypes } from 'react';
import { DatePickerIOS, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal'

import styles from './index.style';

export default class CustomDatePickerIOS extends Component {
  static propTypes = {
    cancelTextIOS: PropTypes.string,
    confirmTextIOS: PropTypes.string,
    customCancelButtonIOS: PropTypes.node,
    customConfirmButtonIOS: PropTypes.node,
    customTitleContainerIOS: PropTypes.node,
    datePickerContainerStyleIOS: View.propTypes.style,
    date: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    titleIOS: PropTypes.string,
    isVisible: PropTypes.bool,
    animationIn: PropTypes.string,
    animationInTiming: PropTypes.number,
    animationOut: PropTypes.string,
    animationOutTiming: PropTypes.number
  };

  static defaultProps = {
    cancelTextIOS: 'Cancel',
    confirmTextIOS: 'Confirm',
    date: new Date(),
    mode: 'date',
    titleIOS: 'Pick a date',
    isVisible: false,
    animationIn: 'slideInUp',
    animationInTiming: 300,
    animationOut: 'slideOutDown',
    animationOutTiming: 300
  };

  state = {
    date: this.props.date,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.setState({
        date: nextProps.date,
      });
    }
  }

  _handleConfirm = () => this.props.onConfirm(this.state.date);

  _handleDateChange = date => this.setState({ date });

  render() {
    const {
      onCancel,
      isVisible,
      mode,
      titleIOS,
      confirmTextIOS,
      cancelTextIOS,
      customCancelButtonIOS,
      customConfirmButtonIOS,
      customTitleContainerIOS,
      datePickerContainerStyleIOS,
      date,
      animationIn,
      animationInTiming,
      animationOut,
      animationOutTiming,
      ...otherProps
    } = this.props;

    const titleContainer = (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{titleIOS}</Text>
      </View>
    );
    const confirmButton = (
      <View style={styles.confirmButton}>
        <Text style={styles.confirmText}>{confirmTextIOS}</Text>
      </View>
    );
    const cancelButton = (
      <View style={styles.cancelButton}>
        <Text style={styles.cancelText}>{cancelTextIOS}</Text>
      </View>
    );
    return (
      <Modal
        isVisible={isVisible}
        backdropOpacity={0.0}
        animationIn={animationIn}
        animationInTiming={animationInTiming}
        animationOut={animationOut}
        animationOutTiming={animationOutTiming}
        style={styles.contentContainer}>
        <View style={[styles.datepickerContainer, datePickerContainerStyleIOS]}>
          {customTitleContainerIOS || titleContainer}
          <DatePickerIOS
            date={this.state.date}
            mode={mode}
            onDateChange={this._handleDateChange}
            {...otherProps}
          />
          <TouchableOpacity onPress={this._handleConfirm}>
            {customConfirmButtonIOS || confirmButton}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          {customCancelButtonIOS || cancelButton}
        </TouchableOpacity>
      </Modal>
    );
  }
}
