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
            showProgress : false,
            email : 'xim@rambler.ru',
            password : 'xim'
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
                        placeholder="Login">{this.state.email}</TextInput>
                    <TextInput
                        onChangeText={(text) => this.setState({ password: text })}
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}>{this.state.password}</TextInput>
                    <TouchableHighlight style={styles.button} onPress={this.onLoginPress.bind(this)}>
                        <Text style={ styles.buttonText }>Log In</Text>
                    </TouchableHighlight>

                    <View>{this.state.progressBar}</View>
                    <View>{this.state.messageError}</View>
                </View>
            </View>
        );
    }
    onLoginPress() {
        const Progress = require('react-native-progress');
        const UserService = require('./../../services/userService');
        
        this.setState({ progressBar: <Progress.Circle size={30} indeterminate={true} borderWidth={2} style={{ alignItems: 'center', padding: 10 }}/> });
        
        const userService = new UserService();
        userService.login(this.state.username, this.state.password)
            .then((loggedIn) => {
                if (loggedIn === true) {
                    this.props.navigator.push({
                        view_id: 1
                    });
                }
            })
            .catch((err) => {
                this.setState({ messageError: <Text style={ styles.buttonText }>{err}</Text> });
            })
            .finally(() => {
                    this.setState({ progressBar: null });
                }
            );
    }

}

module.exports = Authorization;
