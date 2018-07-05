import React from 'react'
import {View, ScrollView, TextInput, StyleSheet, Alert} from 'react-native'
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
        const widgetId = this.props.navigation.getParam("widgetId");
        this.widgetService = WidgetService.instance;
        this.state = {
            lessonId: lessonId,
            widgetId: widgetId,
            fillInTheBlanks: {
                title: '', points: '', description: '', question: '',
                widgetType: 'Exam', type: 'FillInTheBlanks', variable: ''
            },
            isOnDefaultToggleSwitch: false
        };
        this.createFillInTheBlanks = this.createFillInTheBlanks.bind(this);
        this.updateFillInTheBlanks = this.updateFillInTheBlanks.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.deleteFillInTheBlanks = this.deleteFillInTheBlanks.bind(this);
        this.modifyQuestion = this.modifyQuestion.bind(this);
    }


    componentDidMount() {
        if (this.state.widgetId != 0) {
            fetch('http://192.168.43.82:8080/api/question/' + this.state.widgetId)
                .then(response => (response.json()))
                .then(fillInTheBlanks => {
                    this.updateForm({
                        fillInTheBlanks: {
                            ...this.state.fillInTheBlanks,
                            points: fillInTheBlanks.points,
                            title: fillInTheBlanks.title,
                            description: fillInTheBlanks.description,
                            question: fillInTheBlanks.question
                        }
                    })
                })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.navigation != undefined) {
            if (nextProps.navigation.getParam("widgetId") !== prevState.navigation.getParam("widgetId")) {
                return {widgetId: nextProps.navigation.getParam("widgetId")};
            }
            else return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.navigation.getParam("widgetId") !== this.props.navigation.getParam("widgetId")) {
            this.setState({widgetId: this.props.navigation.getParam("widgetId")});
            console.log("New Widget Id --- " + this.props.navigation.getParam("widgetId"));
        }
    }

    updateForm(newState) {
        this.setState(newState);
    }

    modifyQuestion(text) {
        let newText = [];
        let preVariable = text.match(/\[(.+?)\]/g);
        text.replace(preVariable,
            function ($0, $1) {
                newText.push($1)
            });

        if (newText) {
            this.updateForm({
                fillInTheBlanks: {
                    ...this.state.fillInTheBlanks,
                    question: text,
                    variable: newText.join()
                }
            })
        }
        else {
            this.updateForm({fillInTheBlanks: {...this.state.fillInTheBlanks, question: text}})
        }
    }

    createFillInTheBlanks() {
        this.widgetService
            .createExam(this.state.lessonId, this.state.fillInTheBlanks)
            .then(exam => {
                this.widgetService.createFillInTheBlanksWidget(this.state.fillInTheBlanks, exam.id)
            })
            .then(() => {
                this.props.navigation
                    .navigate("QuestionTypePicker", {widgetType: 'Exam', lessonId: this.state.lessonId});
                Alert.alert("Fill in the blanks widget Created");
            })
    }

    updateFillInTheBlanks() {
        this.widgetService
            .updateExam(this.state.fillInTheBlanks, this.state.widgetId)
            .then(exam => {
                this.widgetService.updateFillInTheBlanksWidget(this.state.fillInTheBlanks, this.state.widgetId)
            })
            .then(() => {
                this.props.navigation
                    .navigate("QuestionTypePicker", {widgetType: 'Exam', lessonId: this.state.lessonId});
                Alert.alert("Fill in the Blanks Widget Updated");
            })
    }

    deleteFillInTheBlanks() {
        Alert.alert(
            'Delete',
            'Do ypu really want to delete the Widget?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'OK', onPress: () => this.widgetService.deleteFillWidget(this.state.widgetId)
                        .then(() => {
                            this.widgetService
                                .deleteExam(this.state.widgetId)
                        })
                        .then(() => {
                            this.props.navigation
                                .navigate("QuestionTypePicker", {widgetType: 'Exam', lessonId: this.state.lessonId});
                            Alert.alert("Fill in the Blanks Widget Deleted");
                        })
                }
            ],
            {cancelable: false}
        )
    }


    render() {
        return (
            <ScrollView>
                <View>
                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({fillInTheBlanks: {...this.state.fillInTheBlanks, points: text}})
                    } placeholder="Points to be Awarded."/>

                    <FormLabel>Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({fillInTheBlanks: {...this.state.fillInTheBlanks, title: text}})
                    } placeholder="Title of the widget."/>

                    <FormLabel>Description</FormLabel>
                    <FormInput multiline onChangeText={
                        text => this.updateForm({fillInTheBlanks: {...this.state.fillInTheBlanks, description: text}})}
                               placeholder="Description of the widget."/>

                    <FormLabel>Question</FormLabel>
                    <FormInput onChangeText={
                        text => this.modifyQuestion(text)}
                               placeholder="Eg :- 2 + 2 = [four=4]"/>

                    {/*this.updateForm({fillInTheBlanks :{...this.state.fillInTheBlanks,question: text}})*/}
                    <View style={styles.btnContainer}>
                        <View style={[styles.buttonInnerContainer,
                            {display: this.state.widgetId != 0 ? 'none' : null}]}>
                            <Button raised
                                    backgroundColor="green"
                                    color="white"
                                    title="Save"
                                    onPress={this.createTrueFalse}
                            />
                        </View>


                        <View style={[styles.buttonInnerContainer,
                            {display: this.state.widgetId != 0 ? null : 'none'}]}>
                            <Button raised
                                    backgroundColor="green"
                                    color="white"
                                    title="Update"
                                    onPress={this.updateFillInTheBlanks}
                            />
                        </View>

                        <View style={[styles.buttonInnerContainer,
                            {display: this.state.widgetId != 0 ? null : 'none'}]}>
                            <Button raised
                                    backgroundColor="red"
                                    color="white"
                                    title="Delete"
                                    onPress={this.deleteFillInTheBlanks}
                            />
                        </View>


                        <View style={styles.buttonInnerContainer}>
                            <Button raised
                                    backgroundColor="red"
                                    color="white"
                                    title="Cancel"
                                    onPress={() => this.props.navigation
                                        .navigate("QuestionTypePicker", {
                                            widgetType: 'Exam',
                                            lessonId: this.state.lessonId
                                        })}/>
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
                        <Text style={styles.points} h5>Points : {this.state.fillInTheBlanks.points} pts</Text>
                        <Text style={styles.title} h4>{this.state.fillInTheBlanks.title}</Text>
                        <Text style={styles.description}>Description : {this.state.fillInTheBlanks.description}</Text>
                        <Text>Question : {this.state.fillInTheBlanks.question.replace(/\[([^\]]+)\]/g, '[         ]')}</Text>

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
        paddingBottom: 15,
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