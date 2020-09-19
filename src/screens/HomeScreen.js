import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Button, Dialog, Text, Paragraph, Portal, TouchableRipple } from "react-native-paper";

import { Colors, Styles } from '../Styles';
import { GetAllPossiblePaths, GetFastestPath, ClearPathList } from '../functions/PathFindind'
import { useGlobalState } from "../providers/Checkpoints";

import CheckpointCard from '../components/CheckpointCard'
import SearchInput from '../components/SearchInput';
import Popup from '../components/Popup';
import MyButton from "../components/MyButton";

const HomeScreen = ({ navigation, route }) => {
    const [update, setUpdate] = useState(false)

    const [text, setText] = useState('');
    const [coordinates, setCoordinates] = useState([]);

    const [number, setNumber] = useState(0);

    const [start, setStart] = useState([]);
    const [end, setEnd] = useState([]);

    const [state, dispatch] = useGlobalState();

    const [popup, setPopup] = useState('');

    const [dialogVisible, setDialogVisible] = React.useState(false);

    const showDialog = () => setDialogVisible(true);

    const hideDialog = () => setDialogVisible(false);

    // CRUD Checkpoints
    const CreateCheckpoint = () => {
        if (text == "") {
            HandlePopup("Entre une adresse")
            return;
        }
        if (coordinates && coordinates.length == 0) {
            HandlePopup("Adresse non trouvée")
            return;
        }

        const clone = state.checkpoints.slice()
        const newList = clone;

        newList.push([text, coordinates])

        dispatch({ checkpoints: newList })
        setNumber(newList.length)
        setText("")
        setCoordinates([])
    }
    const UpdateCheckpoint = (index, value, coordinates) => {
        const clone = state.checkpoints.slice()
        const newList = clone;
        newList[index] = [value, coordinates]
        dispatch({ checkpoints: newList })
        setNumber(newList.length)
        setUpdate(!update)
    }
    const DeleteCheckpoint = (index) => {
        const clone = state.checkpoints.slice()
        const newList = clone;
        newList.splice(index, 1)
        dispatch({ checkpoints: newList })
        setNumber(newList.length)
    }
    const ResetCheckpoints = () => {
        ClearPathList()
        dispatch({ checkpoints: [] })
        setEnd([])
        setStart([])
        setText("")
        setCoordinates([])
        setNumber(0)
        hideDialog()
    }

    // Final setup functions

    const GetStart = (index) => {
        if (index < 0) {
            HandlePopup("WTF")
            return
        }
        setStart(state.checkpoints[index])
    }

    const GetEnd = (index) => {
        if (index > number) {
            HandlePopup("Ajoute des checkpoints !")
            return
        }
        setEnd(state.checkpoints[index])
    }

    const FindBestPath = () => {
        if (number == 0) {
            HandlePopup("Ajoute des checkpoints !")
            return;
        }

        if (start && start.length == 0) {
            HandlePopup("Choisis un départ !")
            return;
        }

        if (end && end.length == 0) {
            HandlePopup("Choisis une arrivée !")
            return;
        }

        if (start == end) {
            HandlePopup("Le départ doit être différent de l'arrivée !")
            return;
        }


        GetAllPossiblePaths(state.checkpoints, start, end)
        dispatch({ checkpoints: GetFastestPath() })
        ClearPathList()
    }

    const HandlePopup = (text) => {
        setPopup(text)
        setTimeout(() => {
            setPopup('')
        }, 1000);
    }



    return (
        <View style={Styles.container}>
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={hideDialog} style={{ backgroundColor: Colors.foreground }}>
                    <Dialog.Title style={{ color: Colors.text }}>ATTENTION</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={{ color: Colors.text }}>Supprimer tous les checkpoints ?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog} color={Colors.icon}>Annuler</Button>
                        <Button onPress={ResetCheckpoints} color={Colors.icon}>Confirmer</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <View style={Styles.header}>
                <SearchInput
                    text={text}
                    setText={setText}
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                    addCheckpoint={CreateCheckpoint}
                    buttons={true}
                />
            </View>

            <View style={Styles.checkpointsList}>
                {
                    number > 0 &&
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={state.checkpoints}
                        renderItem={({ item, index }) =>
                            <CheckpointCard
                                index={index}
                                title={item[0]}
                                x={item[1][0]}
                                y={item[1][1]}
                                end={item[0] == end[0]}
                                start={item[0] == start[0]}
                                handleDelete={DeleteCheckpoint}
                                handleEdit={UpdateCheckpoint}
                                handleEnd={GetEnd}
                                handleStart={GetStart}
                                handlePopup={HandlePopup}
                            />}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={{ height: 3 }}></View>}
                    />
                }
            </View>

            <View style={Styles.footer}>
                <MyButton style={{ flex: 1, height: '100%', backgroundColor: Colors.cancel, borderRadius: 5}} color={Colors.text} onPress={showDialog} text='ANNULER' />
                <View style={{ flex: .1 }}></View>
                <MyButton style={{ flex: 4, height: '100%', backgroundColor: Colors.icon, borderRadius: 5 }} onPress={FindBestPath} text='GO' />
            </View>

            <Popup style={{ position: "absolute", bottom: "20%",left:50,right:50 }} visible={popup != ''} text={popup} />
        </View>
    );
}
export default HomeScreen;