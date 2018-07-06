import React from 'react'
import {View, ScrollView, TextInput, StyleSheet, Alert} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

import ToggleSwitch from 'toggle-switch-react-native'
import AnimatedHideView from 'react-native-animated-hide-view';

import WidgetService from '../Services/WidgetService';

class EssayQuestionWidget extends React.Component {
    static navigationOptions = {title: "Essay Question"};

    constructor(props) {
        super(props);
        const lessonId = this.props.navigation.getParam("lessonId");
        const widgetId = this.props.navigation.getParam("widgetId");
        this.widgetService = WidgetService.instance;
        this.state = {
            lessonId: lessonId,
            widgetId: widgetId,
            essay: {title: '', points: '', description: '', widgetType: 'Exam', type: 'Essay'},
            isOnDefaultToggleSwitch: false,
            title: '',
            description: '',
            points: 0
        };
        this.createEssay = this.createEssay.bind(this);
        this.updateEssay = this.updateEssay.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.deleteEssay = this.deleteEssay.bind(this);
    }

    componentDidMount() {
        if (this.state.widgetId != 0) {
            fetch('http://192.168.43.82:8080/api/question/' + this.state.widgetId)
                .then(response => (response.json()))
                .then(essay => {
                    this.updateForm({
                        essay: {
                            ...this.state.essay,
                            points: essay.points,
                            title: essay.title,
                            description: essay.description
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

    createEssay() {
        this.widgetService
            .createExam(this.state.lessonId, this.state.essay)
            .then(exam => {
                this.widgetService.createEssayWidget(this.state.essay, exam.id)
            })
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId});
                Alert.alert("Essay Widget Created");
            })
    }

    updateEssay() {
        this.widgetService
            .updateExam(this.state.essay, this.state.widgetId)
            .then(exam => {
                this.widgetService.updateEssayWidget(this.state.essay, this.state.widgetId)
            })
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId});
                Alert.alert("Essay Widget Updated");
            })
    }


    deleteEssay() {
        Alert.alert(
            'Delete',
            'Do you really want to delete the Widget?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'OK', onPress: () => this.widgetService.deleteEssayWidget(this.state.widgetId)
                        .then(() => {
                            this.widgetService
                                .deleteExam(this.state.widgetId)
                        })
                        .then(() => {
                            this.props.navigation
                                .navigate("WidgetList", {lessonId: this.state.lessonId});
                            Alert.alert("Essay Widget Deleted");
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
                        text => this.updateForm({essay: {...this.state.essay, points: text}})
                    } placeholder="Points to be Awarded."
                               value={`${this.state.essay.points}`}/>

                    <FormLabel>Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({essay: {...this.state.essay, title: text}})
                    } placeholder="Title of the widget."
                               value={this.state.essay.title}/>

                    <FormLabel>Description</FormLabel>
                    <FormInput multiline onChangeText={
                        text => this.updateForm({essay: {...this.state.essay, description: text}})}
                               placeholder="Description of the widget."
                               value={this.state.essay.description}/>

                    <View style={styles.btnContainer}>
                        <View style={[styles.buttonInnerContainer,
                            {display: this.state.widgetId != 0 ? 'none' : null}]}>
                            <Button raised
                                    backgroundColor="green"
                                    color="white"
                                    title="Save"
                                    onPress={this.createEssay}
                            />
                        </View>

                        <View style={[styles.buttonInnerContainer,
                            {display: this.state.widgetId != 0 ? null : 'none'}]}>
                            <Button raised
                                    backgroundColor="green"
                                    color="white"
                                    title="Update"
                                    onPress={this.updateEssay}
                            />
                        </View>

                        <View style={[styles.buttonInnerContainer,
                            {display: this.state.widgetId != 0 ? null : 'none'}]}>
                            <Button raised
                                    backgroundColor="red"
                                    color="white"
                                    title="Delete"
                                    onPress={this.deleteEssay}
                            />
                        </View>

                        <View style={styles.buttonInnerContainer}>
                            <Button raised
                                    backgroundColor="red"
                                    color="white"
                                    title="Cancel"
                                    onPress={() => this.props.navigation
                                        .navigate("WidgetList", {
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


                    <View style={[styles.previewContainer,
                        {display: this.state.isOnDefaultToggleSwitch ? null : 'none'}]}>
                        <Text style={styles.points} h5>Points : {this.state.essay.points} pts</Text>
                        <Text style={styles.title} h4>{this.state.essay.title}</Text>
                        <Text style={styles.description}>Question : {this.state.essay.description}</Text>

                        <FormLabel>Essay Answer</FormLabel>
                        <FormInput multiline
                                   numberOfLines={5}
                                   placeholder="Write your essay answer here...."/>

                    </View>

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
    },
    previewContainer: {
        backgroundColor: 'white',
        margin: 20
    }
});

export default EssayQuestionWidget