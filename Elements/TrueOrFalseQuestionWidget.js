import React from 'react'
import {View, ScrollView, TextInput, StyleSheet,Alert} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput} from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import ToggleSwitch from 'toggle-switch-react-native'
import AnimatedHideView from 'react-native-animated-hide-view';

import WidgetService from '../Services/WidgetService';

class TrueOrFalseQuestionWidget extends React.Component {
    static navigationOptions = {title: "Essay Question"};

    constructor(props) {
        super(props);
        const lessonId = this.props.navigation.getParam("lessonId");
        this.widgetService = WidgetService.instance;
        this.state = {
            lessonId: lessonId,
            trueFalse: {title: '', points: '', description: '',answer:true},
            isOnDefaultToggleSwitch: false,
            title: '',
            description: '',
            points: 0,
            value: 0
        };
        this.createTrueFalse = this.createTrueFalse.bind(this);
    }


    updateForm(newState) {
        this.setState(newState);
    }

    createTrueFalse() {
        this.widgetService
            .createExam(this.state.lessonId)
            .then(exam => {
                this.widgetService.createTrueFalseWidget(this.state.trueFalse,exam.id)
            })
            .then(alert("True or False widget created"));
    }


    render() {
        var answers = [
            {label: 'True', value: 0},
            {label: 'False', value: 1}
        ];
        return (
            <ScrollView>
                <View>
                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({trueFalse :{...this.state.trueFalse,points: text}})
                    } placeholder="Points to be Awarded."/>

                    <FormLabel>Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({trueFalse :{...this.state.trueFalse,title: text}})
                    } placeholder="Title of the widget."/>

                    <FormLabel>Description</FormLabel>
                    <FormInput multiline onChangeText={
                        text => this.updateForm({trueFalse :{...this.state.trueFalse,description: text}})}
                               placeholder="Description of the widget."/>

                    <CheckBox title='Answer'
                              onPress={() => this.updateForm
                              ({trueFalse :{...this.state.trueFalse,answer: !this.state.trueFalse.answer}})}
                              checked={this.state.trueFalse.answer}/>

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
                        <Text style={styles.points} h5>Points : {this.state.trueFalse.points} pts</Text>
                        <Text style={styles.title} h4>{this.state.trueFalse.title}</Text>
                        <Text style={styles.description}>Question : {this.state.trueFalse.description}</Text>
                        <RadioForm
                            radio_props={answers}
                            initial={0}
                            formHorizontal={false}
                            labelHorizontal={true}
                            buttonColor={'#2196f3'}
                            animation={true}
                            style={{ alignItems: 'flex-start' }}
                            onPress={(value) => {
                                this.setState({value: value})
                            }}
                        />

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

export default TrueOrFalseQuestionWidget