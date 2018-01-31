import React, { Component } from 'react'
import { Platform, Text, View, StyleSheet } from 'react-native'
import { Constants, Location, Permissions } from 'expo'
import geolib from 'geolib'

import PollingButton from './src/components/PollingButton'
import WithinFence from './src/components/WithinFence'
import { apiSendPosition } from './src/api/endpoints'

export default class App extends Component {
  points = [
    { latitude: 43.64252449760393, longitude: -116.26446157693863 },
    { latitude: 43.64267686645424, longitude: -116.26431807875633 },
    { latitude: 43.64275256548461, longitude: -116.26448571681976 },
    { latitude: 43.64260213783073, longitude: -116.26462519168854 }
  ]

  state = {
    pollingActive: true,
    latitude: null,
    longitude: null,
    errorMessage: null
  }

  beginPolling() {
    this.pollingInterval = setInterval(() => {
      this._getLocationAsync()
    }, 1000)
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      })
    } else {
      this.beginPolling()
    }
  }

  _getLocationAsync = async () => {
    if (this.state.pollingActive) {
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied'
        })
      }

      let location = await Location.getCurrentPositionAsync({})
      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
      apiSendPosition(
        location.coords.latitude,
        location.coords.longitude,
        this.withinGeoFence()
      )
    }
  }

  withinGeoFence() {
    const { latitude, longitude } = this.state
    if (latitude && longitude) {
      return geolib.isPointInside({ latitude, longitude }, this.points)
    } else {
      return null
    }
  }

  render() {
    let withinFence = false
    if (this.withinGeoFence()) {
      withinFence = true
    }

    console.log('ping')

    return (
      <View style={styles.container}>
        <PollingButton
          active={this.state.pollingActive}
          setPolling={value => this.setState({ pollingActive: value })}
        />

        <Text style={styles.paragraph}>
          {this.state.latitude}, {this.state.longitude}
        </Text>

        <WithinFence value={this.withinGeoFence()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center'
  }
})
