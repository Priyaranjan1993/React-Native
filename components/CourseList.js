import React,{Component} from 'react'
import {View,Text,Alert,ScrollView} from 'react-native'
import {ListItem} from 'react-native-elements'

class CourseList extends Component{
    static navigationOptions = {title: 'Courses'};

    constructor(props)
    {
        super(props);
        fetch('https://peaceful-inlet-41065.herokuapp.com/api/course')
            .then(response => (response.json()))
            .then(courses => {
                this.setState({courses: courses})
            })
            .catch(function(error) {
                Alert.alert(error.message);
                return undefined;
            });
        this.state = {
            courses: []
        }
    }

    render(){
        return(
            <ScrollView>
            <View style={{padding: 15}}>
                {this.state.courses.map((course, index) => (
                    <ListItem
                        onPress={() => this.props.
                        navigation.navigate("ModuleList",
                            {courseId: course.id})}
                        title={course.title}
                        key={index}
                        leftIcon={{name: 'subject'}}/>
                ))}
            </View>
            </ScrollView>
        )
    }
}

export default CourseList