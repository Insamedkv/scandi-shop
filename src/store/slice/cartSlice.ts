import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductAttributes, ProductPrices } from '../../utility/generalInterfaces';

export interface CartStoreState {
  cart: CartValues[],
}

export interface CartValues {
  brand: string,
  gallery: string[],
  description: string,
  id: string;
  inStock: boolean,
  name: string,
  prices: ProductPrices[],
  attributes: ProductAttributes[],
  category: string,
  amount?: number,
  itemIds?: string[],
}

export interface RemoveProduct {
  itemsIds: string[],
  productId: string,
}

const initialState: CartStoreState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartValues>) => {
      const newItemsIds: string[] = [];
      let isNewItem = true;
      action.payload.attributes.map((attribute) => newItemsIds.push(attribute.items[0].id));
      state.cart.forEach((cartProduct) => {
        if (cartProduct.id === action.payload.id && cartProduct.itemIds?.join() === newItemsIds.join()) {
          (cartProduct.amount)!++;
          isNewItem = false;
        }
      });

      if (isNewItem) {    
        state.cart.push({...action.payload, itemIds: newItemsIds, amount: 1});
      }
    },

    removeProduct: (state, action: PayloadAction<RemoveProduct>) => {
      state.cart.forEach((cartProduct, index) => {
        if (cartProduct.id === action.payload.productId && cartProduct.itemIds?.join() === action.payload.itemsIds.join()) {
          if (cartProduct.amount === 1) state.cart.splice(index, 1);
          (cartProduct.amount)!--;
        }
      });
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice;
