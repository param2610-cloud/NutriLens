import { Camera, CameraType } from 'expo-camera/legacy';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native';
import {MD3Colors, ProgressBar} from 'react-native-paper'
import { BarcodeScanningResult } from 'expo-camera';
import { router } from 'expo-router';
import slug from './(tabs)/[slug]';


export default function App() {
  //variable declaration
  const [type, setType] = useState(CameraType.back);
  const [inputText, setInputText] = useState('');
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scan, setscan ] = useState<string[]>([])
  const [noofscan, setnoofscan] = useState<number>(0)


// camera permission section start
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  
  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  // end
  
  
  // submit section
  const getMostFrequentBarcode = (barcodes:string[]) =>{
    const frequencyMap: { [key: string]: number } = barcodes.reduce((acc: { [key:string]:number}, barcode:string) => {
      acc[barcode] = (acc[barcode] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(frequencyMap).reduce((a, b) => frequencyMap[a] > frequencyMap[b] ? a : b);
  }


  const handleSubmit = () => {
    console.log('Submitted:', inputText);
    router.push(`/loading?q=${inputText}`)
    setInputText('');
  };


  const postScan = (result:string)=>{
    if(result){
      setnoofscan(i=>i+0.1)
      setscan(prevelement =>{ 
        const update_scans = [...prevelement,result]
        if(update_scans.length === 10){
          const mostFrequentBarcode = getMostFrequentBarcode(update_scans)
          console.log("scanned barcode from camera: ", mostFrequentBarcode)
          try {
            router.push(`/loading?q=${mostFrequentBarcode}`)
          } catch (error) {
            console.log(error)
          }
        }
        return update_scans
      })
    }
  }
  //end

  return (
    <View style={styles.container}>
      <Camera onBarCodeScanned={(result) => postScan(result.data)} style={styles.camera} type={type}>
        {/* Camera View */}
        <View style={styles.buttonContainer}>
          {/* Flip Camera Button */}
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <ProgressBar
          style={styles.progress}
          progress={noofscan}
          color={"green"}
          
        />

        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write Barcode Mannualy"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      position: 'absolute',
      top: 20,
      right: 20,
    },
    button: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 10,
      borderRadius: 5,
    },
    text: {
      color: 'white',
      fontSize: 16,
    },
    inputContainer: {
      position: 'absolute',
      bottom: 2,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:'white',
      width:"100%",
      height:"20%"
      
    },
    input: {
      flex: 1,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 20,
      paddingHorizontal: 10,
      marginRight: 10,
      marginLeft:10,
      height:"40%",
      fontSize:18,
      
    },
    submitButton: {
      backgroundColor: 'blue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginRight:10,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
    progress:{
      height:10,
      
    }
  });