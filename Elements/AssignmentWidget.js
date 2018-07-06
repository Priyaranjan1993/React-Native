import React, {Component} from 'react'
import {Button, Text, Icon, FormLabel, FormInput} from 'react-native-elements'
import {
    Platform,
    StyleSheet,
    View, StatusBar,
    ScrollView,
    Alert
} from 'react-native';

import ToggleSwitch from 'toggle-switch-react-native'
import AnimatedHideView from 'react-native-animated-hide-view';

import WidgetService from '../Services/WidgetService';

export default class AssignmentWidget extends Component {

    static navigationOptions = {title: 'Assignment Widget'};

    constructor(props) {
        super(props);
        const lessonId = this.props.navigation.getParam("lessonId");
        const widgetId = this.props.navigation.getParam("widgetId");
        this.widgetService = WidgetService.instance;
        this.state = {
            assignment: {title: '', points: '', description: '', widgetType: 'Assignment'},
            isOnDefaultToggleSwitch: false,
            widgetId: widgetId,
            lessonId: lessonId,
            points: '',
            description: '',
            title: ''
        };
        this.createCourse = this.createCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentDidMount() {
        if (this.state.widgetId != 0) {
            fetch('http://192.168.43.82:8080/api/assignment/' + this.state.widgetId)
                .then(response => (response.json()))
                .then(assignment => {
                    this.updateForm({
                        assignment: {
                            ...this.state.assignment,
                            points: assignment.points,
                            title: assignment.title,
                            description: assignment.description
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


    createCourse() {
        this.widgetService
            .createAssignmentWidget(this.state.assignment, this.state.lessonId)
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId});
                Alert.alert("Assignment Created");
            });
    }


    updateCourse() {
        this.widgetService
            .updateAssignment(this.state.assignment, this.state.widgetId)
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId});
                Alert.alert("Essay Widget Updated");
            })
    }

    deleteCourse() {
        Alert.alert(
            'Delete',
            'Do you really want to delete the Widget?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'OK', onPress: () => this.widgetService.deleteAssignment(this.state.widgetId)
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
                        text => this.updateForm({assignment: {...this.state.assignment, points: text}})
                    } placeholder="Points to be Awarded"
                               value={`${this.state.assignment.points}`}/>

                    <FormLabel>Title.</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({assignment: {...this.state.assignment, title: text}})
                    } placeholder="Title of the widget"
                               value={this.state.assignment.title}/>

                    <FormLabel>Description</FormLabel>
                    <FormInput multiline onChangeText={
                        text => this.updateForm({assignment: {...this.state.assignment, description: text}})}
                               placeholder="Description of the widget"
                               containerStyle={{paddingBottom: 30}}
                               value={this.state.assignment.description}/>

                    <View style={styles.btnContainer}>
                        <View style={[styles.buttonInnerContainer,
                            {display: this.state.widgetId != 0 ? 'none' : null}]}>
                            <Button raised
                                    backgroundColor="green"
                                    color="white"
                                    title="Save"
                                    onPress={this.createCourse}
                            />
                        </View>

                        <View style={[styles.buttonInnerContainer,
                            {display: this.state.widgetId != 0 ? null : 'none'}]}>
                            <Button raised
                                    backgroundColor="green"
                                    color="white"
                                    title="Update"
                                    onPress={this.updateCourse}
                            />
                        </View>

                        <View style={[styles.buttonInnerContainer,
                            {display: this.state.widgetId != 0 ? null : 'none'}]}>
                            <Button raised
                                    backgroundColor="red"
                                    color="white"
                                    title="Delete"
                                    onPress={this.deleteCourse}
                            />
                        </View>

                        <View style={styles.buttonInnerContainer}>
                            <Button raised
                                    backgroundColor="red"
                                    color="white"
                                    title="Cancel"
                                    onPress={() => this.props.navigation
                                        .navigate("WidgetList", {lessonId: this.state.lessonId})}/>
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
                        <Text style={styles.points} h5>Points : {this.state.assignment.points} pts</Text>
                        <Text style={styles.title} h4>{this.state.assignment.title}</Text>
                        <Text style={styles.description}>Question : {this.state.assignment.description}</Text>

                        <FormLabel>Essay Answer</FormLabel>
                        <FormInput multiline
                                   numberOfLines={5}
                                   placeholder="Write your essay answer here...."/>

                        <FormLabel>Essay Answer</FormLabel>
                        <Button backgroundColor="grey"
                                color="black"
                                title="Choose File"
                                style={styles.btnStyle}/>

                        <FormLabel>Submit a link </FormLabel>
                        <FormInput placeholder="Paste your link here"/>

                    </View>

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
    previewContainer: {
        backgroundColor: 'white',
        margin: 20
    }
});
