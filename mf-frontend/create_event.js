import React, {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    DatePickerAndroid
} from 'react-native';

var CreateEvent = React.createClass({
    getInitialState() {
        return {
            presetDate: new Date(2020, 4, 5),
            allDate: new Date(2020, 4, 5),
            simpleText: 'pick a date',
            minText: 'pick a date, no earlier than today',
            maxText: 'pick a date, no later than today',
            presetText: 'pick a date, preset to 2020/5/5',
            allText: 'pick a date between 2020/5/1 and 2020/5/10',
        };
    },

    async showPicker(stateKey, options) {
        try {
            var newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            } else {
                var date = new Date(year, month, day);
                newState[stateKey + 'Text'] = date.toLocaleDateString();
                newState[stateKey + 'Date'] = date;
            }
            this.setState(newState);
        } catch ( {code, message} ) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    },
    render() {
        return (
                <View style={styles.container}>
                    <Text>EVENT NAME</Text>
                    <TextInput></TextInput>
                    <TouchableHighlight onPress={this.showPicker.bind(this, 'start', {
                      date: this.state.minDate,
                      minDate: new Date()
                    })}>
                        <Text>Start Date</Text>
                    </TouchableHighlight>
                    <Text>{this.state.startText}</Text>
                    <TouchableHighlight onPress={this.showPicker.bind(this, 'end', {
                      date: this.state.minDate,
                      minDate: new Date()
                    })}>
                        <Text>End Date</Text>
                    </TouchableHighlight>
                    <Text>{this.state.endText}</Text>
                    <Text>GROUP</Text>
                    <Text>_GROUP_</Text>
                </View>
        )
    }
});

var styles = StyleSheet.create({
    container : {
        flex : 1
    }
});

module.exports = CreateEvent;