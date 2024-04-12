import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products';
import { PizzaSize, Product } from '@/src/types';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import Button from '@/src/components/Button';
import { useCart } from '@/src/Provider/CartProvider';

const sizes:PizzaSize[] = ["S", "M", "L", "XL"];


const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const {addItem} = useCart();
  const router = useRouter();

  const product = products.find((item: Product) => item.id.toString() === id);
  const addToCart = ()=>{
    if(!product) return;
    addItem(product,selectedSize);
    router.push("/cart");

  }
  if (!product) {
    return <Text>Product Not Found</Text>
  }

 
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${product.name}` }} />
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />
      <View style={styles.sizeWrapper}>
        <Text style={styles.selectSizeText}>Select Size</Text>
        <View style={styles.sizeContainer}>
          {
            sizes.map((size) => (
              <Pressable onPress={() => setSelectedSize(size)} key={size} style={[styles.size, { backgroundColor: selectedSize === size ? 'gainsboro' : "white" }]}>
                <Text style={[styles.sizeText, { color: selectedSize === size ? 'black' : "gray" }]} key={size}>{size}</Text>
              </Pressable>
            ))
          }
        </View>
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text='Add to Cart'/>
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginTop:'auto'
  },
  sizeWrapper: {
    marginTop: 10
  },
  selectSizeText: {

  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  }
})