

import { StyleSheet, View, Text, Image, Dimensions, ScrollView} from 'react-native';
import cookie from '../assets/cookie.jpeg';

export default function StartupScreen(props) {

    return (
        <ScrollView style={styles.container}>
            <View style={styles.subHeader}> 
                <Text style={styles.subHeaderText}> 
                    Recently Added
                </Text>
            </View>

            <View style={styles.gridView}> 
                <View style={styles.card}> 
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={cookie}></Image>
                </View>

                <View style={styles.card}> 
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={cookie}></Image>
                </View>
            </View>

            <View style={styles.subHeader}> 
                <Text style={styles.subHeaderText}> 
                    All Items
                </Text>
            </View>

            <View style={styles.gridView}> 
                <View style={styles.card}> 
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={cookie}></Image>
                </View>

                <View style={styles.card}> 
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={cookie}></Image>
                </View>
                <View style={styles.card}> 
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={cookie}></Image>
                </View>
                <View style={styles.card}> 
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={cookie}></Image>
                </View>
                <View style={styles.card}> 
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={cookie}></Image>
                </View>
                <View style={styles.card}> 
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={cookie}></Image>
                </View>
            </View>
            
        </ScrollView>
    )

};

const rows = 3;
const cols = 2;
const marginHorizontal = 4;
const width = (Dimensions.get('window').width / cols) - (marginHorizontal * (cols + 1));


const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: "100%",
        width: "100%"
    },
    subHeader: {
        marginTop: 20, 
        marginLeft: 20,
        marginBottom: 20
    },
    subHeaderText: {
        color: "black",
        fontSize: 20
    },
    gridView:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'left',
        alignItems: 'left',
    },
    card: {
        borderRadius: 20,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 6,
        marginRight: 4,
        width: width,
        height: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
})