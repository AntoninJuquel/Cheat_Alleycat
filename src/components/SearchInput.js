import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { TextInput, IconButton, Text } from 'react-native-paper'
import { GoogleAutoComplete } from 'react-native-google-autocomplete'

import { API_KEY } from '../../key'
import { Colors, Styles } from '../Styles'

const SearchInput = ({ text, setText, coordinates, setCoordinates, addCheckpoint, buttons }) => {

    const textChange = (callback, value, clearSearch) => {
        setText(value)
        callback(value)
        if (value.length == 0) {
            clearSearch()
        }
    }

    const handlePress = async (place_id, fetch, callback) => {
        const res = await fetch(place_id)

        setText(res.formatted_address)
        setCoordinates(Object.values(res.geometry.location))
        callback()
    }
    return (
        <GoogleAutoComplete apiKey={API_KEY} debounce={300} minLength={2} components="country:fr">
            {({ handleTextChange, locationResults, fetchDetails, clearSearch }) => (
                <React.Fragment>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            {
                                buttons ?
                                    <IconButton
                                        icon="close-circle-outline"
                                        size={30}
                                        onPress={() => { clearSearch(); setText("") }}
                                        color={Colors.icon}
                                        style={{ flex: .25 }}
                                    />
                                    :
                                    null
                            }

                            <TextInput
                                mode='outlined'
                                style={{ flex: 2.5, height: 40,fontSize: (buttons ? 13 : 10), backgroundColor: Colors.backgroundInput }}
                                value={text}
                                onChangeText={text => textChange(handleTextChange, text, clearSearch)}
                                placeholder="Adresse..."
                                underlineColor={Colors.foreground}
                                selectionColor={Colors.foreground}
                                underlineColorAndroid={Colors.foreground}
                            />

                            {
                                buttons ?
                                    <IconButton
                                        icon="plus-circle-outline"
                                        size={30}
                                        onPress={addCheckpoint}
                                        color={Colors.icon}
                                        style={{ flex: .25 }}
                                    />
                                    :
                                    null
                            }
                        </View>

                        <View style={{ height: (locationResults.length > 0 ? 200 : 0), width: 315}}>
                            <FlatList
                                keyExtractor={(item, index) => index.toString()}
                                data={locationResults}
                                renderItem={({ item, index }) => (
                                    <ProposalItem
                                        {...item}
                                        fetchDetails={fetchDetails}
                                        handlePress={handlePress}
                                        clearSearch={clearSearch}
                                    />
                                )}
                                ItemSeparatorComponent={() => <View style={Styles.separator}></View>}
                            />
                        </View>
                    </View>

                </React.Fragment>
            )}
        </GoogleAutoComplete>
    )
}

const ProposalItem = ({ handlePress, fetchDetails, description, place_id, clearSearch }) => {
    return (
        <TouchableOpacity onPress={() => handlePress(place_id, fetchDetails, clearSearch)}>
            <Text style={{ color: Colors.text }}>{description}</Text>
        </TouchableOpacity>
    )
}

export default SearchInput