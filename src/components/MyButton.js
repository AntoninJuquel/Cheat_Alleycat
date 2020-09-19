import React from "react";
import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

const MyButton = ({ style, text, onPress, color }) => {
    return (
        <View style={style} >
            <TouchableRipple style={{ height: '100%', width: '100%', justifyContent: "center", alignItems: "center" }} onPress={onPress}>
                <Text style={{color}}>{text}</Text>
            </TouchableRipple>
        </View>
    )
}

export default MyButton;