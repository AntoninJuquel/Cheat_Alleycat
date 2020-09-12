import React from "react";
import { View } from "react-native";
import { FAB } from "react-native-paper";

const Popup = ({ text }) => {
    return (
        <View style={{ position: "absolute", bottom: "20%" }}>
            <FAB
                style={{ backgroundColor: '#eee' }}
                label={text}
                disabled
                small
                color='black'
            />
        </View>
    )
}

export default Popup;