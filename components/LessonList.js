import React, {Component} from 'react'
import {View,ScrollView} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class LessonList extends Component {
    static navigationOptions = {title: 'Lessons'};
    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            courseId: 1,
            moduleId: 1
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId");
        const moduleId = navigation.getParam("moduleId");
        fetch("http://192.168.0.102:8080/api/course/module/lesson/"+courseId+"/"+moduleId)
            .then(response => (response.json()))
            .then((lessons) => {
                this.setState({lessons: lessons})
            })
    }
    render() {
        return(
            <ScrollView>
            <View style={{padding: 15}}>
                {this.state.lessons.map(
                    (lesson, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("WidgetList", {lessonId: lesson.id})}
                            key={index}
                            title={lesson.title}
                            leftIcon={{name: 'subject'}}/>))}
            </View>
            </ScrollView>
        )
    }
}
export default LessonList