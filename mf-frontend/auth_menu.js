'use strict';

/*eslint-disable no-unused-vars*/
import React, {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    Component
} from 'react-native';
var Progress = require('react-native-progress');
var buffer = require('buffer');

/*eslint-enable no-unused-vars*/

const styles = StyleSheet.create({
    button : {
        backgroundColor: '#e9eaed',
        height: 50,
        alignSelf: 'stretch',
        justifyContent : 'center',
        marginTop: 10
    },
    buttonText: {
        fontSize: 20,
        alignSelf: 'center'
    },
    heading : {
        fontSize : 30
    },
    input : {
        height: 50,
        marginTop: 1
    }
});

class Authorization extends Component {
  constructor(props) {
        super(props);

        this.state = {
            showProgress : false
        }
    }

    render() {
        return (
            <View style={{ flex:1, padding: 30 }}>
                <View style={{ flex:2, alignItems:'center', justifyContent:'center' }}>
                    <Text style={styles.heading}>Authorization Menu</Text>
                </View>
                <View style={{ flex:5 }}>
                    <TextInput
                        onChangeText={(text) => this.setState({ username: text })}
                        style={styles.input}
                        placeholder="Login">{}</TextInput>
                    <TextInput
                        onChangeText={(text) => this.setState({ password: text })}
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}>{}</TextInput>
                    <TouchableHighlight style={styles.button} onPress={this.onLoginPress.bind(this)}>
                        <Text style={ styles.buttonText }>Log In</Text>
                    </TouchableHighlight>

                    <View>{this.state.progressBar}</View>
                </View>
            </View>
        );
    }

    onLoginPress() {
        this.setState({ progressBar: <Progress.Circle size={30} indeterminate={true} borderWidth={2} style={{ alignItems : 'center', padding: 10 }}/> });
        var buf = new buffer.Buffer(this.state.username + ':' + this.state.password);
        var encodedAuth = buf.toString('base64');
        console.log(encodedAuth);
        fetch('https://api.github.com/user', {
            headers: {
                'Authorization':'Basic ' + encodedAuth
            }
        }).
        then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response
            }
            throw {
                badCredentials: response.status === 401,
                unknownError: response.status !== 401
            }
        }).
        then((response) => response.json()).
        then((results) => {
            console.log(results);
          }
        ).
          catch((err) => this.setState(err)
        ).
          finally(() => {
                this.setState({progressBar: null});
                this.props.navigator.push({
                    view_id: 1
                })
            }
        )
    }

}

module.exports = Authorization;
