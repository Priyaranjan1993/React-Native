import React from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class MultipleChoiceQuestionWidget extends React.Component {
    static navigationOptions = {title: "Multiple Choices"};

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            points: 0,
            options: '',
            optionsFiltered: [],
            optionsFiltered2: [],
            value: 0,
            counter: 0, arr: [],
            optionVal: 0
        };
    }

    /*
        componentDidMount(){

        }
    */

    updateForm(newState) {
        this.setState(newState);
    }

    updateOptionsForm(newState, text) {
        let optionsArray = [];
        let arr = [];
        this.setState(newState);
        optionsArray = text.split('\n');
        this.setState({optionsFiltered: optionsArray});
        this.setState({counter: this.state.counter++});
        console.log(optionsArray);
        console.log(this.state);

        var len = optionsArray.length;
        for (var i = 0; i < len; i++) {
            arr.push({
                label: optionsArray[i],
                value: i + 1
            });
        }

        this.setState({arr: arr});

    }

    change() {
        this.setState({optionsFiltered2 : this.state.arr});
    }

    render() {
        var radio_props = [
            {label: 'param1', value: 0},
            {label: 'param2', value: 1}
        ];
        return (
            <ScrollView>
                <View>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        onPress={(value) => {
                            this.setState({value: value})
                        }}
                    />

                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({points: text})
                    } placeholder="Points to be Awarded."/>

                    <FormLabel>Title.</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({title: text})
                    } placeholder="Title of the widget."/>

                    <FormLabel>Description</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({description: text})}
                               placeholder="Description of the widget"/>

                    <FormLabel>Options</FormLabel>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => this.updateOptionsForm({options: text}, text)}
                        value={this.state.text}
                        placeholder="Each line will be treated as an option"/>

                    <RadioForm
                        radio_props={this.state.optionsFiltered2}
                        initial={0}
                        formHorizontal={false}
                        labelHorizontal={true}
                        buttonColor={'#2196f3'}
                        animation={true}
                        style={{ alignItems: 'flex-start' }}
                        onPress={(value) => {
                            this.setState({optionVal: value})
                        }}
                    />

                    <Button backgroundColor="green"
                            color="white"
                            title="Change"
                            onPress={() => this.change()}/>
                    <Button backgroundColor="green"
                            color="white"
                            title="Save"/>
                    <Button backgroundColor="red"
                            color="white"
                            title="Cancel"/>

                    <Text h3>Preview</Text>
                    <Text>{this.state.points}</Text>
                    <Text h2>{this.state.title}</Text>
                    <Text>{this.state.description}</Text>

                </View>
            </ScrollView>
        )
    }
}

export default MultipleChoiceQuestionWidget