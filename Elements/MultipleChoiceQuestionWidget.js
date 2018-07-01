import React from 'react'
import {View, ScrollView, StyleSheet, TextInput} from 'react-native'
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
            optionVal: 0,
            radioButton: [],
            isOnDefaultToggleSwitch: false
        };
    }

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
        this.setState({optionsFiltered2: this.state.arr});
    }

    /*    addRadioButton = (key) => {
            let radioButton = this.state.optionsFiltered2;
            radioButton.push(<TextInput key={key} />);
            this.setState({ radioButton })
        };*/

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

                    {/*<Button title='+' onPress={() => this.addRadioButton(this.state.radioButton.length)} />*/}

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
                    <FormInput multiline
                               onChangeText={(text) => this.updateOptionsForm({options: text}, text)}
                               numberOfLines={4}
                               value={this.state.text}
                               placeholder="Each line will be treated as an option. Delete a line to delete the option"
                               containerStyle={{paddingBottom: 30}}/>
                    {/*<TextInput
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => this.updateOptionsForm({options: text}, text)}
                        value={this.state.text}
                        placeholder="Each line will be treated as an option"/>*/}

                    <View style={styles.radioContainer}>
                        <RadioForm
                            radio_props={this.state.optionsFiltered2}
                            initial={0}
                            formHorizontal={false}
                            labelHorizontal={true}
                            buttonColor={'#2196f3'}
                            animation={true}
                            style={{alignItems: 'flex-start'}}
                            onPress={(value) => {
                                this.setState({optionVal: value})
                            }}
                        />
                    </View>

                    <Button backgroundColor="green"
                            color="white"
                            title="Change"
                            onPress={() => this.change()}/>

                    <View style={styles.btnContainer}>
                        <View style={styles.buttonInnerContainer}>
                            <Button raised
                                    backgroundColor="green"
                                    color="white"
                                    title="Save"
                                    onPress={this.createCourse}
                            />
                        </View>
                        <View style={styles.buttonInnerContainer}>
                            <Button raised
                                    backgroundColor="red"
                                    color="white"
                                    title="Cancel"/>
                        </View>
                    </View>

                    <ToggleSwitch
                        isOn={this.state.isOnDefaultToggleSwitch}
                        style={styles.lineStyle}
                        label='Preview'
                        labelStyle={{color: 'black', fontWeight: '900'}}
                        size='medium'
                        onToggle={isOnDefaultToggleSwitch => {
                            this.setState({isOnDefaultToggleSwitch});
                        }}
                    />

                    <AnimatedHideView visible={this.state.isOnDefaultToggleSwitch}
                                      style={{backgroundColor: 'white', margin: 20}}>
                        <Text style={styles.points} h5>Points : {this.state.assignment.points} pts</Text>
                        <Text style={styles.title} h4>{this.state.assignment.title}</Text>
                        <Text style={styles.description}>Question : {this.state.assignment.description}</Text>

                        <FormLabel>Essay Answer</FormLabel>
                        <FormInput multiline placeholder="Write your essay answer here...."/>

                        <FormLabel>Essay Answer</FormLabel>
                        <Button backgroundColor="grey"
                                color="black"
                                title="Choose File"
                                style={styles.btnStyle}/>

                        <FormLabel>Submit a link </FormLabel>
                        <FormInput placeholder="Paste your link here"/>
                    </AnimatedHideView>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    lineStyle: {
        position: 'absolute',
        right: 0
    },
    points: {
        fontWeight: 'bold',
        paddingRight: 15,
        paddingTop: 20,
        paddingLeft: 20
    },
    title: {
        fontWeight: 'bold',
        paddingLeft: 20
    },
    description: {
        paddingTop: 30,
        paddingBottom: 40,
        paddingLeft: 20
    },
    btnStyle: {
        width: 9
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30
    },
    buttonInnerContainer: {
        flex: 1,
    },
    radioContainer: {
        marginLeft: 20,
        marginBottom: 40
    }
});

export default MultipleChoiceQuestionWidget