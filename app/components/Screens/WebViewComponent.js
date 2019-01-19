import React, {Component} from 'react';
import {View, WebView} from 'react-native';

class WebViewComponent extends Component {
    render(){
        this.props.navigation.state.params.URL = "https://www.fool.com.au/2018/11/21/why-bitcoin-ripple-ethereum-and-bitcoin-cash-prices-are-getting-smashed-again-today/";
        return (
                <WebView 
                    source={{uri: this.props.navigation.state.params.URL}}
                />
        );
    }
}

export default WebViewComponent;