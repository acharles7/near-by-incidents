'use strict';

import React, {Component} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import style from "./style";
import css from './../../styles/global';


export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setup:this.props.display
    }
  }

  render() {
    return (
      <View  style={[{flex:1}]}>
        <TouchableOpacity style={[style.button, this.props.style]} onPress={this.props.onPress}>
          <Text style={[style.buttonText]}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}