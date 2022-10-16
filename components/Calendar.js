

import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView} from 'react-native';
import cookie from '../assets/cookie.jpeg';
import banana from "../assets/banana.jpeg";
import kellogs from "../assets/kelloggs.jpeg";
import clementine from "../assets/clementine.jpeg";
import { LinearGradient } from 'expo-linear-gradient';

export default function StartupScreen() {


    return (
        <LinearGradient  colors={['#CDF2CA', '#FFFFFF']}>
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
                    <Text style={{marginBottom: 10, fontWeight: "600"}}>
                        Banana
                    </Text> 
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={banana}></Image>
                    <View style={{marginTop: 10,display:"flex", flexDirection: "row"}}> 
                        <Text style={{marginRight:4, fontWeight: "600"}}>
                            Expires in:
                        </Text>
                        <Text style={{color: "red"}}>
                            3 days
                        </Text>
                        
                    </View>
                    <Text>
                        Pantry
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={{marginBottom: 10, fontWeight: "600"}}>
                        Kellogs
                    </Text> 
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={kellogs}></Image>
                    <View style={{marginTop: 10,display:"flex", flexDirection: "row"}}> 
                        <Text style={{marginRight:4, fontWeight: "600"}}>
                            Expires in:
                        </Text>
                        <Text style={{color: "red"}}>
                            2 years
                        </Text>
                        
                    </View>
                    <Text>
                        Pantry
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={{marginBottom: 10, fontWeight: "600"}}>
                        Clementine
                    </Text> 
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={clementine}></Image>
                    <View style={{marginTop: 10,display:"flex", flexDirection: "row"}}> 
                        <Text style={{marginRight:4, fontWeight: "600"}}>
                            Expires in:
                        </Text>
                        <Text style={{color: "red"}}>
                            7 days
                        </Text>
                        
                    </View>
                    <Text>
                        Pantry
                    </Text>
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
                    <Text style={{marginBottom: 10, fontWeight: "600"}}>
                        Banana
                    </Text> 
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={banana}></Image>
                    <View style={{marginTop: 10,display:"flex", flexDirection: "row"}}> 
                        <Text style={{marginRight:4, fontWeight: "600"}}>
                            Expires in:
                        </Text>
                        <Text style={{color: "red"}}>
                            3 days
                        </Text>
                        
                    </View>
                    <Text>
                        Pantry
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={{marginBottom: 10, fontWeight: "600"}}>
                        Kellogs
                    </Text> 
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={kellogs}></Image>
                    <View style={{marginTop: 10,display:"flex", flexDirection: "row"}}> 
                        <Text style={{marginRight:4, fontWeight: "600"}}>
                            Expires in:
                        </Text>
                        <Text style={{color: "red"}}>
                            2 years
                        </Text>
                        
                    </View>
                    <Text>
                        Pantry
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={{marginBottom: 10, fontWeight: "600"}}>
                        Clementine
                    </Text> 
                    <Image style={{borderRadius: 20, width: 120, height: 120}} source={clementine}></Image>
                    <View style={{marginTop: 10,display:"flex", flexDirection: "row"}}> 
                        <Text style={{marginRight:4, fontWeight: "600"}}>
                            Expires in:
                        </Text>
                        <Text style={{color: "red"}}>
                            7 days
                        </Text>
                        
                    </View>
                    <Text>
                        Pantry
                    </Text>
                </View>
            </View>
            
        </ScrollView>
        </LinearGradient>
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
        width: "100%"},
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
        borderRadius: 10,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 6,
        marginRight: 4,
        width: width,
        height: width + 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D3F4D1',
        shadowColor: "black",
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 3,

        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
    }
})