var MOKED_MOVIES_DATA = [
    {title: 'Title', year: '2015', posters: {thumbnail:'http://i.imgur.com/UePbdph.jpg'}}
];
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
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
    ListView
} from 'react-native';

var NewProject = React.createClass({
        getInitialState: function() {
            return {
                dataSource: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2
                }),
                loaded : false
            }
        },
        fetchData: function() {
            fetch(REQUEST_URL)
                .then((response) => response.json())
                .then((responseData) => {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                        loaded : true
                    }).done();
                })
        },
        componentDidMount: function() {
            this.fetchData();
        },
        render() {
            if (!this.state.loaded) {
                return this.renderLoadingView();
            }

            return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovie}
                    style={styles.listView}
                />
            )
                ;
        },
        renderMovie(movie) {
            return (
                <View style={styles.container}>
                    <Image
                        source={{uri: movie.posters.thumbnail}}
                        style={styles.thumbnail}
                    />
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>
                            {movie.title}
                        </Text>
                        <Text style={styles.year}>
                            {movie.year}
                        </Text>
                        <Text>
                            {movie.mpaa_rating}
                        </Text>
                    </View>
                    <ProgressBarAndroid style={styles.spinner}
                                        size="Small"

                    />
                </View>
            )
        },
        renderLoadingView() {
            return(
                <View style={styles.container}>
                    <Text>
                        Loading movies...
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
        backgroundColor: '#F5FCFF'
    },
    spinner: {
        opacity: 1
    },
    thumbnail: {
        width: 53,
        height: 81
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center'
    },
    year: {
        textAlign: 'center'
    }
});

AppRegistry.registerComponent('NewProject', () => NewProject);
