'use strict'

import React, {
  Component,
  Text,
  TextInput,
  StyleSheet,
  View,
  Image,
  ListView,
  TouchableHighlight
} from 'react-native';

const Icon = require('react-native-vector-icons/Ionicons');
const UserService = require('./../../services/userService');
const userService = new UserService();
class SearchFriends extends Component {

constructor() {
  super();
  this.state = {
    friendName : undefined,
    icon : {uri: 'http://facebook.github.io/react/img/logo_og.png'},
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
  }
}

search(friendName) {
  if (friendName.length > 3)
  {
    this.setState({ friendName: "HURA"});
    userService.search(friendName)
    .then((events) => {
      if (events.length > 0) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(events),
          listLength: events.length
        })
      } else {
        console.log('tssad');
        this.setState({
          listLength: 0
        })
      }
    })
  }
}

_renderItem(event) {
  console.log(event);
   return (
    <View style={{flex:1, flexDirection:'row'}}>
      <Image style={{width: 38,height: 38, margin: 10}} source={{uri: userService.serverApiBaseUrl + event.photoUrl}} />
      <Text style={{margin: 10}}>{event.login}</Text>
      <TouchableHighlight style={styles.searchButton}
      >
        <Icon name="edit" size={30} color="#400" />
      </TouchableHighlight>
    </View>
   );
 }

render(){

    var event_list = (this.state.listLength > 0) ? <ListView
     dataSource={this.state.dataSource}
     renderRow={this._renderItem.bind(this)}
     /> : null;

    return(
      <View style={styles.searchMenu}>
        <View style={styles.searchTop}>
          <TouchableHighlight style={styles.searchButton} onPress={() => {
                      this.props.navigator.pop();
                  }}
          >
            <Icon name="android-arrow-back" size={30} color="#400" />
          </TouchableHighlight>
          <TextInput
              onChangeText={this.search.bind(this)}
              placeholder="Search"
              style={styles.input}
          >
          </TextInput>
        </View>
        <View style={styles.searchResults}>
          {event_list}
        </View>
      </View>

    );
  }
}

var styles = StyleSheet.create({
  searchButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
  },
  searchMenu: {
  },
  input: {
    width: 300,
    height: 50,
  },
  searchTop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  }
});

module.exports = SearchFriends;
