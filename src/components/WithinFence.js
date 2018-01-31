import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

class PollingButton extends Component {
  render() {
    const { value } = this.props
    return (
      <View style={s.wrapper}>
        <Text style={s.label}>Within Geofence:</Text>
        <View style={s.iconWrapper}>
          {value ? (
            <FontAwesome name="check" size={120} color={'#88BF40'} />
          ) : (
            <FontAwesome name="close" size={120} color={'#D0021B'} />
          )}
        </View>
      </View>
    )
  }
}

PollingButton.propTypes = {
  // component declaration
  value: PropTypes.bool
}

export default PollingButton

const s = StyleSheet.create({
  wrapper: {
    marginTop: 80
  },
  label: {
    fontSize: 15,
    color: '#777'
  },
  iconWrapper: {}
})
