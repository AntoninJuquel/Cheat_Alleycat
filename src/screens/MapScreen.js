import React from 'react';
import { View } from 'react-native';
import { FAB } from "react-native-paper";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

import { Styles } from '../Styles';

const MapScreen = ({ route, navigation }) => {
    const { markers } = route.params
    return (
        <View style={Styles.container}>
            <MapView
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
                    markers.map(marker => (
                        <Marker
                            key={marker[0]}
                            coordinate={{ latitude: marker[1][0], longitude: marker[1][1] }}
                            title={marker[0]}
                        />
                    ))
                }
                <Polyline
                    coordinates={markers.map(marker => (
                        {
                            latitude: marker[1][0],
                            longitude: marker[1][1]
                        }
                    ))}
                    strokeColor="#000"
                    strokeWidth={3}
                />

            </MapView>
            <FAB
                    style={{ position: "absolute", left: "5%",top: "5%", backgroundColor: 'red' }}
                    icon="arrow-left"
                    small
                    color='white'
                    onPress={() => {
                        navigation.navigate("Home")
                    }}
                />
        </View>
    )
}

export default MapScreen;