'use strict'
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
    scrollView : {
        flex : 1,
        backgroundColor: '#E3F2FD'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',

        marginLeft: 10,
        marginRight: 10,
        marginTop: 4,
        marginBottom: 4,
        elevation: 2,
        borderRadius : 1
    },
    spinner: {
        opacity: 1
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginLeft: 10,
        borderColor: '#b8b7aa',
        borderWidth: 1
    },
    leftContainer: {
        flex: 4
    },
    userName: {
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 14,
        color: "#424242"
    },
    title: {
        fontSize: 13,
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 5,
        color: "#464646"
    },
    date: {
        fontSize: 9,
        textAlignVertical : 'top',
        marginRight : 10
    },
    description: {
        fontSize: 11,
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 5,
        color: "#464646"
    },
    partyType: {
        fontStyle: 'italic',
        fontSize: 11,
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    },
    icon : {
        width: 15,
        height: 15,
        borderRadius: 30,
        borderColor: '#e4e3be',
        borderWidth: 1.6,
        marginTop: 10,
        marginLeft: 10
    },
    iconRow : {
        flex: 1,
        flexDirection: 'row'
    },
    rightContainer : {
        flex: 1
    },
    eventTitle : {
        backgroundColor: '#2196F3',
        textAlign : 'center',
        fontFamily : 'Noto',
        fontSize: 16,
        color: "white",
        elevation: 2,
        marginTop: 2,
        marginBottom: 2
    },
    button_text_left : {
        textAlign : 'center',
        color : 'black'
    },
    button_text_right : {
        textAlign : 'center',
        color : 'white'
    }
});