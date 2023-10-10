import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import { globalStyles } from "@/styles/global";

import { Container } from "@/styles/pages/app";

import Image from "next/image";
import Header from "@/Header";
import { CartContextProvider } from "@/context/Cartcontext";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

globalStyles();
export default function App({ Component, pageProps }: AppProps) {

  return (
    <CartContextProvider>
      <Container>
        <Header />

        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  );
}
