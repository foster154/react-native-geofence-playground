import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

class PollingButton extends Component {
  render() {
    const { active, setPolling } = this.props
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setPolling(!active)
          }}
        >
          {active ? (
            <View>
              <FontAwesome name="toggle-on" size={48} color={'#25A0DA'} />
            </View>
          ) : (
            <View>
              <FontAwesome name="toggle-off" size={48} color={'#ccc'} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    )
  }
}

PollingButton.propTypes = {
  // component declaration
  active: PropTypes.bool,
  setPolling: PropTypes.func
}

export default PollingButton
