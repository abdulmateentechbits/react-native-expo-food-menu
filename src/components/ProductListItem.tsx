import { Image, StyleSheet } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';

const ProductListItem = ({product}) => {
  console.log("🚀 ~ ProductListItem ~ props:", product)
 
  return (
    <View style={styles.container}>
      <Image source={{uri:product.image}} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  )
}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
   backgroundColor:"white",
   padding:10,
   borderRadius:20
  },
  image:{
    width: "100%",
    aspectRatio:1,
    borderRadius: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical:10
  },
  price:{
    color:Colors.light.tint,
    fontWeight: 'bold',
  }
});
