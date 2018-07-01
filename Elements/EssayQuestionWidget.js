import React from 'react'
import {View, ScrollView, TextInput, StyleSheet} from 'react-native'
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
        this.widgetService = WidgetService.instance;
        this.state = {
            lessonId: lessonId,
            essay: {title: '', points: '', description: ''},
            isOnDefaultToggleSwitch: false,
            title: '',
            description: '',
            points: 0
        };
        this.createEssay = this.createEssay.bind(this);
    }


    updateForm(newState) {
        this.setState(newState);
    }

    createEssay() {
        this.widgetService
            .createExam(this.state.lessonId)
            .then(exam => {
                this.widgetService.createEssayWidget(this.state.essay,exam.id)
            })
            .then(alert("Essay created"));
    }


    render() {
        return (
            <ScrollView>
                <View>
                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({essay: {...this.state.essay, points: text}})
                    } placeholder="Points to be Awarded."/>

                    <FormLabel>Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({essay : {...this.state.essay, title: text}})
                    } placeholder="Title of the widget."/>

                    <FormLabel>Description</FormLabel>
                    <FormInput multiline onChangeText={
                        text => this.updateForm({essay : {...this.state.essay, description: text}})}
                               placeholder="Description of the widget."/>

                    <View style={styles.btnContainer}>
                        <View style={styles.buttonInnerContainer}>
                            <Button raised
                                    backgroundColor="green"
                                    color="white"
                                    title="Save"
                                    onPress={this.createEssay}
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
                                      style={{ backgroundColor: 'white', margin: 20 }}>
                        <Text style={styles.points} h5>Points : {this.state.essay.points} pts</Text>
                        <Text style={styles.title} h4>{this.state.essay.title}</Text>
                        <Text style={styles.description}>Question : {this.state.essay.description}</Text>

                        <FormLabel>Essay Answer</FormLabel>
                        <FormInput multiline
                                   numberOfLines={5}
                                   placeholder="Write your essay answer here...."/>

                    </AnimatedHideView>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    points:{
        fontWeight:'bold',
        paddingRight:15,
        paddingTop:20,
        paddingLeft:20
    },
    title:{
        fontWeight:'bold',
        paddingLeft:20
    },
    description:{
        paddingTop: 30,
        paddingBottom: 40,
        paddingLeft:20
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

export default EssayQuestionWidget