'use strict';

var icon = "http://ndl.mgccw.com/mu3/app/20150810/04/1439162148803/icon/icon_xl.png";
var icon2 = "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_arrow_back_48px-128.png";

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

class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded : false
        }
    }

    componentDidMount() {
        this.fetchData();
    }
    
    fetchData(){
        const EventDetailsController = require('./../eventDetailsController');
        const eventDetailsController = new EventDetailsController();
        eventDetailsController.getEvent(this.props.event_id).then((event) => {
            this.state.event = event;
            this.setState({
                loaded: true
            })
        });
    }

    handlePress() {
        this.props.navigator.pop();
    }
    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <View style={styles.container}>
                <View style={styles.topMenu}>
                    <Image
                        source={{ uri: this.props.thumbnail }}
                        style={styles.thumbnail}
                    />
                    <Text style={styles.userName}>{this.state.event.userName}</Text>
                    <View style={styles.iconRow}>
                        <Image
                            source={{ uri: this.state.favorite }}
                            style={styles.icon}
                        />
                        <Image
                            source={{ uri: icon }}
                            style={styles.icon}
                        />
                        <TouchableHighlight onPress={this.handlePress.bind(this)}>
                            <Image
                                source={{ uri: icon2 }}
                                style={styles.icon}
                            />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.info}>
                    <Text style={styles.label}>EVENT NAME</Text>
                    <Text style={styles.basicText}>{this.state.event.title}</Text>
                    <Text style={styles.label}>TIME</Text>
                    <Text style={styles.basicText}>{this.state.event.from}</Text>
                    <Text style={styles.label}>DESCRIPTION</Text>
                    <Text style={styles.description}>{this.state.event.description}</Text>
                </View>
                <View style={styles.singed}>
                    <Text style={styles.label}>SINGED IN</Text>
                    <Image
                        source={{ uri: icon }}
                        style={styles.thumbnail}
                    />
                </View>
            </View>
        )
    }

    renderLoadingView() {
        return(
            <View style={styles.container}>
                <Text>
                    Loading events...
                </Text>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    topMenu : {
        backgroundColor: '#ffffff',
        flex : 1,
        flexDirection: 'row',
        borderBottomWidth : 1,
        borderColor : "#d4d4d4"

    },
    info : {
        flex : 4,
        backgroundColor: '#ffffff',
        paddingLeft : 40,
        paddingTop : 40,
        paddingRight: 40
    },
    singed : {
        flex : 2,
        backgroundColor: '#ffffff',
        paddingLeft : 40,
        paddingTop : 40,
        paddingRight: 40
    },
    container : {
        flex : 1
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginLeft : 10,
        marginTop : 10
    },
    icon : {
        width: 20,
        height: 20,
        marginTop: 30,
        marginLeft: 20
    },
    iconRow : {
        flexDirection: 'row',
        flex : 1
    },
    userName: {
        flex:1,
        textAlign: 'center',
        marginTop: 20,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 14,
        color: "#424242"
    },
    label: {
        fontSize: 11,
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 15,
        color: "#464646"
    },
    basicText: {
        fontSize: 11,
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 5,
        color: "#464646"
    },
    description: {
        fontSize: 11,
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 5,
        color: "#464646",
        backgroundColor: "#f1f1f1"
    }
});

module.exports = EventDetails;