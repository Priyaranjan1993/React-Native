import React from 'react'
import {View, ScrollView, TextInput, StyleSheet, Alert} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput} from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import ToggleSwitch from 'toggle-switch-react-native'
import AnimatedHideView from 'react-native-animated-hide-view';

import WidgetService from '../Services/WidgetService';

class TrueOrFalseQuestionWidget extends React.Component {
    static navigationOptions = {title: "True False Question"};

    constructor(props) {
        super(props);
        const lessonId = this.props.navigation.getParam("lessonId");
        const widgetId = this.props.navigation.getParam("widgetId");
        this.widgetService = WidgetService.instance;
        this.state = {
            lessonId: lessonId,
            widgetId: widgetId,
            trueFalse: {title: '', points: '', description: '', answer: true, widgetType: 'Exam', type: 'TrueFalse'},
            isOnDefaultToggleSwitch: false,
            title: '',
            description: '',
            points: 0,
            value: 0
        };
        this.createTrueFalse = this.createTrueFalse.bind(this);
        this.updateTrueFalse = this.updateTrueFalse.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.deleteTrueFalse = this.deleteTrueFalse.bind(this);
    }

    componentDidMount() {
        if (this.state.widgetId != 0) {
            fetch('https://peaceful-inlet-41065.herokuapp.com/api/question/' + this.state.widgetId)
                .then(response => (response.json()))
                .then(trueFalse => {
                    this.updateForm({
                        trueFalse: {
                            ...this.state.trueFalse,
                            points: trueFalse.points,
                            title: trueFalse.title,
                            description: trueFalse.description,
                            answer: trueFalse.answer
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

    createTrueFalse() {
        this.widgetService
            .createExam(this.state.lessonId, this.state.trueFalse)
            .then(trueFalse => {
                this.widgetService.createTrueFalseWidget(this.state.trueFalse, trueFalse.id)
            })
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId});
                Alert.alert("True or False Widget Created");
            })
    }

    updateTrueFalse() {
        this.widgetService
            .updateExam(this.state.trueFalse, this.state.widgetId)
            .then(trueFalse => {
                this.widgetService.updateTrueFalse(this.state.trueFalse, this.state.widgetId)
            })
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId});
                Alert.alert("True or False Widget Updated");
            })
    }

    deleteTrueFalse() {
        Alert.alert(
            'Delete',
            'Do you really want to delete the Widget?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'OK', onPress: () => this.widgetService.deleteTrueFalseWidget(this.state.widgetId)
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
        var answers = [
            {label: 'True', value: 0},
            {label: 'False', value: 1}
        ];
        return (
            <ScrollView>
                <View>
                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({trueFalse: {...this.state.trueFalse, points: text}})
                    } placeholder="Points to be Awarded."
                               value={`${this.state.trueFalse.points}`}/>

                    <FormLabel>Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({trueFalse: {...this.state.trueFalse, title: text}})
                    } placeholder="Title of the widget."
                               value={this.state.trueFalse.title}/>

                    <FormLabel>Description</FormLabel>
                    <FormInput multiline onChangeText={
                        text => this.updateForm({trueFalse: {...this.state.trueFalse, description: text}})}
                               placeholder="Description of the widget."
                               value={this.state.trueFalse.description}/>

                    <CheckBox title='True'
                              onPress={() => this.updateForm
                              ({trueFalse: {...this.state.trueFalse, answer: !this.state.trueFalse.answer}})}
                              checked={this.state.trueFalse.answer}
                              value={this.state.trueFalse.answer}/>


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
                                    onPress={this.updateTrueFalse}
                            />
                        </View>

                        <View style={[styles.buttonInnerContainer,
                            {display: this.state.widgetId != 0 ? null : 'none'}]}>
                            <Button raised
                                    backgroundColor="red"
                                    color="white"
                                    title="Delete"
                                    onPress={this.deleteTrueFalse}
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
                            style={{alignItems: 'flex-start'}}
                            onPress={(value) => {
                                this.setState({value: value})
                            }}
                        />

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

export default TrueOrFalseQuestionWidget