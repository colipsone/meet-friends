'use strict';

import React, {
    AppRegistry,
    Component,
    Text,
    Navigator
} from 'react-native';

import Events from './components/events/events/events';
import EventDetails from './components/events/event_details/event_details';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import FacebookTabBar from './components/FacebookTabBar';
import CalendarPicker from 'react-native-calendar-picker';
import AuthorizationMenu from './components/authorization/auth_menu';
import CreateEvent from './components/events/create_event/create_event';
import FriendsList from './components/friends/friendslist'
import SearchFriends from './components/friends/searchFriends'

var MainMenu = React.createClass({

    getInitialState: function() {
        return {
            date: new Date(),
            eventArray: [0, 1, 2, 6, 8]
        };
    },
    onDateChange: function(date) {
        this.setState({ date: date });
    },

    _renderScene(route, navigator) {
        if (route.view_id === 0) {
            return <AuthorizationMenu navigator={navigator}/>
        } else if (route.view_id === 1) {
            return <ScrollableTabView tabBarPosition={"bottom"} renderTabBar={() => <FacebookTabBar someProp={'here'} />}>
                <Events tabLabel="ios-list-outline" navigator={navigator}/>
                <FriendsList tabLabel="ios-person" >t</FriendsList>
                <CreateEvent tabLabel="happy-outline" navigator={navigator}/>
                <CalendarPicker tabLabel="calendar"
                                selectedDate={this.state.date}
                                onDateChange={this.onDateChange}
                                eventDays={this.state.eventArray}
                />
                <Text tabLabel="gear-b" >t</Text>
            </ScrollableTabView>
        } else if (route.view_id === 2) {
            return <EventDetails navigator={navigator} event_id={route.event_id}/>
        } else if (route.view_id === 3) {
            return <FriendsList navigator={navigator} />
        } else if (route.view_id === 4) {
            return <SearchFriends navigator={navigator} />
        }
    },
    render : function() {
        return (
            <Navigator tabLabel="bag"
                       initialRoute={{ view_id: 4 }}
                       renderScene={this._renderScene}
            />
        )
    }
});

module.exports = MainMenu;
