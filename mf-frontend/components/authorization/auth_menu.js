'use strict';

/*eslint-disable no-unused-vars*/
import React, {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    Component,
    Image
} from 'react-native';

/*eslint-enable no-unused-vars*/

const styles = StyleSheet.create({
    LogInButton : {
        backgroundColor: "#42A5F5",
        height: 40,
        alignSelf: 'stretch',
        justifyContent : 'center',
        marginTop: 30,
        borderRadius : 5,
        alignItems: "center",
        elevation: 2,
        marginLeft:40,
        marginRight:40
    },
    messageError:{
        fontSize: 16,
        alignSelf: 'center',
        color: "red",
        marginTop: 5
    },
    input : {
        height: 50,
        marginTop: 5
    },
    body : {
        flex:8, 
        padding: 30, 
        backgroundColor:'#E3F2FD',
    },
    header : {
        flex:1, 
        alignItems:'center', 
        justifyContent:'center',
        backgroundColor: '#2196F3',
        elevation: 4
    },
    headerText : {
        fontSize : 20,
        color: 'white',
    },
    inputFields : {
        backgroundColor: 'white',
        padding: 10,
        elevation: 1,
        borderRadius : 1,
    },
    buttonText: {
        fontSize: 14,
        alignSelf: 'center',
        color: "white"
    },
    GoogleButtonText: {
        fontSize: 14,
        color: "black",
    },
    SingInGoogleButton: {
        height: 40,
        backgroundColor: "#FFFFFF",
        marginTop: 30,
        borderRadius : 5,
        elevation: 2,
        marginLeft:40,
        marginRight:40
    },
    GoogleIcon: {
        height: 18,
        width: 18,
        marginLeft: 8,
        marginRight: 24
    },
    SingInGoogleButtonView: {
        flex:1, 
        flexDirection: 'row',
        alignItems: "center"
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
                        <TextInput
                            onChangeText={(text) => this.setState({ username: text })}
                            style={styles.input}
                            placeholder="Login">{this.state.email}</TextInput>
                        <TextInput
                            onChangeText={(text) => this.setState({ password: text })}
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}>{this.state.password}</TextInput>
                    </View>
                    <TouchableHighlight style={styles.LogInButton} onPress={this.onLoginPress.bind(this)}>
                        <Text style={styles.buttonText}>LOG IN</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.SingInGoogleButton} onPress={this.onLoginPress.bind(this)}>
                        <View style={styles.SingInGoogleButtonView}>
                            <Image style={styles.GoogleIcon} 
                               source={{uri: 'https://developers.google.com/identity/images/g-logo.png'}}
                            />
                            <Text style={styles.GoogleButtonText}>SING IN WITH GOOGLE</Text>
                        </View>
                    </TouchableHighlight>
                    <View>{this.state.messageError}</View>
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
