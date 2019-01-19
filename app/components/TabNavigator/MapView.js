import React, {Component} from 'react';
import {
    Text,
    View,
    WebView
} from 'react-native';

class MapView extends Component {
    render(){
        return (
          <WebView
              source={{uri: 'https://github.com/facebook/react-native'}}
              />
        )
    }
}

export default MapView;
