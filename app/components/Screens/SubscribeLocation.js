import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import blue from '../../styles/colors';

import firebase from './../../helper/FirebaseConnection';

class SubscribeLocation extends Component {
    
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Subscribe To Address</Text>,
        }
    }

    state = {
        userRegistered: false
    }

    handleSubscribe = () => {
        // Add the user to the subscribers list
        const root_ref_db = firebase.database().ref();
        root_ref_db.child('incident-location/' + this.props.navigation.state.params.screenProps.place_id + "/users").child("1").set("1")
            .then(() => {
                this.props.navigation.state.params.navigation.navigate("TabNavigatorPage");
            })
    }

    userMappingCheck = (place_id) => {
        const root_ref_db = firebase.database().ref();
        root_ref_db.child('incident-location/' + place_id + "/users")
            .child("1")
            .once('value', snap => {
                if(snap.exists()){
                    this.setState({userRegistered: true})
                }
                return Promise.resolve();
            })
    }
    
    render(){
        let data = this.props.navigation.state.params.screenProps;
        this.userMappingCheck(data.place_id);
        return (
            <View style={styles.holder}>
                {this.state.userRegistered && 
                    <Text style={styles.error}>Already Subscribed to Location! </Text>
                }
                <Text style={styles.title}>Location</Text>
                <Text style={styles.description}>{data.formatted_address}</Text>
                <TouchableOpacity
                    style={styles.btnSubscribe}
                    onPress={this.handleSubscribe}
                    disabled={this.state.userRegistered}
                >
                    <Text style={styles.txtSubscribe}>Subscribe</Text>
                </TouchableOpacity>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    holder: {
        justifyContent: 'center',
        marginTop: 60,
        flexDirection: 'column'
    },
    headerTitle: {
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginRight: 15
    },
    title: {
        fontSize: 20,
        color: blue,
        textAlign: 'center'
    },
    description: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center'
    },
    btnSubscribe: {
        backgroundColor: blue,
        width: 80,
        height: 40,
        alignSelf: 'center',
        marginTop: 20,
        paddingTop: 10,
        borderRadius: 5
    },
    txtSubscribe: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default SubscribeLocation;