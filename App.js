/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import { Client, Configuration } from 'bugsnag-react-native';

const config = new Configuration('5d1ec8bd39a74caa1267142706a7fb20');
config.appVersion = require('./package.json').version;
const bugsnag = new Client(config);

function triggerException() {
  bogusFunction(); // eslint-disable-line no-undef
}

function triggerHandledException() {
  bogusHandledFunction(); // eslint-disable-line no-undef
}

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Button
              title="Trigger JS Exception"
              onPress={triggerException} />
        <Text>
        Tap this button to send a JS crash to Bugsnag
        </Text>
        <Button
          title="Send Handled JS Exception"
          onPress={() => {
            try { // execute crashy code
              triggerHandledException();
            } catch (error) {
              bugsnag.notify(error);
            }
          }} />
        <Text>
          Tap this button to send a handled error to Bugsnag
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
