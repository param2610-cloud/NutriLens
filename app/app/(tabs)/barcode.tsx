import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'

const scanner = () => {
  return (
    <View style={styles.parent}>
      <View style={styles.barcode}>
        <Text style={{color:"white"}}>
          <Button title="Barcode" onPress={()=>{
            router.push("../camera")
          }}>

          </Button>
        </Text>
      </View>
      <View style={styles.nutrient}>
        <Text>
        <Button title="Nutrient List" onPress={()=>{
            router.push("../camera2")
          }}>

          </Button>
        </Text>
      </View>
    </View>
  )
}

export default scanner
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
  },
  barcode: {
    height: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 20,
  },
  barcodeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  nutrient: {
    flex: 1,
    padding: 20,
  },
  nutrientText: {
    fontSize: 18,
    marginBottom: 10,
  },
});