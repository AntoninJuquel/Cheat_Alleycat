import React, { useState } from 'react';
import { View, FlatList, Linking } from 'react-native';
import { Button, Dialog, FAB, Paragraph, Portal } from "react-native-paper";

import { Colors, Styles } from '../Styles';
import { GetAllPossiblePaths, GetFastestPath, ClearPathList } from '../functions/PathFindind'

import CheckpointCard from '../components/CheckpointCard'
import SearchInput from '../components/SearchInput';
import Popup from '../components/Popup';

const HomeScreen = ({ navigation }) => {
    const [update, setUpdate] = useState(false)

    const [text, setText] = useState('');
    const [coordinates, setCoordinates] = useState([]);

    const [number, setNumber] = useState(0);

    const [start, setStart] = useState([]);
    const [end, setEnd] = useState([]);

    const [checkpoints, setCheckpoints] = useState([]);

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

        const clone = checkpoints.slice()
        const newList = clone;

        newList.push([text, coordinates])

        setCheckpoints(newList)
        setNumber(newList.length)
        setText("")
        setCoordinates([])
    }
    const UpdateCheckpoint = (index, value, coordinates) => {
        const clone = checkpoints.slice()
        const newList = clone;
        newList[index] = [value, coordinates]
        setCheckpoints(newList)
        setNumber(newList.length)
        setUpdate(!update)
    }
    const DeleteCheckpoint = (index) => {
        const clone = checkpoints.slice()
        const newList = clone;
        newList.splice(index, 1)
        setCheckpoints(newList)
        setNumber(newList.length)
    }
    const ResetCheckpoints = () => {
        ClearPathList()
        setCheckpoints([])
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
        setStart(checkpoints[index])
    }

    const GetEnd = (index) => {
        if (index > number) {
            HandlePopup("Ajoute des checkpoints !")
            return
        }
        setEnd(checkpoints[index])
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


        GetAllPossiblePaths(checkpoints, start, end)
        setCheckpoints(GetFastestPath())
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
            {
                number > 0 &&
                <View style={Styles.checkpointsList}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={checkpoints}
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
                    />
                </View>
            }

            <Portal>
                <Dialog visible={dialogVisible} onDismiss={hideDialog} style={{backgroundColor: Colors.foregroundColor}}>
                    <Dialog.Title style={{color: Colors.textColor}}>ATTENTION</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={{color: Colors.textColor}}>Supprimer tous les checkpoints ?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog} color={Colors.iconColor}>Annuler</Button>
                        <Button onPress={ResetCheckpoints} color={Colors.iconColor}>Confirmer</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <View style={[Styles.container, Styles.header]}>
                <SearchInput
                    text={text}
                    setText={setText}
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                    addCheckpoint={CreateCheckpoint}
                    buttons={true}
                />
            </View>

            <View style={[Styles.container, Styles.row, Styles.footer]}>
                <FAB
                    style={{ position: "absolute", left: "5%", backgroundColor: Colors.cancel }}
                    icon="close"
                    small
                    onPress={showDialog}
                    color={Colors.textColor}
                />
                <FAB
                    style={{ backgroundColor: Colors.confirm }}
                    icon="check"
                    onPress={FindBestPath}
                />
                <FAB
                    style={{ position: "absolute", right: "5%", backgroundColor: Colors.map }}
                    icon="arrow-right"
                    small
                    color={Colors.textColor}
                    onPress={() => {
                        navigation.navigate("Map", {
                            markers: checkpoints
                        })
                    }}
                />
            </View>

            {popup !== '' && <Popup text={popup} />}
        </View>
    );
}
export default HomeScreen;