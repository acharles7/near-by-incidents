import blue from './../../styles/colors';
import React, {Component} from 'react';
import {Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Card} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class SingleRecordView extends Component {

    render(){
        if(this.props.record.description.length > 100){
            this.props.record.description = this.props.record.description.substring(0, 100) + "...";
        }

        return (
            <Card sytyle={{backgroundColor:'#C81D25',elevation:20}}>
                <View style={styles.mainContainer}>
                    <View style={styles.imageContainer}>
                        <FontAwesome
                            size={48}
                            name="rss"
                            color={blue}
                        />
                    </View>
                    <View style={styles.mainContentContainer}>
                        <View style={styles.containerHeader}>
                            <Text style={styles.sourceName}>{this.props.record.type}</Text>
                            <Text style={styles.distance}>{this.props.record.distance}</Text>
                        </View>
                        <Text style={styles.Content}>{this.props.record.description}</Text>
                        <Text style={styles.timeFont}>{this.props.record.datetime}</Text>
                    </View>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,

    },
    mainContentContainer: {
        flex: 5,
        flexDirection: 'column',
        margin: 5
    },
    imageContainer: {
        flex: 1,
        textAlign: 'right',
        //marginLeft: 10,
        marginRight: 10,
        marginTop: 20
    },
    sourceName: {
        fontSize: 16,
        color: blue,
        fontWeight: 'bold',
        flex: 1
    },
    Content: {
        fontSize: 14,
        color: 'slategrey',
        marginTop: 5,
        marginRight: 5
    },
    timeFont: {
        fontSize: 12,
        marginTop: 10,
        color: 'black'
    },
    distance: {
        fontSize: 12,
        color: 'black',
        textAlign: 'right',
        flex: 1,
        marginRight: 5
    },
    containerHeader: {
        flexDirection: 'row'
    },
    cardWrapper: {
        borderRadius: 15,
        margin: 10
    }
});

export default SingleRecordView;
