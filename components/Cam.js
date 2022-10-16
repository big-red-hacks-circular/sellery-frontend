import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

import React, { useState, useEffect } from 'react';
import { StyleSheet,Platform, View, Text, Dimensions} from 'react-native';
import { Camera } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TensorCamera = cameraWithTensors(Camera);

export default function Cam(props) {

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
    const fps = 5;

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
           setTimeout(() => {
            requestAnimationFrame(loop);
           },1000 / fps)
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
    const insets = useSafeAreaInsets();

    const transferCoord = (c, type) => {
        let val;
        if (type === "left") {
            val = (c * windowWidth) / 152
        } else {
            val = (c * (windowHeight - 100 - insets.top - insets.bottom ) ) / 200
        }
        return val
        
    }

    return (
        <View style={{ flex: 1}}>

            <View style={styles.cameraContainer}>
            {predictions.length > 0 &&            
                // predictions.map( (prediction, i) => ( 
                    <View style={{
                        zIndex: 100, 
                        top: transferCoord(predictions[0].bbox[1], 'top'), 
                        left: transferCoord(predictions[0].bbox[0], 'left'), 
                        position:"absolute", 
                        width:  transferCoord(predictions[0].bbox[2], 'left'),
                        height: transferCoord(predictions[0].bbox[3], 'right'), 
                        backgroundColor: "rgba(255, 0, 0, 0.4)",
                    }}> 
                    <Text>
                        {predictions[0].class}
                    </Text>
                    </View>
                // ))
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