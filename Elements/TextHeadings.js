import React from 'react'
import {View} from 'react-native'
import {Text, Divider} from 'react-native-elements'

const TextHeadings = () => (
    <View>
        <Text h1>Welcome Priyaranjan!</Text>
        <Text h2>This is Android</Text>
        <Text h3>First time in Android</Text>
        <Text h4>Happy Happy !! :)</Text>
        <Divider style={{backgroundColor: 'blue'}}/>
        <Text>
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit,
            sed do eiusmod tempor incididunt
            ut labore et dolore magna aliquas.
        </Text>
    </View>)
export default TextHeadings