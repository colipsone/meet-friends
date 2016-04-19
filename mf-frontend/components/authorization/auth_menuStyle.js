'use strict';
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({

    LogInButton: {
        backgroundColor: "#42A5F5",
        height: 40,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginTop: 30,
        borderRadius: 5,
        alignItems: "center",
        elevation: 2,
        marginLeft: 40,
        marginRight: 40
    },
    messageError: {
        fontSize: 16,
        alignSelf: 'center',
        color: "red",
        marginTop: 5
    },
    input: {
        height: 40
    },
    body: {
        flex: 8,
        padding: 30,
        backgroundColor: '#E3F2FD'
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2196F3',
        elevation: 4
    },
    headerText: {
        fontSize: 20,
        color: 'white'
    },
    inputFields: {
        backgroundColor: 'white',
        padding: 10,
        elevation: 1,
        borderRadius: 1
    },
    loginText: {
        fontSize: 9,
        marginLeft: 4,
        color: '#FA1378'
    },
    buttonText: {
        fontSize: 14,
        alignSelf: 'center',
        color: "white"
    },
    GoogleButtonText: {
        fontSize: 14,
        color: "black"
    },
    SingInGoogleButton: {
        height: 40,
        backgroundColor: "#FFFFFF",
        marginTop: 30,
        borderRadius: 5,
        elevation: 2,
        marginLeft: 40,
        marginRight: 40
    },
    GoogleIcon: {
        height: 18,
        width: 18,
        marginLeft: 8,
        marginRight: 24
    },
    SingInGoogleButtonView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center"
    }
});
