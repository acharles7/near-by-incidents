import CustomActions from './CustomActions';
import CustomView from './CustomView';
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Actions, Bubble, GiftedChat, InputToolbar, SystemMessage } from 'react-native-gifted-chat'
import Ionicons from 'react-native-vector-icons/Ionicons';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }
  // state = {
  //   messages: [],
  // }
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: (
                <View style={{padding: 10}}>
                    <Ionicons name="md-menu"
                        size={24}
                        onPress={() => navigation.navigate('DrawerOpen')}
                    />
                </View>
            )
        }
    }

  componentWillMount() {
      this._isMounted = true;
      this.setState(() => {
        return {
          messages: require('./../data/messages.js'),
        };
      });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    onLoadEarlier() {
      this.setState((previousState) => {
        return {
          isLoadingEarlier: true,
        };
      });

      setTimeout(() => {
        if (this._isMounted === true) {
          this.setState((previousState) => {
            return {
              messages: GiftedChat.prepend(previousState.messages, require('./../data/old_messages.js')),
              loadEarlier: false,
              isLoadingEarlier: false,
            };
          });
        }
      }, 1000); // simulating network
    }

    onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

    // for demo purpose
    //this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('Alright');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      };
    });
  }

  renderInputToolbar (props) {
     //Add the extra styles via containerStyle
    return <InputToolbar {...props}
      containerStyle={{
        border: '#333',
        borderRadius:10,
        shadowRadius:10

      }} />
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Photos': (props) => {
        alert('option 1');
      },
      'Videos': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

    render(){
        return (
            // <View style={{marginTop: 100}}>
            //     <Text> Chat Scl;kmkkkreen </Text>
            // </View>
            <GiftedChat
              messages={this.state.messages}
              onSend={this.onSend}
              loadEarlier={this.state.loadEarlier}
              onLoadEarlier={this.onLoadEarlier}
              isLoadingEarlier={this.state.isLoadingEarlier}

               user={{
                 _id: 1, // sent messages should have same user._id
               }}
              renderInputToolbar={this.renderInputToolbar}
              renderActions={this.renderCustomActions}
              renderBubble={this.renderBubble}
              renderSystemMessage={this.renderSystemMessage}
              renderCustomView={this.renderCustomView}
              renderFooter={this.renderFooter}
              />
        )
    }
}

export default Chat;

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 140,
    color: '#aaa',
  },
});
