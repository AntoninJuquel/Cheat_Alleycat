import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper'
import { GoogleAutoComplete } from 'react-native-google-autocomplete'

import ProposalItem from './ProposalItem'

import { API_KEY } from '../../key'
import { Styles } from '../Styles'

const SearchInput = ({ text, setText, coordinates, setCoordinates, addCheckpoint, buttons }) => {

    const textChange = (callback, value, clearSearch) => {
        setText(value)
        callback(value)
        if (value.length == 0) {
            clearSearch()
        }
    }

    const handlePress = async (place_id, fetch, description, callback) => {
        const res = await fetch(place_id)

        setText(description)
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
                                        icon="close-box-outline"
                                        size={20}
                                        onPress={() => { clearSearch(); setText("") }}
                                    />
                                    :
                                    null
                            }


                            <TextInput
                                style={[Styles.searchInput, { width: (buttons ? 300 : 250), fontSize: (buttons ? 13 : 10) }]}
                                value={text}
                                onChangeText={text => textChange(handleTextChange, text, clearSearch)}
                                placeholder="Location..."
                            />


                            {
                                buttons ?
                                    <IconButton
                                        icon="plus-box-outline"
                                        size={20}
                                        onPress={addCheckpoint}
                                    />
                                    :
                                    null
                            }
                        </View>

                        <ScrollView style={{ maxHeight: 200 }}>
                            {locationResults.map((el, i) => (
                                <ProposalItem
                                    {...el}
                                    fetchDetails={fetchDetails}
                                    handlePress={handlePress}
                                    clearSearch={clearSearch}
                                    key={String(i)}
                                />
                            ))}
                        </ScrollView>


                    </React.Fragment>
                )}
            </GoogleAutoComplete>
    )
}

export default SearchInput