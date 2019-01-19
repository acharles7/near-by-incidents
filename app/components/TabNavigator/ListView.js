import blue from './../../styles/colors';
import SingleRecord from './SingleRecordView';
import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    withNavigation,
    NavigationActions
} from 'react-navigation'

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
      //backgroundColor: '#D3D3D3',
      backgroundColor:'#fff',
      //shadowOpacity: 0.75,
      shadowRadius: 10,
      elevation: 10,
      shadowOffset: { height: 0, width: 0 },
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
      opacity: 1,
      borderRadius: 15,
      backgroundColor: '#D3D3D3',
  },
  recordSeparator: {
      borderBottomColor: 'black',
      marginBottom: 5,
      marginTop: 5,
      //backgroundColor: '#fff'
  }
});

export default withNavigation(ListView);
