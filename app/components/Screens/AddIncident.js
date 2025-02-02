import {Maps_Key} from './../../assets/apiKey';
import firebase from './../../helper/FirebaseConnection';
import blue from './../../styles/colors';
import SearchItem from './SearchItem';
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import {
    Button,
    FormInput,
    FormLabel
} from 'react-native-elements';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import RadioButton from 'react-native-radio-button'
import AwesomeButton from 'react-native-really-awesome-button';

class AddIncident extends Component {

    state = {
        description: "",
        radio_props: [
            'Crime',
            'Medical',
            'Traffic',
            'Utility'
        ],
        index : 0,
        location: '',
        locationID: '',
        locationDetails: '',
        textLocationVisible: false
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Add Incident</Text>,
        }
    }

    textChanged = (newDescription) => {
        this.setState({
            description: newDescription
        })
    }

    formatDatetime = () => {
        try {
            let date = new Date();
            let weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let month_names =["Jan","Feb","Mar",
                        "Apr","May","Jun",
                        "Jul","Aug","Sep",
                        "Oct","Nov","Dec"];

            let weekDay = weeks[date.getDay()];
            var day = date.getDate();
            var month_index = date.getMonth();
            var year = date.getFullYear();

            return weekDay + ", " + day + " " + month_names[month_index] + " " + year;
        } catch (error) {
            console.log("Errow when converting to date!!");
            return "null";
        }
    }

    handleSubmit = () => {
        const root_ref_db = firebase.database().ref();
        let events = root_ref_db.child('events');

        let incident = {
            "type": this.state.radio_props[this.state.index],
            "description": this.state.description,
            "datetime": this.formatDatetime(),
            "distance": "1 mile",
            //"location": this.state.locationDetails.geometry.location,
            //"address": this.state.locationDetails.formatted_address,
            "locationID": this.state.locationID,
            "userID": 1
        }

        events.push(incident)
        .then(() => {
            this.props.navigation.state.params.screenProps.navigation.navigate("TabNavigatorPage");
        })
        .catch((err) => {
            console.log(err);
            this.props.navigation.state.params.screenProps.navigation.navigate("TabNavigatorPage");
        });
    }

    handleRadioClick = (index) => {
        this.setState({index: index});
    }

    handlePress = (placeDetails) => {
        console.log(placeDetails);
        this.setState({
            location: placeDetails.formatted_address,
            locationID: placeDetails.place_id,
            textLocationVisible: true,
            locationDetails: placeDetails
        })
    }

    enableLocationSearch = () => {
        this.setState({
            location: '',
            textLocationVisible: false
        })
    }

    render(){
        let radioList = this.state.radio_props.map((label, indd) => {
            let selected = this.state.index === indd ? true : false;
            return (
                <View
                    key={indd}
                    style={styles.vwRadio}>

                    <RadioButton
                        animation={'bounceIn'}
                        isSelected={selected}
                        onPress={() => this.handleRadioClick(indd)}/>

                    <Text style={styles.radioTxt}>{label}</Text>
                </View>
            );
        })

        return (
            <ScrollView style={styles.container}>
                <View style={styles.locationContainer}>
                    <Text style={styles.lblLocation}>Location</Text>
                    <GoogleAutoComplete apiKey={Maps_Key}
                        debounce={300}
                        minLength={4}>

                        {({ handleTextChange, locationResults, fetchDetails }) => (
                            <React.Fragment>
                                <View style={styles.inputWrapper}>
                                    {!this.state.textLocationVisible &&
                                    <TextInput
                                        placeholder="Search Location"
                                        style={styles.textInput}
                                        onChangeText={handleTextChange}
                                    />}
                                    {this.state.textLocationVisible &&
                                        <Text
                                            style={styles.txtLocation}
                                            onPress={()=>this.enableLocationSearch()}>
                                            {this.state.location}
                                        </Text>
                                    }
                                </View>
                                {!this.state.textLocationVisible &&
                                    <ScrollView>
                                        {locationResults.map(e1 => (
                                            <SearchItem
                                                key={e1.id}
                                                {...e1}
                                                fetchDetails={fetchDetails}
                                                handlePress={this.handlePress}
                                            />
                                        ))}
                                    </ScrollView>
                                }
                            </React.Fragment>
                        )}
                    </GoogleAutoComplete>
                </View>
                <View style={styles.viewSeparator} />
                <View style={styles.radioContainer}>
                    <Text style={styles.lblType}>Type</Text>
                    {radioList}
                </View>
                <View style={styles.viewSeparator} />
                <View style={styles.descContainer}>
                    <FormLabel labelStyle={styles.descriptionTitle}>Description</FormLabel>
                    <TextInput
                        onChangeText={(newText) => this.textChanged(newText)}
                        value={this.state.description}
                        multiline={true}
                        placeholder="Enter Description"
                        numberOfLines={4}
                        style={styles.inputArea}
                    />
                </View>
                <View style={styles.viewSeparator} />

                  <AwesomeButton
                        progress
                        onPress={this.handleSubmit}
                        style={styles.btnSubmit}>
                         <Text style={{fontSize:20, backgroundPlaceholder: '#2E5EAA'}}>Submit</Text>

                  </AwesomeButton>
                  

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        marginTop: 10
    },
    descriptionTitle: {
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        fontSize: 18
    },
    descContainer: {
        width: '90%',
        alignSelf: 'center'
    },
    btnSubmit: {
        backgroundColor: '#2E5EAA',
        // width: 50,
        //height: 40,
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 10,
        fontSize: 30,
        borderRadius: 15,
        tintColor: '#2E5EAA'

    },
    txtSubmit: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15
    },
    vwRadio: {
        flexDirection: 'row',
        marginTop: 10
    },
    radioContainer:{
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',
        padding: 10
    },
    radioTxt: {
        marginLeft: 10,
        fontSize: 14,
        paddingTop: 5
    },
    viewSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginTop: 10,
        marginBottom: 10,
        width: '90%',
        alignSelf: 'center'
    },
    inputArea: {
        width: '100%',
        alignSelf: 'flex-start',
        borderWidth: 2,
        borderRadius: 15,
        borderColor: blue

    },
    headerTitle: {
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginRight: 15
    },
    lblType: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10
    },
    locationContainer: {
        width: '100%',
        padding: 20,
        justifyContent: 'center'
    },
    inputWrapper: {
        marginTop: 10
    },
    textInput: {
        height: 50,
        width: '100%',
        borderWidth: 2,
        paddingHorizontal: 16,
        borderRadius: 15,
        borderColor: blue
    },
    lblLocation: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 15
    },
    txtLocation: {
        width: '90%',
        textAlign: 'center'
    }
});

export default AddIncident;
