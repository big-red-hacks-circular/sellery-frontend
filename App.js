import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


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
          screenOptions={{
            tabBarStyle:  { height: 100 }

          }}
        >
          <Tab.Screen name="Calendar" component={Calendar} />
          <Tab.Screen name="Camera">
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
