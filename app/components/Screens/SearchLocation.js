import React, {Component} from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native'

import SearchItem from './SearchItem';

import blue from './../../styles/colors';

import {Maps_Key} from './../../assets/apiKey';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';

class SearchLocation extends Component {
    
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Search Location</Text>,
        }
    }

    handlePress = (placeDetails) => {
        this.props.navigation.state.params.screenProps.navigate('SubscribeLocation', {screenProps: placeDetails, navigation: this.props.navigation.state.params.screenProps});
    }
        
    render(){
        return (
            <View style={styles.container}>
                <GoogleAutoComplete apiKey={Maps_Key} 
                    debounce={1000}
                    minLength={4}
                 >
                    {({ handleTextChange, locationResults, fetchDetails }) => (
                        <React.Fragment>
                            <View style={styles.inputWrapper}>
                                <TextInput 
                                    placeholder="Search Location"
                                    style={styles.textInput}
                                    onChangeText={handleTextChange}
                                />
                            </View>
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
                        </React.Fragment>
                    )}
                </GoogleAutoComplete>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginRight: 15
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        height: 40,
        width: 300,
        borderWidth: 1,
        paddingHorizontal: 16,
        borderRadius: 15,
        borderColor: blue
    },
    inputWrapper: {
        marginTop: 40
    },
    resultsContainer: {
        marginTop: 5,
        flex: 1
    }
});

export default SearchLocation;