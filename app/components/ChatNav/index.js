'use strict';

import React, {Component} from "react";
import { View, TouchableOpacity, Image,ActivityIndicator,Text} from "react-native";
import navBarStyle from "./style";
import css from '@styles/global'
import SmartIcon from '@smarticon';


export default class ChatNav extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.backActions=this.backActions.bind(this);
  }


  backActions(){
    if(!this.props.isRoot||(css.dynamic.general&&css.dynamic.general.layout&&css.dynamic.general.layout=="grid")){
      this.props.navigation.goBack(null)
    }else{
      this.props.navigation.openDrawer()
    }
  }

  render() {
    
    var tintToUse=(css.dynamic.navBar.detailsTintColor&&this.props.detailsView?css.dynamic.navBar.detailsTintColor:css.dynamic.navBar.tintColor)
    return (
      <View>
        <View>
          <View style={[navBarStyle.container,{backgroundColor:
              (css.dynamic.navBar.detailsBackgroundColor&&this.props.detailsView?css.dynamic.navBar.detailsBackgroundColor:css.dynamic.navBar.backgroundColor)
            }]}>
            <TouchableOpacity  onPress={this.backActions}>
              <View style={navBarStyle.leftArea}>
                <View>
                  <SmartIcon defaultIcons={"MaterialIcons"} name={"keyboard-arrow-left"} size={30} color={"black"} />
                </View>
              </View>
            </TouchableOpacity>
            <View style={navBarStyle.centerArea}>
              <Text style={{fontSize:16,fontWeight:"500"}}>{this.props.userName}</Text>
              <Text style={{fontSize:12}}>Online</Text>
            </View>
            <TouchableOpacity  onPress={this.props.rightAction}>
              <View style={navBarStyle.rightArea}>
                <Image style={navBarStyle.navLogo} source={this.props.userAvatar != null ?{uri: this.props.userAvatar }:require('@images/blank-image.jpg')} />
              </View>
            </TouchableOpacity>

          </View>
        </View>
        <View style={[navBarStyle.border,{height:0.5,backgroundColor:"#bfbfbf"}]} ></View>
      </View>

    );
  }
}
