import { supabase } from "@/src/lib/supabase";
import { Product } from "@/src/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProductLists = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data, error } = await supabase.from("products").select("*");
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }
    })
}

export const useProduct = (id: number) => {
    return useQuery<Product>({
        queryKey: ['product', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

// use create product
export const useInsertProduct = () => {
    return useMutation({
        async mutationFn(data:any){
            const { data:datas, error } = await supabase
               .from('products')
               .insert({
                name:data.name,
                price:data.price,
                image:data.image,
               })
               .single();
            if (error) {
                throw new Error(error.message);
            }
            return datas;
        }
    });
}