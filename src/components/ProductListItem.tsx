import { Image, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { Product } from '../types';
import { Link, useSegments } from 'expo-router';

type ProductListItemProps = {
    product: Product
}

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

const ProductListItem = ({ product }: ProductListItemProps) => {
    const segments = useSegments();
    return (
        <Link href={(segments? `/${segments[0]}/menu/${product.id}` : '') as any} asChild>
            <Pressable style={styles.container}>
                <Image
                    source={{ uri: product.image || defaultPizzaImage }}
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>

            </Pressable>
        </Link>
    )
}

export default ProductListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 20,
        maxWidth: '50%'
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 100,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    }
});
