import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Loading: { q: string };
};

type LoadingScreenRouteProp = RouteProp<RootStackParamList, 'Loading'>;

const Loading = () => {
  console.log("triggered");
  const [Stage, UpdateStage] = useState<number>(0);
  const router = useRoute<LoadingScreenRouteProp>();
  const { q } = router.params;
  const [productName, setProductName] = useState<string>("");
  const [productLink, setProductLink] = useState<string>("");
  const [imageLink, setImageLink] = useState<string>("");
  const [Details, setDetails] = useState<string>("");
  
  useEffect(() => {
    let isMounted = true;
    async function fetchProductName() {
      try {
        const response = await fetch(`http://192.168.0.158:8080/getProductNameFromUpc?barcode=${q}`);
        if (response.ok) {
          const data = await response.json();
          setProductName(data.Name);
          console.log(data);
          UpdateStage(i => i + 1);
        } else {
          console.error('Error fetching Product name: ', response.statusText);
        }
      } catch (error) {
        console.log("error Fetching Product Name ", error);
      }
    }
    if(q){
      fetchProductName();
    }
      return ()=>{
        isMounted =false;
      };
  }, [q]);

  useEffect(() => {
    let isMounted = true;
    async function fetchProductLink() {
      if (!productName) return;
      
      try {
        const response = await fetch(`http://192.168.0.158:8080/getProductLink?product=${productName}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setProductLink(data.link);
        } else {
          console.error('Error fetching Product Link: ', response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductLink();
    return ()=>{
      isMounted =false;
    };
  }, [productName]);
  
  useEffect(() => {
    let isMounted = true;
    async function fetchImageLink() {
      if (!productLink) return; 
      
      try {
        const response = await fetch(`http://192.168.0.158:8080/getProduct_image_Link?productLink=${productLink}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setImageLink(data.imgSrc); 
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchImageLink();
    return ()=>{
      isMounted =false;
    };
  }, [productLink]);
  useEffect(() => {
    let isMounted = true;
    async function fetchImageDetails() {
      if (!imageLink) return; 
      
      try {
        const response = await fetch(`http://192.168.0.158:8080/getProduct_details?imageLink=${imageLink}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setDetails(data); 
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchImageDetails();
    return ()=>{
      isMounted =false;
    };
  }, [imageLink]);

  return (
    <View>
      <Text>Loading...</Text>
      <Text>{q}</Text>
      <Text>Product Name: {productName}</Text>
      <Text>Product Link: {productLink}</Text>
      <Text>Product image link: {imageLink}</Text>
      <Image src={imageLink} style={styles.ProductImage}/>
      {Details && (
        <View>
          <Text>Product Details: {JSON.stringify(Details)}</Text>
        </View>
      )}
    </View>
  );
};

export default Loading;


const styles = StyleSheet.create({
  ProductImage: {
    width: 200,
    height: 200,
  }
})