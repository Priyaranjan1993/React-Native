import React, {Component} from 'react'
import {Button, Text, Icon, FormLabel, FormInput} from 'react-native-elements'
import {
    Platform,
    StyleSheet,
    View, StatusBar,
    ScrollView
} from 'react-native';

import ToggleSwitch from 'toggle-switch-react-native'
import AnimatedHideView from 'react-native-animated-hide-view';

import WidgetService from '../Services/WidgetService';

export default class AssignmentWidget extends Component {

    static navigationOptions = {title: 'Assignment Widget'};

    constructor(props) {
        super(props);
        const lessonId = this.props.navigation.getParam("lessonId");
        this.widgetService = WidgetService.instance;
        this.state = {
            assignment: {title: '', points: '', description: ''},
            isOnDefaultToggleSwitch: false,
            lessonId: lessonId,
            points: '',
            description: '',
            title: ''
        };
        this.createCourse = this.createCourse.bind(this);
    }

    updateForm(newState) {
        this.setState(newState);
    }


    createCourse() {
        this.widgetService
            .createAssignmentWidget(this.state.assignment, this.state.lessonId)
            .then(() => {
                /*                this.findAllCourses();
                                this.setState({
                                    course: {title: ''}
                                });*/
                alert("Assignment created");
            });
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({assignment: {...this.state.assignment,points: text}})
                    } placeholder="Points to be Awarded"/>

                    <FormLabel>Title.</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({assignment: {...this.state.assignment,title: text}})
                    } placeholder="Title of the widget"/>

                    <FormLabel>Description</FormLabel>
                    <FormInput multiline onChangeText={
                        text => this.updateForm({assignment: {...this.state.assignment,description: text}})}
                               placeholder="Description of the widget"
                               containerStyle={{paddingBottom: 30}}/>

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
    }
});
