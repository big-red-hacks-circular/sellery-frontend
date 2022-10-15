import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

import React, { useState, useEffect } from 'react';
import { StyleSheet,Platform, View, Text, Dimensions} from 'react-native';
import { Camera } from 'expo-camera';
import { useHeaderHeight } from '@react-navigation/elements';

const TensorCamera = cameraWithTensors(Camera);

export default function Cam(props) {
    const headerHeight = useHeaderHeight();


    const {net, ...rest} = props
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [predictions, setPredictions] = useState([])

    useEffect(() => {
        (async () => {
          const cameraStatus = await Camera.requestCameraPermissionsAsync();
          setHasCameraPermission(cameraStatus.status === 'granted');
    })();
      }, []);

  
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    const handleCameraStream =(imageTensors) => {
        
        const loop = async () => {
           if(net) {
              const nextImageTensor = imageTensors.next().value;
             if(nextImageTensor) {
                const predictions = await net.detect(nextImageTensor);          
                setPredictions(predictions)
               tf.dispose([nextImageTensor]);
             }
           }
            requestAnimationFrame(loop);
        }
        loop();
    }

    const textureDims = Platform.OS === 'ios' ?
        {
        height: 1920,
        width: 1080,
        } :
        {
        height: 1200,
        width: 1600,
        };

    const transferCoord = (c, type) => {
        let val;
        if (type === "left") {
            val = (c * windowWidth) / 152
        } else {
            val = (c * windowHeight) / 200
        }
        return val
        
    }
    console.log('predictions', predictions)


    return (
        <View style={{ flex: 1}}>

            <View style={styles.cameraContainer}>
            {predictions.length > 0 &&            
                predictions.map( (prediction, i) => ( 
                    <View style={{
                        zIndex: 100, 
                        top: transferCoord(prediction.bbox[1], 'top'), 
                        left: transferCoord(prediction.bbox[0], 'left'), 
                        position:"absolute", 
                        width: prediction.bbox[2],
                        height: prediction.bbox[3], 
                        backgroundColor: "rgba(255, 0, 0, 0.4)",
                    }}> 
                    <Text>
                        {predictions[0].class}
                    </Text>
                    </View>
                ))
            }

            <TensorCamera 
                style={styles.camera} 
                type={Camera.Constants.Type.back}
                onReady={handleCameraStream}
                resizeHeight={200}
                resizeWidth={152}
                resizeDepth={3}
                autorender={true}
                cameraTextureHeight={textureDims.height}
                cameraTextureWidth={textureDims.width}
            />
            
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: "100%"
    },
    fixedRatio:{
        flex: 1,
        aspectRatio: 0.5
    },
    container: {
        flex: 1,
      },
    camera:{
        zIndex:20, 
        flex: 1,
    },
})