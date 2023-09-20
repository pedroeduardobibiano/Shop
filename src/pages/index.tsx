import { HomeContainer, Product } from "@/styles/pages/home";

import { useKeenSlider } from "keen-slider/react";

import { useEffect, useState } from "react";
import camiseta1 from "../assets/1.png";
import camiseta2 from "../assets/2.png";
import camiseta3 from "../assets/3.png";

import "keen-slider/keen-slider.min.css";

import Image from "next/image";
import { Arrow } from "@/utils/arrow";
import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
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
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} alt="" width={520} height={480} />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
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
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
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
        }).format(price?.unit_amount / 100), // Corrigido para dividir por 100
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
  };
};
