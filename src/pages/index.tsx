import { HomeContainer, Product } from "@/styles/pages/home";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";

import Head from "next/head";

import { useContext, useState } from "react";

import "keen-slider/keen-slider.min.css";

import Image from "next/image";
import { Arrow } from "@/utils/arrow";
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import { CartButton } from "@/Header/CartButton";
import { CartContext, IProduct } from "@/context/Cartcontext";

interface HomeProps {
  products: IProduct[];
}

export default function Home({ products }: HomeProps) {
  const { addToCart, CheckIfItemAlreadyExists } = useContext(CartContext);

  function handleAddToCart(
    e: React.MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) {
    e.preventDefault();
    addToCart(product);
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    // outras configuraçoes de sua preferência, como na aula
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      perView: 2.5,
      spacing: 40,
    },
  });

  return (
    <>
      <Head>
        <title>Home | IgniteShop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product
              as={Link}
              key={product.id}
              href={`/product/${product.id}`}
              className="keen-slider__slide"
              prefetch={false}
            >
              <Image src={product.imageUrl} alt="" width={520} height={480} />
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                  <CartButton
                     disabled={CheckIfItemAlreadyExists(product.id)}
                    color={"green"}
                    size={"large"}
                    onClick={(e) => handleAddToCart(e, product)}
                  />
                </div>
              </footer>
            </Product>
            
          );
        })}
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    if (price && price.unit_amount !== null) {
      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price?.unit_amount / 100),
        numberPrice: price.unit_amount / 100, // Corrigido para dividir por 100
        defaultPriceId: price.id,
      };
    } else {
      // Trate o caso em que price ou price.unit_amount é null conforme necessário.
      // Pode ser um valor padrão ou uma manipulação de erro adequada.
      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: 0, // Ou outro valor padrão apropriado.
      };
    }
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
