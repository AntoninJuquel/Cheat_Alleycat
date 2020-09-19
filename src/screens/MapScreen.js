import React from 'react';
import { View } from 'react-native';
import { FAB } from "react-native-paper";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

import { Colors, MapStyle, Styles } from '../Styles';
import { useGlobalState } from "../providers/Checkpoints";

const MapScreen = ({ navigation }) => {
    const [state, dispatch] = useGlobalState();

    return (
        <View style={Styles.container}>
            <MapView
                customMapStyle={MapStyle}
                provider={PROVIDER_GOOGLE}
                style={Styles.map}
                region={{
                    latitude: 48.8534,
                    longitude: 2.3488,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}
            >
                {
                    state.checkpoints.map((marker,i) => (
                        <Marker
                            key={String(i)}
                            coordinate={{ latitude: marker[1][0], longitude: marker[1][1] }}
                            title={marker[0]}
                        />
                    ))
                }
                <Polyline
                    coordinates={state.checkpoints.map(marker => (
                        {
                            latitude: marker[1][0],
                            longitude: marker[1][1]
                        }
                    ))}
                    strokeColor={Colors.text}
                    strokeWidth={3}
                />

            </MapView>
        </View>
    )
}

export default MapScreen;