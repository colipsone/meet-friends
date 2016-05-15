'use strict';

import React, {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    Component,
    Image
} from 'react-native';

import styles from './auth_menuStyle'

class Authorization extends Component {
  constructor(props) {
        super(props);

        this.state = {
            showProgress : false,
            email : 'xim@rambler.ru',
            password : 'xim'
        }
    }

    capitalize(s)
    {
        return s[0].toUpperCase() + s.slice(1);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.header}>
                        <Text style={styles.headerText}>Authorization Menu</Text>
                    </View>
                <View style={styles.body}>
                    <View style={styles.inputFields}>
                        <View>
                            <Text style={styles.loginText}>Login</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ username: text })}
                                style={styles.input}
                                placeholder="Login">{this.state.email}</TextInput>
                        </View>
                        <View style={{marginTop: 20}}>
                            <Text style={styles.loginText}>Password</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ password: text })}
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry={true}>{this.state.password}</TextInput>
                        </View>
                    </View>
                    <TouchableHighlight style={styles.LogInButton} onPress={this.onLoginPress.bind(this)}>
                        <Text style={styles.buttonText}>LOG IN</Text>
                    </TouchableHighlight>
                    <View>{this.state.messageError}</View>
                    <TouchableHighlight style={styles.SingInGoogleButton} onPress={this.onLoginPress.bind(this)}>
                        <View style={styles.SingInGoogleButtonView}>
                            <Image style={styles.GoogleIcon}
                               source={{uri: 'https://developers.google.com/identity/images/g-logo.png'}}
                            />
                            <Text style={styles.GoogleButtonText}>SIGN IN WITH GOOGLE</Text>
                        </View>
                    </TouchableHighlight>
                    <View>{this.state.progressBar}</View>

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
                this.setState({ messageError: <Text style={ styles.messageError }>{this.capitalize(err)}</Text> });
            })
            .finally(() => {
                    this.setState({ progressBar: null });
                }
            );
    }

}

module.exports = Authorization;
