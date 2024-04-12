import { FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { CartContext, useCart } from '../Provider/CartProvider';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';

const CartScreen = () => {
    const { items, total } = useCart();

    return (
        <View style={{ padding: 10 }}>
            <FlatList data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{
                    gap: 10
                }}
            />
            {
                total > 0 ? (
                    <>
                        <Text style={styles.totalText}>Total: ${total}</Text>
                        <Button text='Checkout' onPress={() => { }} />
                    </>
                ) : null
            }

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    totalText: {
        fontSize: 20,
        fontWeight: '500',
        marginVertical: 10,
    },
})