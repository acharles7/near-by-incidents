import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SingleRecord from './SingleRecordView';

import {
    NavigationActions,
    withNavigation
} from 'react-navigation'

import blue from './../../styles/colors';

class ListView extends Component {

    render(){
        let RecordListt = this.props.screenProps.events.map((rec, i) => {
            return (<View style={styles.recordSeparator} key={i}>
                        <TouchableOpacity onPress={() => this.props.screenProps.navigation.navigate('IncidentDetailPage', {record: rec})}>
                            <SingleRecord record={rec} />
                        </TouchableOpacity>
                    </View>)
        });
        // <View style={styles.recView} />
        return (
            <View style={styles.containerMain}>
                <ScrollView style={styles.containerScrollView}>
                    {RecordListt}
                </ScrollView>
                <TouchableOpacity 
                    style={styles.btnAdd}
                    onPress={() => {
                        this.props.screenProps.navigation.navigate('AddIncidentPage', {screenProps: this.props.screenProps})
                        }}>
                    <MaterialIcons 
                        name="add-circle"
                        size={60}
                        color={blue} 
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerMain: {
        height: '100%',
        width: '100%',
        backgroundColor: '#D3D3D3'
    },
    recView: {
        borderBottomColor: 'darkgrey',
        borderBottomWidth: 1,
        margin: 10,
        justifyContent: 'center'
    },
    containerScrollView: {
        marginBottom: 5,
        marginTop: 5
    },
    btnAdd: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        opacity: 1
    },
    recordSeparator: {
        borderBottomColor: 'black',
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: '#fff'
    }
});

export default withNavigation(ListView);