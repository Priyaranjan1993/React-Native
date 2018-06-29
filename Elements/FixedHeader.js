import React from 'react'
import {Header} from 'react-native-elements'

const FixedHeader = () => (
    <Header
        leftComponent={{icon: 'home', color: '#fff'}}
        centerComponent={{
            text: 'Course Manager',
            style: {color: '#fff'}
        }}
        rightComponent={{icon: 'person', color: '#fff'}}/>);
export default FixedHeader