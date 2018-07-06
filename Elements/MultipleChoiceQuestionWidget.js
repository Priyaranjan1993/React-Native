import React from 'react'
import {View, ScrollView, StyleSheet, TextInput, Alert} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import ToggleSwitch from 'toggle-switch-react-native'
import AnimatedHideView from 'react-native-animated-hide-view';
import WidgetService from '../Services/WidgetService';

class MultipleChoiceQuestionWidget extends React.Component {
    static navigationOptions = {title: "Multiple Choices"};

    constructor(props) {
        super(props);
        const lessonId = this.props.navigation.getParam("lessonId");
        const widgetId = this.props.navigation.getParam("widgetId");
        this.createMultipleChoice = this.createMultipleChoice.bind(this);
        this.updateMultipleChoice = this.updateMultipleChoice.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.deleteMultipleChoice = this.deleteMultipleChoice.bind(this);
        this.widgetService = WidgetService.instance;
        this.state = {
            lessonId: lessonId,
            widgetId: widgetId,
            title: '',
            description: '',
            points: 0,
            options: '',
            optionsFiltered: [],
            optionsFiltered2: [],
            value: 0,
            counter: 0, arr: [],
            optionVal: 0,
            radioButton: [],
            text:'',
            userRightChoice: 0,
            multipleChoice: {
                title: '', points: '', description: '', options: [],
                correctOption: 1, widgetType: 'Exam', type: 'MCQ'
            },
            isOnDefaultToggleSwitch: false
        };
    }

    componentDidMount() {
        if (this.state.widgetId != 0) {
            fetch('http://192.168.43.82:8080/api/question/' + this.state.widgetId)
                .then(response => (response.json()))
                .then(mcq => {
                    this.updateForm({
                        multipleChoice: {
                            ...this.state.multipleChoice,
                            points: mcq.points,
                            title: mcq.title,
                            description: mcq.description,
                            options: mcq.options
                        }
                    });
                    this.updateForm({arr : mcq.options});
                    this.updateForm({text : mcq.options.join("\n")});
                })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.navigation != undefined) {
            if (nextProps.navigation.getParam("widgetId") !== prevState.navigation.getParam("widgetId")) {
                return {widgetId: nextProps.navigation.getParam("widgetId")};
            }
            else return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.navigation.getParam("widgetId") !== this.props.navigation.getParam("widgetId")) {
            this.setState({widgetId: this.props.navigation.getParam("widgetId")});
            console.log("New Widget Id --- " + this.props.navigation.getParam("widgetId"));
        }
    }

