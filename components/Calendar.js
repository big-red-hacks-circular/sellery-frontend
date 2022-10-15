

import { StyleSheet, View, Text} from 'react-native';

export default function StartupScreen(props) {

    return (
        <View style={styles.container}>
            <Text style={{color: "red"}}> 
                Calendar...
            </Text>
        </View>
    )

};


const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent:"center",
        height: "100%",
        width: "100%"
    }
})