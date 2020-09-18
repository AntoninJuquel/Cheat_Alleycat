import React from "react";
import { View } from "react-native";
import { FAB } from "react-native-paper";
import { Colors } from "../Styles";

const Popup = ({ text }) => {
    return (
        <View style={{ position: "absolute", bottom: "20%" }}>
            <FAB
                style={{ backgroundColor: Colors.foregroundColor}}
                label={text}
                disabled
                small
                color={Colors.textColor}
            />
        </View>
    )
}

export default Popup;