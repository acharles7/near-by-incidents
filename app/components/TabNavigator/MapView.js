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
              source={{uri: 'https://www.foxnews.com/us'}}
              />
        )
    }
}

export default MapView;
