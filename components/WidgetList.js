import React, {Component} from 'react'
import {View, Alert, Picker, StyleSheet, ScrollView} from 'react-native'
import {Text, ListItem} from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector'
import QuestionTypePicker from "../Elements/QuestionTypePicker";

import WidgetService from '../Services/WidgetService';
import AnimatedHideView from 'react-native-animated-hide-view';

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'};

    constructor(props) {
        super(props);
        this.widgetService = WidgetService.instance;
        const lessonId = this.props.navigation.getParam("lessonId");
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            widgetType: 'Assignment',
            lessonId: lessonId,
        };
        this.checkWidget = this.checkWidget.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId");
        this.widgetService
            .fetchResults(this.state.lessonId)
            .then(widgets => {
                this.setState({widgets});
                console.log(widgets);
            })
        /*        fetch("http://192.168.0.102:8080/api/lesson/" + lessonId + "/widget")
                    .then(response => (response.json()))
                    .then(widgets => this.setState({widgets}))*/
    }

    checkWidget(widget) {
        console.log(widget);
        var str;

        fetch('http://192.168.43.82:8080/api/lesson/' + this.state.lessonId + '/widgetType/' + widget.id)
            .then(response => (response.json()))
            .then(widType => {
                if(widType.widgetType === 'Exam')
                {
                    fetch('http://192.168.43.82:8080/api/lesson/widgetType/' + widType.id)
                        .then(response => (response.json()))
                        .then(text => {
                            console.log(text[0]);
                            if((text[0]) === "Essay")
                            {
                                this.props.navigation.navigate("EssayQuestionWidget",
                                    {widgetType: 'Essay',
                                    lessonId:this.state.lessonId,widgetId:widget.id});
                            }
                            else if((text[0]) === "MCQ")
                            {
                                this.props.navigation.navigate("MultipleChoiceQuestionWidget",
                                    {widgetType: 'Multiple Choice',
                                    lessonId:this.state.lessonId,widgetId:widget.id});
                            }
                            else if((text[0]) === "FillInTheBlanks")
                            {
                                this.props.navigation.navigate("FillInTheBlanksQuestionWidget",
                                    {widgetType: 'Fill in the blanks',
                                    lessonId:this.state.lessonId,widgetId:widget.id});
                            }
                            else if((text[0]) === "TrueFalse")
                            {
                                this.props.navigation.navigate("TrueOrFalseQuestionWidget",
                                    {widgetType: 'True or false',
                                    lessonId:this.state.lessonId,widgetId:widget.id});
                            }
                        })
                }
                else{
                    this.props.navigation.navigate("AssignmentWidget",{lessonId:this.state.lessonId,
                        widgetId:widget.id});
                }

                }
            )

    }

    render() {
        let index = 0;
        const data = [
            {key: index++, label: 'Exam'},
            {key: index++, label: 'Assignment'}
        ];
        return (
            <ScrollView>
                <View style={{padding: 15}}>
                    <ModalSelector
                        data={data}
                        initValue="Select widget type!"
                        onChange={(option) => {
                            this.setState({widgetType: `${option.label}`});
                            this.props.navigation.navigate("QuestionTypePicker", {
                                widgetType: `${option.label}`,
                                lessonId: this.state.lessonId
                            });
                        }
                        }/>

                    <AnimatedHideView visible={this.state.widgets != []}
                                      style={{backgroundColor: 'white', marginTop: 25}}>
                        <Text style={styles.textContainer}> Saved Widgets</Text>
                        {this.state.widgets.map(
                            (widget, index) => (
                                <ListItem
                                    key={widget.id}
                                    subtitle={widget.description}
                                    title={widget.title}
                                    button onPress={() => {
                                    this.checkWidget(widget)
                                }}/>))}
                    </AnimatedHideView>

                    {/*      onPress={() => this.props.navigation
                .navigate("QuestionList", {examId: widget.id})}*/}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textContainer: {
        fontWeight: 'bold'
    }
});

export default WidgetList