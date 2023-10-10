import { CartContext, IProduct } from "@/context/Cartcontext";
import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Stripe from "stripe";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  const { CheckIfItemAlreadyExists, addToCart } = useContext(CartContext);

  if (isFallback) {
    return <p>loading...</p>;
  }

  const itemAlreadyInCart = CheckIfItemAlreadyExists(product.id);

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>

          <button
            disabled={itemAlreadyInCart}
            onClick={() => addToCart(product)}
          >
            {itemAlreadyInCart
              ? "produto já esta no carrinho"
              : "Colocar na sacola"}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_OfGMvCaerP4Kwb" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  if (price && price.unit_amount !== null) {
    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          price: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price?.unit_amount / 100), // Corrigido para dividir por 100
          numberPrice: price.unit_amount /100,
          description: product.description,
          defaultPriceId: price.id,
        },
      },
      revalidate: 60 * 60 * 1, // 1 hour
    };
  } else {
    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          price: 0, // Corrigido para dividir por 100
          description: product.description,
          defaultPriceId: price.id,
        },
      },
      revalidate: 60 * 60 * 1, // 1 hour
    };
  }
};
