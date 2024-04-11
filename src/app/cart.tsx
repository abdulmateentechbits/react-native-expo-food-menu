import { FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { CartContext, useCart } from '../Provider/CartProvider';
import CartListItem from '../components/CartListItem';

const CartScreen = () => {
    const { items } = useCart();
    console.log("🚀 ~ ProductDetailScreen ~ items:", items)
    return (
        <View>
            <FlatList data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{
                    padding: 10,
                    gap: 10
                }}
            />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({})