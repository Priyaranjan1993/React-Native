import React from 'react'
import {View, ScrollView, TextInput, StyleSheet} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput} from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import ToggleSwitch from 'toggle-switch-react-native'
import AnimatedHideView from 'react-native-animated-hide-view';

import WidgetService from '../Services/WidgetService';

class FillInTheBlanksQuestionWidget extends React.Component {
    static navigationOptions = {title: "Fill in the blanks"};

    constructor(props) {
        super(props);
        const lessonId = this.props.navigation.getParam("lessonId");
        this.widgetService = WidgetService.instance;
        this.state = {
            lessonId: lessonId,
            fillInTheBlanks: {title: '', points: '', description: '', question:''},
            isOnDefaultToggleSwitch: false
        };
        this.createFillInTheBlanks = this.createFillInTheBlanks.bind(this);
    }


    updateForm(newState) {
        this.setState(newState);
    }

    createFillInTheBlanks() {
        this.widgetService
            .createExam(this.state.lessonId)
            .then(exam => {
                this.widgetService.createFillInTheBlanksWidget(this.state.fillInTheBlanks,exam.id)
            })
            .then(alert("Fill in the blanks widget created"));
    }


    render() {
        return (
            <ScrollView>
                <View>
                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({fillInTheBlanks :{...this.state.fillInTheBlanks,points: text}})
                    } placeholder="Points to be Awarded."/>

                    <FormLabel>Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({fillInTheBlanks :{...this.state.fillInTheBlanks,title: text}})
                    } placeholder="Title of the widget."/>

                    <FormLabel>Description</FormLabel>
                    <FormInput multiline onChangeText={
                        text => this.updateForm({fillInTheBlanks :{...this.state.fillInTheBlanks,description: text}})}
                               placeholder="Description of the widget."/>

                    <FormLabel>Question</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({fillInTheBlanks :{...this.state.fillInTheBlanks,question: text}})}
                               placeholder="Eg :- 2 + 2 = [four=4]"/>

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


                    <View style={styles.btnContainer}>
                        <View style={styles.buttonInnerContainer}>
                            <Button raised
                                    backgroundColor="green"
                                    color="white"
                                    title="Save"
                                    onPress={this.createTrueFalse}
                            />
                        </View>
                        <View style={styles.buttonInnerContainer}>
                            <Button raised
                                    backgroundColor="red"
                                    color="white"
                                    title="Cancel"/>
                        </View>
                    </View>


                    <AnimatedHideView visible={this.state.isOnDefaultToggleSwitch}
                                      style={{backgroundColor: 'white', margin: 20}}>
                        <Text style={styles.points} h5>Points : {this.state.fillInTheBlanks.points} pts</Text>
                        <Text style={styles.title} h4>{this.state.fillInTheBlanks.title}</Text>
                        <Text style={styles.description}>Question : {this.state.fillInTheBlanks.description}</Text>
                        <Text style={styles.description}>{this.state.fillInTheBlanks.question}</Text>

                    </AnimatedHideView>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
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
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30
    },
    buttonInnerContainer: {
        flex: 1,
    }
});

export default FillInTheBlanksQuestionWidget