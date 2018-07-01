/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View, StatusBar,
    Button,
    ScrollView
} from 'react-native';
import FixedHeader from './Elements/FixedHeader'
import {Text,Icon, FormLabel, FormInput} from 'react-native-elements'
import {createStackNavigator} from 'react-navigation'

import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'

import MultipleChoiceQuestionWidget from './Elements/MultipleChoiceQuestionWidget'
import QuestionTypePicker from './Elements/QuestionTypePicker'
import AssignmentWidget from "./Elements/AssignmentWidget";
import EssayQuestionWidget from "./Elements/EssayQuestionWidget";
import TrueOrFalseQuestionWidget from "./Elements/TrueOrFalseQuestionWidget";

class Home extends Component {
    static navigationOptions = {title: 'Home'};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <FixedHeader/>
                    <Button title="Courses"
                            onPress={() => this.props.navigation
                                .navigate('CourseList')}/>
                </View>
            </ScrollView>
        )
    }
}

const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    WidgetList,
    QuestionList,
    MultipleChoiceQuestionWidget,
    AssignmentWidget,
    EssayQuestionWidget,
    TrueOrFalseQuestionWidget,
    QuestionTypePicker
});

const styles = StyleSheet.create({
    lineStyle: {
        position: 'absolute',
        right: 0
    }
});

export default App;
