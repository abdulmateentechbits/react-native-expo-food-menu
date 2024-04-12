import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products';
import { PizzaSize, Product } from '@/src/types';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import Button from '@/src/components/Button';
import { useCart } from '@/src/Provider/CartProvider';
import { FontAwesome } from '@expo/vector-icons';

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];


const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCart();
  const router = useRouter();

  const product = products.find((item: Product) => item.id.toString() === id);
  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");

  }
  if (!product) {
    return <Text>Product Not Found</Text>
  }


  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: "Menu",
        headerRight: () => (
          <Link href={`/(admin)/menu/create?id=${id}`} asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="pencil"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        )
      }} />
      <Stack.Screen options={{ title: `${product.name}` }} />
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.tint,
  }
})