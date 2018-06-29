import React, {Component} from 'react'
import {Text,CheckBox,Button,ButtonGroup, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import {View, Alert} from 'react-native'

export default class EssayQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', description: '', points: 0,isTrue: true};
        this.formUpdate = this.formUpdate.bind(this)
    }

    formUpdate(update) {
        this.setState(update)
    }

    render() {
        return (
            <View>
                <Text h4>Editor</Text>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.formUpdate({title: text}) }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.formUpdate({description: text}) }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <CheckBox title='The answer is true'
                          onPress={() => this.formUpdate
                          ({isTrue: !this.state.isTrue})}
                          checked={this.state.isTrue}/>

                <Text h4>Preview</Text>
                <Text h3>{this.state.title}</Text>
                <Text>{this.state.description}</Text>

                <Button backgroundColor="green"
                        color="white"
                        title="Save"/>
                <Button backgroundColor="red"
                        color="white"
                        title="Cancel"/>
            </View>
        )
    }
}