import Image from "next/image";
import { HeaderContainer } from "./styles";
import logoImg from "../assets/Logo.svg";
import Cart from "./Cart";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/Cartcontext";

export default function Header() {
  const { cartQuantity } = useContext(CartContext);

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>
      <Cart />
    </HeaderContainer>
  );
}
