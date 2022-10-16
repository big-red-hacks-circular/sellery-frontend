

import { StyleSheet, View, Text, Image, Dimensions, ScrollView} from 'react-native';
import cookie from '../assets/cookie.jpeg';
export default function StartupScreen() {

    return (
        <ScrollView style={styles.container}>
            <View style={styles.subHeader}> 
                <Text style={styles.subHeaderText}> 
                    Recently Added
                </Text>
            </View>

            <View style={styles.gridView}> 
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.card}> 
                    <Text style={{marginBottom: 10, fontWeight: "600"}}>
                        Cookie
                    </Text>
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={cookie}></Image>
                    <View style={{marginTop: 10,display:"flex", flexDirection: "row"}}> 
                        <Text style={{marginRight:4, fontWeight: "600"}}>
                            Expires in:
                        </Text>
                        <Text style={{color: "red"}}>
                            10 days
                        </Text>
                    </View>
                    <Text>
                        Fridge
                    </Text>
                    
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
                </ScrollView>
            </View>

            <View style={styles.subHeader}> 
                <Text style={styles.subHeaderText}> 
                    Expiring Soon 
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
        width: "100%",
        backgroundColor: "#F9F3DF"
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
        height: width + 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
})