import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';


import React, {useEffect, useState} from "react";
import BottomBar from "./components/Layout/BottomBar";
import Cam from './components/Cam';
import StartupScreen from './components/StartupScreen';
import Calendar from "./components/Calendar";


import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from '@tensorflow-models/coco-ssd';


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LogBox } from 'react-native';

import ItemsIcon from "./assets/ItemsIcon.png";
import MarketIcon from "./assets/MarketIcon.png";
import CameraIcon from "./assets/CameraIcon.png";


// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();


const initialiseTensorflow = async () => {
  await tf.ready();
  tf.getBackend();
}
;


export default function App() {
  
  const [tab, setTab] = useState("calendar");
  const [net, setNet] = useState(null);

  useEffect(() => {
    (async () => {
      // initialise Tensorflow
      await initialiseTensorflow();
      // load the model
      setNet(await cocoSsd.load());
    })();
  }, []);

  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      {!net ? 
      <StartupScreen/> 
      :
      <View style={styles.main}> 
      <NavigationContainer> 
        <Tab.Navigator
          initialRouteName={"Scan"}
          screenOptions={({ route }) => ({
            tabBarIcon: () => {
              if (route.name === "Items") {
                return <Image style={{borderRadius: 20, width: 40, height: 40}} source={ItemsIcon}></Image>
              } else if (route.name === "Scan") {
                return <Image style={{ width: 40, height: 40}} source={CameraIcon}></Image>
              } else {
                return <Image style={{borderRadius: 20, width: 40, height: 40}} source={MarketIcon}></Image>
              }

            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle:{height: 100},    

          })}
      
        >
          <Tab.Screen name="Items" component={Calendar} />
          <Tab.Screen name="Scan">
            {(props) => <Cam {...props} net={net} />}
          </Tab.Screen>
          <Tab.Screen name="Market" component={Calendar}/>
        </Tab.Navigator>
      </NavigationContainer>
      </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width: "100%",
    height: "100%"
  }
});
