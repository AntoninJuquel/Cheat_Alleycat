import React, { useState } from 'react';
import { View, FlatList, Linking } from 'react-native';
import { FAB } from "react-native-paper";

import { Styles } from '../Styles';
import { GetAllPossiblePaths, GetFastestPath, ClearPathList } from '../functions/PathFindind'

import CheckpointCard from '../components/CheckpointCard'
import SearchInput from '../components/SearchInput';

const HomeScreen = ({ navigation }) => {
    const [update, setUpdate] = useState(false)

    const [text, setText] = useState('');
    const [coordinates, setCoordinates] = useState([]);

    const [number, setNumber] = useState(0);

    const [start, setStart] = useState([]);
    const [end, setEnd] = useState([]);

    const [checkpoints, setCheckpoints] = useState([]);

    const [popup, setPopup] = useState(false);

    // CRUD Checkpoints
    const CreateCheckpoint = () => {
        if (text == "") {
            console.log("Enter address")
            return;
        }
        if (coordinates && coordinates.length == 0) {
            console.log("Address not found")
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
    }

    // Final setup functions

    const GetStart = (index) => {
        if (index < 0) {
            console.log("WTF")
            return
        }
        setStart(checkpoints[index])
    }

    const GetEnd = (index) => {
        if (index > number) {
            console.log("You need checkpoints !")
            return
        }
        setEnd(checkpoints[index])
    }

    const FindBestPath = () => {
        if (number == 0) {
            console.log("Add checkpoints !")
            return;
        }

        if (start && start.length == 0) {
            console.log("Choose start first !")
            return;
        }

        if (end && end.length == 0) {
            console.log("Choose end first !")
            return;
        }

        if (start == end) {
            console.log("need diffrent start from end")
            return;
        }


        GetAllPossiblePaths(checkpoints, start, end)
        setCheckpoints(GetFastestPath())
        ClearPathList()
    }

    const HandlePopup = () => {
        setPopup(true)
        setTimeout(() => {
            setPopup(false)
        }, 1000);
    }

    return (
        <View style={Styles.container}>
            {
                number > 0 &&
                <View style={Styles.checkpointsList}>
                    <FlatList
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
            {
                popup &&
                <View style={{ position: "absolute", bottom: "20%" }}>
                    <FAB
                        style={{ backgroundColor: '#eee' }}
                        label='COPIÉ !'
                        disabled
                        small
                        color='black'
                    />
                </View>
            }

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
                    style={{ position: "absolute", left: "5%", backgroundColor: 'red' }}
                    icon="close"
                    small
                    onPress={ResetCheckpoints}
                />
                <FAB
                    style={{ backgroundColor: 'green' }}
                    icon="check"
                    onPress={FindBestPath}
                />
                <FAB
                    style={{ position: "absolute", right: "5%", backgroundColor: 'skyblue' }}
                    icon="arrow-right"
                    small
                    color='white'
                    onPress={() => {
                        navigation.navigate("Map", {
                            markers: checkpoints
                        })
                    }}
                />
            </View>
        </View>
    );
}
export default HomeScreen;