import { StyleSheet } from 'react-native';

export const Colors = {
    white: '#FFF',
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF',
    pink: '#f9c2ff'
}

export const Styles = StyleSheet.create({
    // View
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    input: {
        width: 250,
        borderColor: 'gray',
        borderWidth: 1
    },
    footer: {
        position: 'absolute',
        bottom: "2.5%",
        width: '100%'
    },
    header: {
        position: 'absolute',
        top: "5%",
    },
    checkpointsList: {
        marginVertical: 65,
        width: "100%"
    },
    checkpointCard: {
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    center:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Text
    checkpointText: {
        fontSize: 14,
    },
    result: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: "center"
    },
    map: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    // Input
    searchInput: {
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 16,
    },
});
