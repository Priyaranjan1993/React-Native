import React, {Component} from 'react'
import {View, Alert, Picker} from 'react-native'
import {Text, ListItem} from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector'
import QuestionTypePicker from "../Elements/QuestionTypePicker";

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'};

    constructor(props) {
        super(props);
        const lessonId = this.props.navigation.getParam("lessonId");
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            widgetType: 'Assignment',
            lessonId: lessonId
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId");
        /*        fetch("http://192.168.0.102:8080/api/lesson/" + lessonId + "/widget")
                    .then(response => (response.json()))
                    .then(widgets => this.setState({widgets}))*/
    }

    render() {
        let index = 0;
        const data = [
            {key: index++, label: 'Exam'},
            {key: index++, label: 'Assignment'}
        ];
        return (
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

                    {/*                {this.state.widgets.map(
                    (widget, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("QuestionList", {examId: widget.id})}
                            key={index}
                            subtitle={widget.description}
                            title={widget.title}/>))}*/}
                        </View>
                        )
                        }
                }

                export default WidgetList