'use strict'

import React, {
    Component,
    Text,
    Navigator,
    View,
    TouchableHighlight
} from 'react-native';

const Icon = require('react-native-vector-icons/Ionicons');

class FriendsList extends Component {

	constructor(props){
		super(props);
		this.state = {

		}
	}

	render() {
		return (
      <View>
        <View>
          <TouchableHighlight onPress={() => {
                      this.props.navigator.push({
                          view_id: 4
                      });
                  }}
          >
            <Icon name="search" size={30} color="#400" />
          </TouchableHighlight>
        </View>
        <View>
          <Text>Friends List</Text>
        </View>
      </View>

    )
	}
};

module.exports = FriendsList;
