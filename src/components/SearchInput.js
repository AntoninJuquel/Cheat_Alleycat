import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
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
        <GoogleAutoComplete apiKey={API_KEY} debounce={500} minLength={3} components="country:fr">
            {({ handleTextChange, locationResults, fetchDetails, clearSearch }) => (
                <React.Fragment>
                    <View style={Styles.row}>
                        {
                            buttons ?
                                <IconButton
                                    icon="close-circle-outline"
                                    size={30}
                                    onPress={() => { clearSearch(); setText("") }}
                                    color={Colors.iconColor}
                                />
                                :
                                null
                        }


                        <TextInput
                        mode='outlined'
                            style={[Styles.searchInput, { width: (buttons ? 300 : 250), fontSize: (buttons ? 13 : 10) }]}
                            value={text}
                            onChangeText={text => textChange(handleTextChange, text, clearSearch)}
                            placeholder="Location..."
                            underlineColor={Colors.foregroundColor}
                            selectionColor={Colors.foregroundColor}
                            underlineColorAndroid={Colors.foregroundColor}
                        />


                        {
                            buttons ?
                                <IconButton
                                    icon="plus-circle-outline"
                                    size={30}
                                    onPress={addCheckpoint}
                                    color={Colors.iconColor}
                                />
                                :
                                null
                        }
                    </View>

                    <ScrollView style={{ maxHeight: 200 }}>
                        {locationResults.map((el, i) =>
                            (
                                <ProposalItem
                                    {...el}
                                    fetchDetails={fetchDetails}
                                    handlePress={handlePress}
                                    clearSearch={clearSearch}
                                    key={String(i)}
                                />
                            )
                        )}
                    </ScrollView>


                </React.Fragment>
            )}
        </GoogleAutoComplete>
    )
}

const ProposalItem = ({ handlePress, fetchDetails, description, place_id, clearSearch }) => {
    return (
        <TouchableOpacity style={Styles.result} onPress={() => handlePress(place_id, fetchDetails, clearSearch)}>
            <Text style={{color: Colors.textColor}}>{description}</Text>
        </TouchableOpacity>
    )
}

export default SearchInput