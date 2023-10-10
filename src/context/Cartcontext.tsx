import { ReactNode, createContext } from "react";

import { useState } from "react";

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
}

interface CartContextData {
  cartItems: IProduct[];
  addToCart: (product: IProduct) => void;
  CheckIfItemAlreadyExists: (productId: string) => boolean;
  RemoveCart: (product: string) => void;
  cartTotal: number;
  cartQuantity: number;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const cartQuantity = cartItems.length;

  const cartTotal = cartItems.reduce((total, product) => {
    return total + product.numberPrice;
  }, 0);

  function addToCart(product: IProduct) {
    setCartItems((state) => [...state, product]);
  }

  function RemoveCart(productId: string) {
    setCartItems((state) => state.filter((item) => item.id !== productId));
  }

  function CheckIfItemAlreadyExists(productId: string) {
    return cartItems.some((product) => product.id === productId);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        CheckIfItemAlreadyExists,
        RemoveCart,
        cartTotal,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
