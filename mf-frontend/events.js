/**
 * Created by Egoist on 16.02.2016.
 */
'use strict';

import React, {
    AppRegistry,
    Component,
    Image,
    StyleSheet,
    Text,
    View,
    ProgressBarAndroid,
    ListView,
    ScrollView,
    TouchableHighlight
} from 'react-native';

var EventsService = require('./services/eventsService');
var eventsService = new EventsService();

var Events = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded : false
        }
    },
    fetchData: function() {
        eventsService.getEvents((events) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(events),
                loaded : true
            });
        });
    },
    componentDidMount: function() {
        this.fetchData();
    },
    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <View style={styles.scrollView}>
                <View style={styles.topContainer} >
                    <TouchableHighlight style={styles.button_left}>
                        <Text style={styles.button_text_left}>Event List</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button_right}>
                        <Text style={styles.button_text_right}>Calendar</Text>
                    </TouchableHighlight>
                </View>
                <ScrollView style={styles.scrollViewTop}>
                    <Text style={styles.eventTitle}>Nearest Events</Text>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderEventList}
                        style={styles.listView}
                    />
                </ScrollView>
            </View>
        )

    },
    renderEventList(event) {
        return (
            <TouchableHighlight
                onPress={() => {this.props.navigator.push({
                    event_id : event.event_id,
                    view_id : 2
                })}}>
                <View style={styles.container}>
                    <Image
                source={{uri: eventsService.serverApiBaseUrl + event.photoUrl}}
                        style={styles.thumbnail}
                    />
                    <View style={styles.leftContainer}>
                        <Text style={styles.userName}>
                            {event.username}
                        </Text>
                        <Text style={styles.title}>
                            {event.title}
                        </Text>
                        <Text style={styles.description}>
                            {event.description}
                        </Text>
                        <Text style={styles.partyType}>
                            {event.partyType}
                        </Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.date}>
                            {event.date}
                        </Text>
                        <View style={styles.iconRow}>
                            <Image
                        source={{uri: eventsService.serverApiBaseUrl + event.photoUrl}}
                                style={styles.icon}
                            />
                            <Image
                                source={{uri: icon_plus}}
                                style={styles.icon}
                            />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    },
    renderLoadingView() {
        return(
            <View style={styles.container}>
                <Text>
                    Loading events...
                </Text>
            </View>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderWidth: 1,
        borderColor: '#d4d4d4'
    },
    spinner: {
        opacity: 1
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 30
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
        backgroundColor: '#f1f1f1',
        textAlign : 'center',
        fontSize: 30,
        color: "#464646"
    },
    topContainer : {
        marginTop: 10,
        marginLeft : 20,
        marginBottom : 10,
        marginRight : 20,
        height:30,
        flexDirection: 'row',
    },
    button_right : {
        backgroundColor: '#f7f7f7',
        flex: 1,
        borderRadius: 4,
        paddingTop: 5,
    },
    button_left : {
        backgroundColor: '#0aa494',
        flex: 1,
        borderRadius: 4,
        paddingTop: 5,
    },
    button_text_left : {
        textAlign : 'center',
        color : 'white'
    },
    button_text_right : {
        textAlign : 'center',
    },
    scrollViewTop : {
    },
    scrollView : {
        flex : 1,
        backgroundColor: '#0aa494',
    }

});

module.exports = Events;
