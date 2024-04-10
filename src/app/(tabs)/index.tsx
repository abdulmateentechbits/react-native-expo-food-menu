
import { View } from '@/src/components/Themed';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';

export default function MenuScreen() {
  return (
    <View style={{}}>
     <ProductListItem product={products[0]} />
    </View>
  );
}
