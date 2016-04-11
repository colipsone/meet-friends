'use strict';

import React, {
  AppRegistry,
  Component,
  ProgressBarAndroid,
  ListView,
  Text,
  Navigator
} from 'react-native';

import Events from './components/events';
import EventDetails from './components/event_details';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import FacebookTabBar from './components/FacebookTabBar';
import Icon from 'react-native-vector-icons/Ionicons';
import CalendarPicker from 'react-native-calendar-picker';
import AuthorizationMenu from './components/auth_menu';
import CreateEvent from './components/create_event';

var NewProject = React.createClass({

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
         return <Events navigator={navigator}/>
     } else if (route.view_id === 2) {
         return <EventDetails navigator={navigator} event_id={route.event_id}/>
     } else if (route.view_id === 3) {
         return <CreateEvent navigator={navigator}/>
    }
  },
  render : function() {
      return (

           <ScrollableTabView tabBarPosition={"bottom"} renderTabBar={() => <FacebookTabBar someProp={'here'} />}>
              <Navigator tabLabel="bag"
                  initialRoute={{ view_id: 0 }}
                  renderScene={this._renderScene}
              />
               <Text tabLabel="plus-round" >t</Text>
               <Text tabLabel="man" >t</Text>
               <CreateEvent tabLabel="android-apps"/>
               <CalendarPicker tabLabel="calendar"
                  selectedDate={this.state.date}
                  onDateChange={this.onDateChange}
                  eventDays={this.state.eventArray}
              />
           </ScrollableTabView>
      )
    }
});

AppRegistry.registerComponent('NewProject', () => NewProject);
