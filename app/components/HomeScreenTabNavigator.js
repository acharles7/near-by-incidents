import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal
} from 'react-native'

import { 
    TabNavigator, 
    StackNavigator
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ListView from './TabNavigator/ListView';
import MapView from './TabNavigator/MapView';
import FilterModal from './Filter/FilterModal';

import firebaseConn from './../helper/FirebaseConnection';

import blue from './../styles/colors';

// This Component makes the calls to Google Firebase. The incidents list is then passed to the other screens as props
class AppTabNavigator extends Component {
    
    constructor(props){
        super(props);
        
        // The data for the events goes here and yet to be added
        // This state is responsible for handling the showing of the modal as the filter button is on this screen
        this.state = {
            modalVisible: false,
            incidentItems: [],
            Category: []
        }
    }

    // navigationOptions are responsible for displaying the top right corner filter icon,
    // top left corner icon for drawer and the header text 
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Nearby Incidents</Text>,
            headerLeft: (
                <View style={{padding: 20}}>
                    <Ionicons name="md-menu" 
                        size={24}
                        color='white'
                        onPress={() => navigation.navigate('DrawerOpen')}
                    />
                </View>
            ),
            headerRight: (
                <View style={{flexDirection:'row', padding: 20}}> 
                    <Ionicons 
                        name="ios-search"
                        size={24}
                        color='white'
                        onPress={() => navigation.navigate('SearchLocationPage', {screenProps: navigation})}
                        style={{marginRight: 25, marginBottom: 5}}
                    />
                    <FontAwesome5 name="filter" 
                        size={18}
                        onPress={() => {navigation.state.params.handleFilter()}}
                        color='white'
                        style={{marginTop: 3}}
                    />
                </View>
            ),
            headerStyle: styles.headerStyle
        }
    }

    ToggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    componentDidMount(){
        // Fetch the data from Google Firebase before loading the Component
        this.getEventsFromFirebase();

        // this is to give access of the class method to the static navigation options
        // this.props.navigation.setParams({handleFilter: this.ToggleModal})
    }

    applyFilter = (newCategory) => {
        let Category = this.state.Category;
        newCategory.map((category) => {
            Category.push(category);
        });
        this.setState({Category: newCategory, modalVisible: !this.state.modalVisible});
        this.getEventsFromFirebase();
    }

    getEventsFromFirebase = () => {
        const root_ref_db = firebaseConn.database().ref();
        let events = root_ref_db.child('events');

        this.state.Category.map((type) => {
            events = events.orderByChild('type').equalTo(type + '');
        });

        events.on('value', (snap) =>  {
            let arrIncidents = [];
            snap.forEach((child) => {
                arrIncidents.push(child.val());
            });

            this.setState({ incidentItems: arrIncidents});
        });
    }
    
    render(){
        return(
            <View style={styles.container}>
                <HomeScreenTabNavigator screenProps={{ navigation: this.props.navigation, events: this.state.incidentItems }} />
                <FilterModal ToggleModal={this.ToggleModal} modalVisible={this.state.modalVisible} applyFilter={this.applyFilter}/>
            </View>
        );
    }
}
// Children of HomeScreenTabNavigator will not have access to the navigation prop. 
// So we pass a ScreenProps giving the reference to the navigation object 
// and access it using this.ScreenProps props


// This Screen is the entry point for the List View and the Map View Tabs.
const HomeScreenTabNavigator = TabNavigator({
    ScreenListView: {
        screen: ListView,
        navigationOptions: {
            tabBarLabel: 'Incidents',
            tabBarIcon: () => (
                <Ionicons name="ios-list" size={24} />
            )
        }
    },
    ScreenMapView: {
        screen: MapView,
        navigationOptions: {
            tabBarLabel: 'Nearby',
            tabBarIcon: () => (
                <Ionicons name="md-map" size={24} />
            )
        }
    }
},{
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
        labelStyle: {
            fontSize: 13,
            fontWeight: 'bold'
        },
        indicatorStyle: {
            borderBottomColor: 'white',
            borderBottomWidth: 3
        },
        style: {
            backgroundColor: blue
        }
    }
})

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    container: {
        height: '100%',
        width: '100%'
    },
    headerStyle: {
        backgroundColor: blue,
        elevation: 0
    }
});

export default AppTabNavigator;
