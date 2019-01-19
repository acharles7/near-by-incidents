import React, {PureComponent} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class SearchItem extends PureComponent {
    
    _handlePress = async () => {
        const res = await this.props.fetchDetails(this.props.place_id);
        this.props.handlePress(res);
    }
    
    render(){
        return (
            <TouchableOpacity 
                style={styles.root}
                onPress={this._handlePress}
            >
                <Text>{this.props.description}</Text>
            </TouchableOpacity>
        );
    }
}
 
const styles = StyleSheet.create({
    root: {
        width: 300,
        height: 60,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center'
    }
});

export default SearchItem;
