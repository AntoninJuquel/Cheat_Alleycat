import React, { useState } from 'react';
import { View, Clipboard, TouchableOpacity, Linking } from 'react-native';
import { Text, IconButton, TextInput } from "react-native-paper";
import { Colors, Styles } from '../Styles';
import SearchInput from './SearchInput';

const CheckpointCard = ({ index, title, x, y, end, start, handleDelete, handleEdit, handleEnd, handleStart, handlePopup }) => {
    const [text, setText] = useState('');
    const [coordinates, setCoordinates] = useState([])
    const [edit, setEdit] = useState(false);
    const [completed, setCompleted] = useState(false);

    const StartEdit = () => {
        setEdit(true)
        setText(title)
        setCoordinates([x, y])
    }
    const CancelEdit = () => {
        setEdit(false)
    }
    const ConfirmEdit = () => {
        handleEdit(index, text, coordinates)
        if (end) {
            EditEnd()
        }
        if (start) {
            EditStart()
        }
        setEdit(false)
    }
    const EditEnd = () => {
        handleEnd(index)
    }
    const EditStart = () => {
        handleStart(index)
    }
    const handleClick = () => {
        Linking.openURL('http://maps.google.com/maps?daddr=' + x + ',' + y)
        setCompleted(!completed)
    }
    return (
        <View style={[Styles.checkpointCard,{borderColor: (completed ?  Colors.icon : 'transparent')}]}>

                <View style={{flex: .5}}>
                    <IconButton
                        icon={start ? "play-circle" : "play-circle-outline"}
                        size={20}
                        onPress={EditStart}
                        color={Colors.icon}
                    />
                    <IconButton
                        icon={end ? "flag" : "flag-checkered"}
                        size={20}
                        onPress={EditEnd}
                        color={Colors.icon}
                    />
                </View>

            <View style={{flex: 2}}>
                {
                    edit ?
                        <View>
                            <SearchInput
                                text={text}
                                setText={setText}
                                coordinates={coordinates}
                                setCoordinates={setCoordinates}
                                buttons={false}
                            />
                        </View>

                        :
                        <TouchableOpacity
                            onPress={handleClick}
                            onLongPress={async () => { await Clipboard.setString(title); handlePopup('COPIÉ !'); setCompleted(!completed) }}
                        >
                            <Text style={Styles.checkpointText}>{title.split(",").join("\n")}</Text>
                        </TouchableOpacity>
                }
            </View>

            <View style={{flex: .5, alignItems: 'flex-end'}}>
                <IconButton
                    icon={edit ? "cancel" : "delete-outline"}
                    size={20}
                    onPress={edit ? CancelEdit : () => handleDelete(index)}
                    color={Colors.icon}
                />
                <IconButton
                    icon={edit ? "checkbox-marked-circle-outline" : "circle-edit-outline"}
                    size={20}
                    onPress={edit ? ConfirmEdit : StartEdit}
                    color={Colors.icon}
                />
            </View>
        </View>
    )
};

export default CheckpointCard;