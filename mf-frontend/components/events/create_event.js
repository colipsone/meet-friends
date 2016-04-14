import React, {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    DatePickerAndroid
} from 'react-native';

var Icon = require('react-native-vector-icons/FontAwesome');
var EventDetailsController = require('./eventDetailsController');

var CreateEvent = React.createClass({
    getInitialState() {
        return {
            eventCtrl: new EventDetailsController(),
            presetDate: new Date(2020, 4, 5),
            allDate: new Date(2020, 4, 5),
            simpleText: 'pick a date',
            minText: 'pick a date, no earlier than today',
            maxText: 'pick a date, no later than today',
            presetText: 'pick a date, preset to 2020/5/5',
            allText: 'pick a date between 2020/5/1 and 2020/5/10',
            startText: 'Start Date',
            endText: 'End Date'
        };
    },

    async showPicker(stateKey, setEventDate) {
        try {
            const options = {
                date: this.state.minDate,
                minDate: new Date()
            };
            const newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            } else {
                const date = new Date(year, month, day);
                newState[stateKey + 'Text'] = date.toLocaleDateString();
                setEventDate.call(this.state.eventCtrl, date);
            }
            this.setState(newState);
        } catch ( {code, message} ) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    },
    createEvent(){
        this.state.eventCtrl.save();
        this.props.navigator.push({
            view_id: 1
        });
    },
    render() {
        return (
                <View style={styles.container}>
                    <Text style={styles.headerText}>Title</Text>
                    <View>
                        <TextInput onChangeText={(text)=> this.state.eventCtrl.newEvent.title = text}></TextInput>
                    </View>
                    <Text style={styles.headerText}>Description</Text>
                    <View>
                        <TextInput multiline={true} onChangeText={(text)=> this.state.eventCtrl.newEvent.description = text}></TextInput>
                    </View>
                    <View style={styles.dateContainer}>
                        <TouchableHighlight style={{height:40, width: 120}} onPress={this.showPicker.bind(this, 'start', this.state.eventCtrl.setStartDate)}>
                            <View style={styles.datePickerButton}>
                                <Icon style={styles.icon} name="clock-o" size={15} color="#900" />
                                <Text style={styles.text}>{this.state.startText}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={{height:40, width: 120}} onPress={this.showPicker.bind(this, 'end', this.state.eventCtrl.setEndDate)}>
                            <View style={styles.datePickerButton}>
                                <Icon style={styles.icon} name="clock-o" size={15} color="#900" />
                                <Text style={styles.text}>{this.state.endText}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.group}>
                        <Text>Select Group</Text>
                        <Text>_GROUP_</Text>
                    </View>
                    <View style={styles.submit}>
                        <TouchableHighlight style={{height:40, width: 180}} onPress={this.createEvent}>
                            <View style={styles.createButton}>
                                <Text style={styles.saveText}>Create Event</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
        )
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingLeft : 40,
        paddingTop : 40,
        paddingRight: 40
    },
    headerText: {
        textAlign : "center",
        marginTop : 20,
        fontSize : 18,
        fontWeight : 'bold'
    },
    dateContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 10
    },
    datePickerButton: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor:"#6ABCE4",
        padding: 2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius : 5
    },
    icon: {
        marginTop: 2,
        marginLeft: 2
    },
    text: {
        marginLeft: 10,
        fontSize: 16,
        color: "white"
    },
    group: {
        flex: 1,
        alignItems: 'center'
    },
    submit: {
        flex:1,
        alignItems: 'center'
    },
    createButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#6ABCE4",
        borderRadius : 5
    },
    saveText: {
        fontSize: 16,
        color: "white",
    }
});

module.exports = CreateEvent;