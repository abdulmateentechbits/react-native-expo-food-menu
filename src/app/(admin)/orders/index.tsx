import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { FlatList } from "react-native";
import { Text } from "react-native-paper";


export default function OrderScreen() {
    return (
        <FlatList
         data={orders}
         renderItem={({item})=><OrderListItem order={item} />}
         contentContainerStyle={{gap:10,padding:10}}
        />
    )
}