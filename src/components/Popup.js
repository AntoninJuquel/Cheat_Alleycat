import React from "react";
import { View } from "react-native";
import { FAB } from "react-native-paper";
import { Colors } from "../Styles";

const Popup = ({ style,text, visible }) => {
    return (
        <View style={style}>
            <FAB
                style={{ backgroundColor: visible ? Colors.background : 'transparent' }}
                label={text}
                disabled
                small
                color={visible ? Colors.text : 'transparent'}
            />
        </View>
    )
}

export default Popup;