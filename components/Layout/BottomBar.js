import { StyleSheet, Button, Text, View } from 'react-native';


export default function BottomBar(props) {

    const {setTab, navigation, ...rest} = props;

    return (
        <View style={styles.container}>
            <Button title="Calendar" style={styles.button} onPress={()=>  navigation.navigate("Calendar")}> 
                <Text style={{color: "white"}}> 
                    Calendar 
                </Text>
            </Button>
            <Button  title="Camera" style={styles.button} onPress={()=> navigation.navigate("Camera")}> 
                <Text style={{color: "white"}} > 
                    Camera
                </Text>
            </Button>
            <Button title="Market" style={styles.button} onPress={()=> navigation.navigate("Market")}> 
                <Text style={{color: "white"}} > 
                    Market
                </Text>
            </Button>
        </View>
    )
 
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'blue',
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-evenly',
        bottom: 0,
        height: 100,
    },
    button: {
        color:"white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }
});
  