/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, StatusBar,
    ScrollView
} from 'react-native';
import FixedHeader from './Elements/FixedHeader'
import {Button,Icon} from 'react-native-elements'
import {createStackNavigator} from 'react-navigation'

import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'

import TrueFalseQuestionEditor from './Elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionWidget from './Elements/MultipleChoiceQuestionWidget'
import QuestionTypePicker from './Elements/QuestionTypePicker'


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
                                .navigate('CourseList') } />
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
    TrueFalseQuestionEditor,
    MultipleChoiceQuestionWidget,
    QuestionTypePicker
});

export default App;
