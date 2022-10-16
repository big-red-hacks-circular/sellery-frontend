import { StyleSheet, View,Image, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import logo from "../assets/sellery_logo.png";

export default function StartupScreen(props) {

    return (
        <LinearGradient
            // Background Linear Gradient
            colors={['#CDF2CA', '#FFFFFF']}
            style={styles.container}
        >   
            <Image style={{marginTop: 150}} source={logo}/> 
    
        </LinearGradient>
    )

};


const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: "100%",
        width: "100%"
    }
})