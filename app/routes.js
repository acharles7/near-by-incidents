import React, {Component} from 'react';
import { 
    DrawerNavigator,
    StackNavigator
} from 'react-navigation';

import Chat from './components/DrawerComponents/Chat';
import SOS from './components/DrawerComponents/SOS';

import HomeScreenTabNavigator from './components/HomeScreenTabNavigator';
import AddIncident from './components/Screens/AddIncident';
import IncidentDetails from './components/Screens/IncidentDetails';
import WebViewComponent from './components/Screens/WebViewComponent';
import SearchLocation from './components/Screens/SearchLocation';
import SubscribeLocation from './components/Screens/SubscribeLocation';

import Drawer from './components/Drawer';

// This Stack Navigator contains the whole flow for following features:
// Displaying the Tab Navigator with the Incident and the Nearby Map View
// Displaying the flow for reporting the incidents
const IncidentsStackNavigator = StackNavigator({
    TabNavigatorPage: {
        screen: HomeScreenTabNavigator
    },
    AddIncidentPage: {
        screen: AddIncident
    },
    IncidentDetailPage: {
        screen: IncidentDetails
    },
    SearchLocationPage: {
        screen: SearchLocation
    },
    WebViewPage: {
        screen: WebViewComponent
    },
    SubscribeLocation: {
        screen: SubscribeLocation
    }
},{
    navigationOptions: {
        headerStyle: {
            backgroundColor: blue,
            elevation: 0
        },
        headerTintColor: 'white'
    }
});

// This Stack Navigator contains the flow for the Chat Screen
const ChatStackNavigator = StackNavigator({
    ScreenChat: {
        screen: Chat
    }
});

// This Stack Navigator contains the flow for the SOS Screen
const SOSStackNavigator = StackNavigator({
    ScreenSOS: {
        screen: SOS
    }
});

const AppDrawerNavigator = DrawerNavigator({
        Incidents: {
            screen: IncidentsStackNavigator
        },
        Chat: {
            screen: ChatStackNavigator
        },
        SOS: {
            screen: SOSStackNavigator
        }
    },
    {
        contentComponent: Drawer,
        drawerPosition: 'left'
    }
);

export default AppDrawerNavigator;