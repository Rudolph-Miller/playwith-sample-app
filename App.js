/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { SafeAreaView, StatusBar, useColorScheme, } from 'react-native';
import { RecoilRoot } from 'recoil';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NativeRouter, Route, BackButton } from 'react-router-native';

import { Top, WebView } from './src/screens';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <RecoilRoot>
      <NativeRouter>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <BackButton>
          <Route exact path='/' component={Top} />
          <Route exact path='/web-view' component={WebView} />
        </BackButton>
        </SafeAreaView>
      </NativeRouter>
    </RecoilRoot>
  );
};

export default App;
