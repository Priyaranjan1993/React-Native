import React from 'react'
import {View, ScrollView, TextInput, StyleSheet} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

import ToggleSwitch from 'toggle-switch-react-native'
import AnimatedHideView from 'react-native-animated-hide-view';

class EssayQuestionWidget extends React.Component {
    static navigationOptions = {title: "Essay Question"};

    constructor(props) {
        super(props);
        this.state = {
            isOnDefaultToggleSwitch: false,
            title: '',
            description: '',
            points: 0
        };
    }

    updateSize = (height) => {
        this.setState({
            height
        });
    };

    updateForm(newState) {
        this.setState(newState);
    }


    render() {
        return (
            <ScrollView>
                <View>
                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({points: text})
                    } placeholder="Points to be Awarded."/>

                    <FormLabel>Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({title: text})
                    } placeholder="Title of the widget."/>

                    <FormLabel>Description</FormLabel>
                    <FormInput multiline onChangeText={
                        text => this.updateForm({description: text})}
                               placeholder="Description of the widget."/>

                    <Button backgroundColor="green"
                            color="white"
                            title="Submit"/>
                    <Button backgroundColor="red"
                            color="white"
                            title="Cancel"/>

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
                        <Text style={styles.points}h5>Points : {this.state.points} pts</Text>
                        <Text style={styles.title} h4>{this.state.title}</Text>
                        <Text style={styles.description}>Question : {this.state.description}</Text>

                        <FormLabel>Essay Answer</FormLabel>
                        <FormInput multiline placeholder="Write your essay answer here...."/>

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
    }
});

export default EssayQuestionWidget