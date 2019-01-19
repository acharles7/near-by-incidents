import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import blue from './../../styles/colors';

class IncidentDetails extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Incident Details</Text>,
        }
    }

    render(){
        
        let record = this.props.navigation.state.params.record;
        // A temporary hack to show the default image as we are unsure if the image is going to get displayed on the screen
        record.urlToImage = "https://www.fool.com.au/wp-content/uploads/2018/06/boxing-1430483_1280.jpg";
        let imageProps = (record.urlToImage === null) ? {uri: require('./../../assets/images/default-image.jpg')} : {uri: record.urlToImage};
    
        return (
            <View style={styles.container}>
                <Text style={styles.txttitle}>{record.type}</Text>
                <Image 
                    source={imageProps}
                    style={styles.titleImage}
                />
                <View style={styles.contentContainer}>
                    <Text style={styles.txtcontents}>{record.description}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.tchVisit}
                        onPress={() => this.props.navigation.navigate('WebViewPage', {
                            URL: "URL IS YET TO BE PASSED HERE"
                        })}
                    >
                            <Text style={styles.btnVisit}>Visit the page</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        display: 'flex',
        marginTop: 20
    },
    txttitle: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        color: blue,
        margin: 5
    },
    txtcontents: {
        textAlign: 'left',
        fontSize: 15,
        margin: 20
    },
    btnVisit: {
        color: 'white',
        textAlign: 'center',
        paddingTop: 8,
        fontSize: 14
    },
    buttonContainer: {
        alignItems: 'center',
        margin: 20
    },
    tchVisit: {
        backgroundColor: blue,
        width: '40%',
        height: 40
    },
    titleImage: {
        height: 250,
        width: 250,
        alignSelf: 'center',
        margin: 20
    },
    headerTitle: {
        fontSize: 15,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginRight: 15
    }
});

export default IncidentDetails;