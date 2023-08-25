import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../IProduct";

const productAPI = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    //list
    fetchProduct: builder.query<IProduct[], void>({
      query: () => "/products",
      providesTags: ["product"],
    }),

    // xóa
    removeProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    //thêm
    addProduct: builder.mutation<IProduct, Partial<IProduct>>({
        query: (product) => ({
            url: "/products",
            method: "POST",
            body: product,
        }),
        invalidatesTags: ["product"]
    }),

    //Sửa
    updateProduct: builder.mutation<IProduct, Partial<IProduct>>({
        query: (product) => ({
            url: `/products/${product.id}`,
            method: "PUT",
            body: product,
        }),
        invalidatesTags: ["product"],
    }),
  }),
});

export const { 
    useFetchProductQuery, 
    useRemoveProductMutation,
    useAddProductMutation,
    useUpdateProductMutation
} = productAPI;
export default productAPI;
