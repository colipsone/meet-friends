'use strict';

import React, {
    AppRegistry
} from 'react-native';

import MainMenu from './main_menu'

var MeetFriends = React.createClass({
  render : function() {
      return (
        <MainMenu/>
      )
    }
});

AppRegistry.registerComponent('MeetFriends', () => MeetFriends);
