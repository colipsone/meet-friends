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
    TouchableHighlight,
    RefreshControl
} from 'react-native';

var styles = require('./eventStyle');
var EventsService = require('./../../../services/eventsService');
var eventsService = new EventsService();


var Events = React.createClass({

    getInitialState() {
        return { 
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded : false,
            refreshing: false
        }
    },

    _onRefresh() {
        this.setState({refreshing: true});
        this.fetchData();
    },

    fetchData() {
        eventsService.getEvents((events) => {
            events.forEach(function(event) {
                event.from = localDate(event.from);
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(events),
                loaded : true,
                refreshing : false
            });
            function localDate(date) {
                var ms = Date.parse(date);
                return new Date(ms).toLocaleString();
            }
        });
    },

    componentDidMount() {
        this.fetchData();
    },

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <View style={styles.scrollView}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            />
                    }>
                    <Text style={styles.eventTitle}>Nearest Events</Text>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderEventList}
                        style={styles.listView}
                    />
                </ScrollView>
            </View>
        );
    },

    renderEventList(event) {
        return (
            <TouchableHighlight
                onPress={() => {
                        this.props.navigator.push({
                            event_id: event.id,
                            view_id: 2
                        });
                    }}>
                <View style={styles.container}>
                    <Image
                        source={{ uri: eventsService.serverApiBaseUrl + event.photoUrl }}
                        style={styles.thumbnail}
                    />
                    <View style={styles.leftContainer}>
                        <Text style={styles.userName}>
                            {event.userName}
                        </Text>
                        <Text style={styles.title}>
                            {event.title}
                        </Text>
                        <Text style={styles.description}>
                            {event.description}
                        </Text>
                        <Text style={styles.partyType}>
                            {event.type}
                        </Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.date}>
                            {event.from}
                        </Text>
                        <View style={styles.iconRow}>
                            <Image
                                source={{ uri: eventsService.serverApiBaseUrl + event.photoUrl }}
                                style={styles.icon}
                            />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    },
    renderLoadingView() {
        return(
            <View style={styles.container}>
                <Text>
                    Loading events...
                </Text>
            </View>
        );
    }
});

module.exports = Events;
