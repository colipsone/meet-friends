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
    TouchableHighlight,
    RefreshControl
} from 'react-native';

var EventsService = require('./../../services/eventsService');
var eventsService = new EventsService();

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded : false,
            refreshing: false
        };
    }

    _onRefresh() {
        console.log('test');
        this.setState({refreshing: true});
        this.fetchData();
        console.log(this.state.refreshing)
    }

    fetchData() {
        eventsService.getEvents((events) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(events),
                loaded : true,
                refreshing : false
            });
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    localDate() {
        //console.log(this.props.event.from);
        //var ms = Date.parse(this.props.event.from);
        //return new Date(ms).toLocaleString();
        return 1;
    }

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
                <ScrollView
                    style={styles.scrollViewTop}
                    refreshControl={
                            <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this._onRefresh.bind(this)}
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
        )

    }
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
                        source={{uri: "http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/128/selftimer-icon.png"}}
                                style={styles.icon}
                            />
                            <Image
                                source={{uri: "http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/128/running-icon.png"}}
                                style={styles.icon}
                            />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    renderLoadingView() {
        return(
            <View style={styles.container}>
                <Text>
                    Loading events...
                </Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#cdcb9e',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 4,
        elevation: 10
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
        borderWidth: 1  ,
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
        backgroundColor: '#f1f1f1',
        textAlign : 'center',
        fontFamily : 'Noto',
        fontSize: 30,
        fontStyle: 'italic',
        color: "#464646",
        fontWeight: 'bold',
        elevation: 3
    },
    topContainer : {
        marginTop: 10,
        marginLeft : 20,
        marginBottom : 10,
        marginRight : 20,
        height: 30,
        flexDirection: 'row',
    },
    button_right : {
        backgroundColor: '#f7f7f7',
        flex: 1,
        borderRadius: 4,
        paddingTop: 5,
        elevation: 3
    },
    button_left : {
        backgroundColor: '#0aa494',
        flex: 1,
        borderRadius: 4,
        paddingTop: 5,
        elevation: 3,
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
        backgroundColor: '#6ABCE4',
    }

});

module.exports = Events;
