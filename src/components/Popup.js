import React from "react";
import { View } from "react-native";
import { FAB } from "react-native-paper";
import { Colors } from "../Styles";

const Popup = ({ text, visible }) => {
    return (
        <View style={{ position: "absolute", bottom: "20%"}}>
            <FAB
                style={{ backgroundColor: visible ? Colors.foregroundColor : 'transparent'}}
                label={text}
                disabled
                small
                color={ visible ? Colors.textColor : 'transparent'}
            />
        </View>
    )
}

export default Popup;