import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import twix from 'twix';
import _ from 'lodash';
import { Calendar as RNCalendar, CalendarList } from 'react-native-calendars';
import { Icon } from '../';

import { connectStyle } from '@shoutem/theme';

class Calendar extends Component {
  static defaultProps = {
    onRef: () => undefined,
    current: new Date(),
    markedDates: {},
  };

  static propTypes = {
    ...CalendarList.propTypes,
    onRef: PropTypes.func,
    onValueChange: PropTypes.func.isRequired,
    style: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      markedDates: props.markedDates,
    };
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUpdate(nextProps) {
    if (!_.isEqual(nextProps.markedDates, this.props.markedDates)) {
      this.setState({ markedDates: nextProps.markedDates });
    }
  }

  componentWillUnmount() {
    this.props.onRef(this);
  }

  selectPeriod = day => {
    const { style } = this.props;
    const selectedDate = day.dateString;
    let newDates = { ...this.state.markedDates };

    if (_.keys(newDates).length > 1) {
      newDates = {};
      this.clear();
    }

    if (!_.keys(newDates).length) {
      newDates[selectedDate] = {
        selected: true,
        startingDay: true,
        endingDay: true,
        color: style.markedDayColor,
      };
    } else if (_.keys(newDates).length === 1) {
      const firstDate = _.keys(newDates)[0];
      const fromDate = moment(firstDate);
      const toDate = moment(selectedDate);
      const range = moment(fromDate).twix(toDate).toArray('days');

      _.forEach(range, (value, index) => {
        const date = moment(value).format('YYYY-MM-DD');

        if (index === 0 && fromDate !== toDate) {
          newDates[date] = {
            selected: true,
            startingDay: true,
            color: style.markedDayColor,
          };
        } else if (index === range.length - 1) {
          newDates[date] = {
            selected: true,
            endingDay: true,
            color: style.markedDayColor,
          };
        } else {
          newDates[date] = {
            selected: true,
            color: style.markedDayColor,
          };
        }
      });
    }
    this.setState({ markedDates: newDates });
    this.onValueChange(newDates);
  }

  onDayPress = day => {
    const { markingType } = this.props;

    if (markingType === 'period') {
      this.selectPeriod(day);
    } else {
      this.onValueChange(day);
    }
  }

  onValueChange = (value) => {
    const { onValueChange } = this.props;
    onValueChange(value);
  }

  clear = () => {
    this.setState({ markedDates: {} });
    this.onValueChange({});
  }

  render() {
    const { markedDates } = this.state;
    const { current, ...props } = this.props;
    const style = { ...props.style };
    delete style.markedDayColor;
    delete style.iconColor;

    return (
      <RNCalendar
        {..._.omit(props, 'style')}
        style={style}
        theme={{
          todayTextColor: props.style.markedDayColor,
          selectedDayBackgroundColor: props.style.markedDayColor,
        }}
        renderArrow={(direction) => (
          <Icon name={`chevron-${direction}`} color={props.style.iconColor} />
        )}
        current={current}
        markedDates={markedDates}
        onDayPress={this.onDayPress}
      />
    );
  }
}

const StyledCalendar = connectStyle('lh.ui.Calendar')(Calendar);

export { StyledCalendar as Calendar };
