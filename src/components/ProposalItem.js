import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { Styles } from '../Styles'

const ProposalItem = ({ handlePress, fetchDetails, description, place_id, clearSearch }) => {
    return (
        <TouchableOpacity style={Styles.result} onPress={() => handlePress(place_id, fetchDetails, clearSearch)}>
            <Text>{description}</Text>
        </TouchableOpacity>
    )
}

export default ProposalItem