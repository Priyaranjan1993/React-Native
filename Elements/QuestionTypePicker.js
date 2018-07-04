import React, {Component} from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import ModalSelector from 'react-native-modal-selector'

export default class QuestionTypePicker
    extends Component {
    constructor(props) {
        super(props);
        const lessonId = this.props.navigation.getParam("lessonId");
        this.state = {
            questionType: 'MC',
            widgetType: '',
            lessonId: lessonId
        };
        const {navigation} = this.props;
        const widgetType = navigation.getParam("widgetType");
        console.log("type --" + widgetType);

    }

    componentDidMount() {
        const {navigation} = this.props;
        const widgetType = navigation.getParam("widgetType");
        console.log("type2 --" + widgetType);
        this.setState({widgetType: widgetType});
    }

    displayAssignmentOrExamOptions() {
        let index = 0;
        const data = [
            {key: index++, label: 'Multiple Choice'},
            {key: index++, label: 'Essay'},
            {key: index++, label: 'True or false'},
            {key: index++, label: 'Fill in the blanks'}
        ];
        if (this.state.widgetType === 'Exam') {
            return <View style={{padding: 15}}>
                <ModalSelector
                data={data}
                initValue="Select Exam type!"
                onChange={(option) => {
                    if (`${option.label}` === 'Multiple Choice') {
                        this.props.navigation.navigate("MultipleChoiceQuestionWidget", {widgetType: `${option.label}`,
                            lessonId:this.state.lessonId,widgetId:0});
                    }
                    else if (`${option.label}` === 'Essay') {
                        this.props.navigation.navigate("EssayQuestionWidget", {widgetType: `${option.label}`,
                            lessonId:this.state.lessonId,widgetId:0});
                    }
                    else if (`${option.label}` === 'True or false') {
                        this.props.navigation.navigate("TrueOrFalseQuestionWidget", {widgetType: `${option.label}`,
                            lessonId:this.state.lessonId,widgetId:0});
                    }
                    else if (`${option.label}` === 'Fill in the blanks') {
                        this.props.navigation.navigate("FillInTheBlanksQuestionWidget", {widgetType: `${option.label}`,
                            lessonId:this.state.lessonId,widgetId:0});
                    }
                }
                }/>
            </View>
        }
        else if(this.state.widgetType === "Assignment") {
            return this.props.navigation.navigate("AssignmentWidget",{lessonId:this.state.lessonId,widgetId:0});
        }
    }

    render() {
        return (
            <View>
                {this.displayAssignmentOrExamOptions()}
            </View>
        )
    }
}