import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Button,
  CartProductImage,
  Description,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  FinisheCartContainer,
  Icon,
  IconNull,
  Products,
  QuanityContainer,
  QuantityItems,
  Total,
} from "./styles";
import Image from "next/image";

import axios from "axios";

import { useContext } from "react";
import { CartButton } from "../CartButton";
import { CartContext } from "@/context/Cartcontext";

export default function Cart() {
  const { cartItems, RemoveCart, cartTotal } = useContext(CartContext);

  const [isLoadding, setIsLoadding] = useState(false);

  const { cartQuantity } = useContext(CartContext);

  const formattedCartTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartTotal);

  async function handleCheckout() {
    try {
      setIsLoadding(true);

      const response = await axios.post("/api/checkout", {
        products: cartItems,
      });
      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (err) {
      setIsLoadding(false);
      alert("Falha ao redirecionar ao cechkout");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div>
          {cartQuantity === 0 ? (
            <IconNull>{""}</IconNull>
          ) : (
            <Icon>{cartQuantity}</Icon>
          )}
          <CartButton />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay className="DialogOverlay" />
        <DialogContent className="DialogContent">
          <DialogTitle className="DialogTitle">Sacola de Compras</DialogTitle>

          {cartQuantity <= 0 && <p>Parece que seu carrinho esta vazio :(</p>}
          {cartItems.map((item) => {
            return (
              <>
                <Products key={item.id}>
                  <CartProductImage>
                    <Image src={item.imageUrl} width={100} height={95} alt="" />
                  </CartProductImage>
                  <Description>
                    <div>{item.name}</div>
                    <label>{item.price}</label>
                    <button onClick={() => RemoveCart(item.id)}>Remover</button>
                  </Description>
                </Products>
              </>
            );
          })}

          <FinisheCartContainer>
            <QuanityContainer>
              <QuantityItems>
                <label>Quantidade</label>
                <div>
                  {cartQuantity} {cartQuantity < 1 ? "item" : "itens"}
                </div>
              </QuantityItems>
              <Total>
                <label>Valor Total</label>
                <div>{formattedCartTotal}</div>
              </Total>
            </QuanityContainer>
            <Dialog.Close asChild>
              <Button
                onClick={handleCheckout}
                disabled={isLoadding || cartQuantity <= 0}
              >
                Finalizar Compra
              </Button>
            </Dialog.Close>
          </FinisheCartContainer>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
