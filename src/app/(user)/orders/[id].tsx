import orders from "@/assets/data/orders";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";

export default function OrderDetailScreen() {
    const { id } = useLocalSearchParams();
    const order = orders.find(order => order.id.toString() === id);

    if (!order) {
        return (
            <Text>Order not found</Text>
        )
    }
    return (
        <View style={{ padding: 10, gap: 20 }}>
            <Stack.Screen options={{ title: `Order #${id}` }} />
           
            <FlatList data={order?.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={()=> <OrderListItem order={order} />}
            />
        </View>
    )
}