    updateMultipleChoice() {
        this.widgetService
            .updateExam(this.state.multipleChoice, this.state.widgetId)
            .then(mcq => {
                this.widgetService.updateMCQ(this.state.multipleChoice, this.state.widgetId)
            })
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId});
                Alert.alert("MCQ Widget Updated");
            })
    }

    deleteMultipleChoice() {
        Alert.alert(
            'Delete',
            'Do ypu really want to delete the Widget?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'OK', onPress: () => this.widgetService.deleteMCQWidget(this.state.widgetId)
                        .then(() => {
                            this.widgetService
                                .deleteExam(this.state.widgetId)
                        })
                        .then(() => {
                            this.props.navigation
                                .navigate("WidgetList", {lessonId: this.state.lessonId});
                            Alert.alert("Essay Widget Deleted");
                        })
                }
            ],
            {cancelable: false}
        )
    }


    updateForm(newState) {
        this.setState(newState);
    }

    updateOptionsForm(newState, text) {
        let optionsArray = [];
        let arr = [];
        this.setState(newState);
        optionsArray = text.split('\n');
        this.setState({optionsFiltered: optionsArray});
        this.updateForm({text : optionsArray.join("\n")});
        this.setState({counter: this.state.counter++});
        console.log(optionsArray);
        console.log(this.state);

        var len = optionsArray.length;
        for (var i = 0; i < len; i++) {
            arr.push({
                label: optionsArray[i],
                value: i + 1
            });
        }

        this.setState({arr: arr});

    }

    change() {
        let newOptions = [];
        this.setState({optionsFiltered2: this.state.arr});
        this.state.arr.map((x) => (
            newOptions.push(x.label)
        ));
        this.setState({multipleChoice: {...this.state.multipleChoice, options: newOptions}});
    }

    createMultipleChoice() {
        this.widgetService
            .createExam(this.state.lessonId, this.state.multipleChoice)
            .then(mcq => {
                this.widgetService.createMulipleChoiceWidget(this.state.multipleChoice, mcq.id)
            })
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId});
                Alert.alert("Multiple Choices Widget Created");
            })
    }


    render() {
        return (
            <ScrollView>
                <View>
                    {/*<Button title='+' onPress={() => this.addRadioButton(this.state.radioButton.length)} />*/}

                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({multipleChoice: {...this.state.multipleChoice, points: text}})
                    } placeholder="Points to be Awarded."
                               value={`${this.state.multipleChoice.points}`}/>

                    <FormLabel>Title.</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({multipleChoice: {...this.state.multipleChoice, title: text}})
                    } placeholder="Title of the widget."
                               value={this.state.multipleChoice.title}/>

                    <FormLabel>Description</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({multipleChoice: {...this.state.multipleChoice, description: text}})}
                               placeholder="Description of the widget"
                               value={this.state.multipleChoice.description}/>

                    <FormLabel>Options</FormLabel>
                    <FormInput multiline
                               onChangeText={(text) => this.updateOptionsForm
                               ({
                                   multipleChoice: {
                                       ...this.state.multipleChoice,
                                       options: text
                                   }
                               }, text)}
                               numberOfLines={4}
                               value={this.state.text}
                               placeholder="Each line will be treated as an option. Delete a line to delete the option"
                               containerStyle={{paddingBottom: 30}}/>

                    <View style={styles.radioContainer}>
                        <RadioForm
                            radio_props={this.state.optionsFiltered2}
                            initial={0}
                            formHorizontal={false}
                            labelHorizontal={true}
                            buttonColor={'#2196f3'}
                            animation={true}
                            style={{alignItems: 'flex-start'}}
                            onPress={(value) => {
                                this.setState({multipleChoice: {...this.state.multipleChoice, correctOption: value}})
                            }}
                        />
                    </View>

                    <View style={styles.btnContainer}>
                        <View style={styles.buttonInnerContainer}>
                            <Button backgroundColor="green"
                                    color="white"
                                    title="Add Options"
                                    onPress={() => this.change()}/>
                        </View>
                    </View>

                    <View style={styles.btnContainer}>
                        <View style={[styles.buttonInnerContainer,
                            {display: this.state.widgetId != 0 ? 'none' : null}]}>
                            <Button raised
                                    backgroundColor="green"
                                    color="white"
                                    title="Save"
                                    onPress={this.createMultipleChoice}
                            />
                        </View>


                        <View style={[styles.buttonInnerContainer,
                            {display: this.state.widgetId != 0 ? null : 'none'}]}>
                            <Button raised
                                    backgroundColor="green"
                                    color="white"
                                    title="Update"
                                    onPress={this.updateMultipleChoice}
                            />
                        </View>

                        <View style={[styles.buttonInnerContainer,
                            {display: this.state.widgetId != 0 ? null : 'none'}]}>
                            <Button raised
                                    backgroundColor="red"
                                    color="white"
                                    title="Delete"
                                    onPress={this.deleteMultipleChoice}
                            />
                        </View>

                        <View style={styles.buttonInnerContainer}>
                            <Button raised
                                    backgroundColor="red"
                                    color="white"
                                    title="Cancel"
                                    onPress={() => this.props.navigation
                                        .navigate("WidgetList", {
                                            lessonId: this.state.lessonId
                                        })}/>
                        </View>
                    </View>

                    <ToggleSwitch
                        isOn={this.state.isOnDefaultToggleSwitch}
                        style={styles.lineStyle}
                        label='Preview'
                        labelStyle={{color: 'black', fontWeight: '900'}}
                        size='medium'
                        onToggle={isOnDefaultToggleSwitch => {
                            this.setState({isOnDefaultToggleSwitch});
                        }}
                    />

                    <View style={[styles.previewContainer,
                        {display: this.state.isOnDefaultToggleSwitch ? null : 'none'}]}>
                        <Text style={styles.points} h5>Points : {this.state.multipleChoice.points} pts</Text>
                        <Text style={styles.title} h4>{this.state.multipleChoice.title}</Text>
                        <Text style={styles.description}>Question : {this.state.multipleChoice.description}</Text>
                        {/*<Text style={styles.description}>Right Choice : {this.state.multipleChoice.correctOption}</Text>*/}

                        <View style={styles.radioContainer}>
                            <RadioForm
                                radio_props={this.state.optionsFiltered2}
                                initial={0}
                                formHorizontal={false}
                                labelHorizontal={true}
                                buttonColor={'#2196f3'}
                                animation={true}
                                style={{alignItems: 'flex-start'}}
                                onPress={(value) => {
                                    this.setState({userRightChoice: value})
                                }}
                            />
                        </View>
                    </View>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    lineStyle: {
        position: 'absolute',
        right: 0
    },
    points: {
        fontWeight: 'bold',
        paddingRight: 15,
        paddingTop: 20,
        paddingLeft: 20
    },
    title: {
        fontWeight: 'bold',
        paddingLeft: 20
    },
    description: {
        paddingTop: 30,
        paddingBottom: 15,
        paddingLeft: 20
    },
    btnStyle: {
        width: 9
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30
    },
    buttonInnerContainer: {
        flex: 1,
    },
    radioContainer: {
        marginLeft: 20,
        marginBottom: 40
    },
    previewContainer: {
        backgroundColor: 'white',
        margin: 20
    }
});

export default MultipleChoiceQuestionWidget