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
    ScrollView
} from 'react-native';
import FixedHeader from './Elements/FixedHeader'
import {Button,Text,Icon, FormLabel, FormInput} from 'react-native-elements'
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
import FillInTheBlanksQuestionWidget from "./Elements/FillInTheBlanksQuestionWidget";


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
                    <Text style={styles.textContainer} h4>Click the button to see list of courses</Text>
                    <Button buttonStyle={styles.btnContainer}
                            title="Courses"
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
    FillInTheBlanksQuestionWidget,
    QuestionTypePicker
});

const styles = StyleSheet.create({
    btnContainer: {
        marginTop:60,
        backgroundColor: "rgba(92, 99,216, 1)",
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },
    textContainer:{
        paddingLeft:20,
        marginTop:80
    }
});

export default App;
