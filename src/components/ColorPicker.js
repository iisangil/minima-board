import {ColorPicker} from 'react-native-color-picker'
import { StyleSheet } from 'react-native'
import React from 'react'

import { styles } from '../components/Styles';

const PickerComponent = () => {
    return (
        <ColorPicker
            onColorSelected = {color => alert(`Selected: ${color}`)}
            style = {styles.colorContainer}

        />
    )
}

export default PickerComponent