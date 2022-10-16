import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet,Platform, View,TouchableWithoutFeedback,Image, Text, Dimensions, ActivityIndicator} from 'react-native';
import { Camera } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Buffer } from 'buffer'
import * as ImageManipulator from 'expo-image-manipulator';

const TensorCamera = cameraWithTensors(Camera);

export default function Cam(props) {

    const {net, ...rest} = props
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [predictions, setPredictions] = useState([])

    const cameraRef = useRef();


    useEffect(() => {
        (async () => {
          const cameraStatus = await Camera.requestCameraPermissionsAsync();
          setHasCameraPermission(cameraStatus.status === 'granted');
    })();
      }, []);

  
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }


    const [interpolatedBbox, setInterpolatedBbox] = useState([])


    const fps = 60;
    
    const handleCameraStream =(imageTensors) => {
        let counter = 0;
        let numPredict = 0;
        let prevBbox = []
        let currBbox = []
        let detectionFrequency = 8
        const loop = async () => {
            counter += 1
            if(net) {
                if (counter % detectionFrequency === 0) {
                    const nextImageTensor = imageTensors.next().value;
                    if(nextImageTensor) {
                        const predictions = await net.detect(nextImageTensor);   
                        if (predictions.length > 0) {

                            numPredict += 1     
                            setPredictions(predictions)
                            if (numPredict === 0) {
                                prevBbox = predictions[0].bbox
                            } else if (numPredict === 1) {
                                currBbox = predictions[0].bbox
                            } else {
                                prevBbox = currBbox
                                currBbox = predictions[0].bbox
                            }
                            tf.dispose([nextImageTensor]);
                        } else {
                            prevBbox = []
                            currBbox = []
                            counter = 0
                            numPredict = 0
                        }
                        
                    }
                } 
                         
                    if (numPredict > 1) {
                            let x = (prevBbox[0] + currBbox[0]) / detectionFrequency 
                            let y = (prevBbox[1] + currBbox[1]) / detectionFrequency
                            let width = (prevBbox[2] + currBbox[2]) / detectionFrequency
                            let height = (prevBbox[3] + currBbox[3]) / detectionFrequency
    
                            let start = interpolatedBbox
                        
                            if (start.length <= 0) {
                                setInterpolatedBbox(currBbox)
                            } else {
                                setInterpolatedBbox([start[0] + x, start[1] + y, start[2] + width,  start[3] + height])
                            }
                        
                        
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


    const [loading, setLoading] = useState(false)

    const handleItemScan = async () => {
        setLoading(true)
        if (cameraRef) {
            const data = await cameraRef.current.camera.takePictureAsync({base64:true});
            const result = await ImageManipulator.manipulateAsync(
                data.uri, 
                [{crop: ({
                    height: (predictions[0].bbox[3] * 4042) / 200,
                    originX: (predictions[0].bbox[0] * 2376) / 152,
                    originY: (predictions[0].bbox[1] * 4042) / 200, 
                    width: (predictions[0].bbox[2] * 2376) / 152,
                })}],
                {base64:true}
            )
            
            const base64 = result.base64

        }

        setLoading(false)
        
    }

    return (
        <View style={{ flex: 1}}>

            <View style={styles.cameraContainer}>
                {loading && <ActivityIndicator style={{zIndex: 100, position: "absolute", top: 10, left: 20}} size="large" color="#ffffff" />}
                {/* {imageUri && <Image style={{zIndex: 100, width:300, height:300, flex:1, position: "absolute", top: 10, left: 20}} source={{ uri: `data:image/jpg;base64, ${imageUri}` }} />} */}

                {interpolatedBbox.length > 0 &&    
                    <TouchableWithoutFeedback onPress={handleItemScan}>
        
                    <View style={{
                            zIndex: 100, 
                            borderColor: "yellow",
                            borderWidth: 1,
                            top: transferCoord(interpolatedBbox[1], 'top'), 
                            left: transferCoord(interpolatedBbox[0], 'left'), 
                            position:"absolute", 
                            width:  transferCoord(interpolatedBbox[2], 'left'),
                            height: transferCoord(interpolatedBbox[3], 'top'), 
                            // backgroundColor: "rgba(255, 0, 0, 0.4)",
                        }}> 
                        <Text>
                            {predictions[0].class}
                        </Text>
                    </View>
                    </TouchableWithoutFeedback>
                }

            <TensorCamera 
                ref={cameraRef}
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