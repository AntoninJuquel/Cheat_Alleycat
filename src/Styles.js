import { StyleSheet } from 'react-native';

export const Colors = {
  cancel: '#d72323',
  confirm: '#a3f7bf',
  map: '#0a91ab',

  background: '#232931',
  foreground: '#393e46',
  backgroundInput: '#dbd8e3',

  icon: '#4ecca3',
  text: '#eeeeee'
}

export const Styles = StyleSheet.create({
  // View
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    zIndex: 100,
    backgroundColor: Colors.background,
    justifyContent: "center",
    width: '100%'
  },
  checkpointsList: {
    maxHeight: '82.5%', 
    width: '100%', 
    paddingHorizontal: 10
  },
  checkpointCard: {
    alignItems:'center',
    flexDirection: "row", 
    borderWidth: 1,
    backgroundColor: Colors.foreground
  },
  footer: {
    padding: 5,
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: 'row',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: Colors.background
  },
  separator:{ 
    height: 1, 
    backgroundColor: Colors.text, 
    marginVertical: 10, 
    marginHorizontal: 50 
  },
  // Text
  checkpointText: {
    color: Colors.text,
    fontSize: 14,
  },
  map: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
});
export const MapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]