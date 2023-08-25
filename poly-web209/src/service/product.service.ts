import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../model";

const productAPI = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    fetchProduct: builder.query<IProduct[], void>({
      query: () => "/products/",
      providesTags: ["product"],
    }),
    getProductById: builder.query<IProduct, number | string>({
      query: (id) => `/products/${id}`,
      providesTags: ["product"],
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: "/products/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    addProduct: builder.mutation({
      query: (product: IProduct) => ({
        url: "/products/",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: (product: IProduct) => ({
        url: `/products/${product.id}`,
        method: "PATCH",
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
  useUpdateProductMutation,
  useGetProductByIdQuery,
} = productAPI;
export default productAPI;
