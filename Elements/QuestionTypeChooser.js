import React, {Component} from 'react'
import {Text,ButtonGroup} from 'react-native-elements'
import { View, Alert } from 'react-native'

export default class QuestionTypeChooser extends Component {
    static navigationOptions = {title: 'Create Question'};

    constructor() {
        super();
        this.state = {selectedIndex: 0};
        this.updateIndex = this.updateIndex.bind(this);
    }

    updateIndex (selectedIndex)
    {
        this.setState({selectedIndex});
       // Alert.alert({selectedIndex});
    }

    render(){
        const component1 = () =>
            <View style={{paddingLeft: 10}}>
                <Text>Multiple Choice</Text></View>

        const buttons = [{element: component1},
            'Fill the blank',
            'Essay',
            'True or\nfalse'];
        //const { selectedIndex } = this.state;
        return(
            <ButtonGroup
                buttons={buttons}
                onPress={this.updateIndex}
                selectedIndex={this.state.selectedIndex}
                containerStyle={{height: 76}}/>
        )
    }
}
