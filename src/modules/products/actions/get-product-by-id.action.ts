import { tesloApi } from "@/api/tesloAip"
import { getProductImageActions } from "./get-product-image.action";
import type { Product } from "../interfaces/product.interface";

export const getProductById = async(productId: string) => {
  //TODO: PENSAR LA CREACION DE UN NUEVO PRODUCTO

  try {
    const { data } = await tesloApi.get<Product>(`/products/${productId}`);

    console.log({data});


    return {
      ...data,
      images: data.images.map(getProductImageActions),
    }

  } catch (error) {
    console.log(error);
    throw new Error(`Error al obtener el producto con id ${productId}`)
  }
}
