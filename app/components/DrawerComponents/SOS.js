import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class SOS extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: (
                <View style={{padding: 10}}>
                    <Ionicons name="md-menu"
                        size={24}
                        onPress={() => navigation.navigate('DrawerOpen')}
                    />
                </View>
            )
        }
    }

    render(){
        return (
          <TouchableOpacity
             style={{
                 borderWidth:1,
                 borderColor:'rgba(0,0,0,0.2)',
                 alignItems:'center',
                 justifyContent:'center',
                 width:100,
                 height:100,
                 color:'#f1f1f1',
                 backgroundColor:'#fff',
                 borderRadius:100,
               }}>
             <Ionicons name={"chevron-right"}  size={50} color="#01a699" />
           </TouchableOpacity>
        )
    }
}

export default SOS;
