import React from 'react'
import { ListItem,Text } from 'react-native-elements'
import { View, Alert } from 'react-native'

const lists = [
    { title: 'Question 1', subtitle: 'Multiple choice',
        icon: 'list'},
    { title: 'Question 2', subtitle: 'Fill-in the blanks',
        icon: 'code'},
    { title: 'Question 3', subtitle: 'True or false',
        icon: 'check'},
    { title: 'Question 4', subtitle: 'Essay',
        icon: 'subject'}]

export default class Exam extends React.Component{
    render()
    {
        return(
            <View style={{padding:20}}>
                <Text h2>Lists</Text>
                {lists.map((list, i) => (
                    <ListItem
                        key={i}
                        title={list.title}
                        subtitle={list.subtitle}
                        leftIcon={{name: list.icon}}/>
                ))}
            </View>
        )
    }
}
