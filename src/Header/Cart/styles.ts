import { keyframes, styled } from "@stitches/react";
import * as Dialog from "@radix-ui/react-dialog";

export const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});
export const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

export const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: "#000000a6", // blackA.blackA6
  position: "fixed",
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});
export const DialogContent = styled(Dialog.Content, {
  backgroundColor: "$gray2",
  borderRadius: "6px", // 6
  boxShadow:
    "0px 10px 38px -10px rgba(0, 0, 0, 0.35), 0px 10px 20px -15px rgba(0, 0, 0, 0.2)", // hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px
  position: "absolute",
  top: "0",
  right: "0",
  width: "480px",
  height: "100%",
  paddingTop: "72px",
  paddingLeft: "49px",
  overflowY: "auto",

  zIndex: "10",
});
export const DialogTitle = styled(Dialog.Title, {
  fontWeight: "bold",
  fontSize: "20px",
  color: "$gray5",
  marginBottom: "50px",
});

export const Button = styled("button", {
  background: "blue",
  fontSize: "$xl",

  border: "0",
  borderRadius: "8px",

  width: "385px",
  height: "70px",
  backgroundColor: "$principal",

  cursor: "pointer",

  "&:hover": {
    background: "$light",
  },
});

export const Products = styled("div", {
  marginBottom: "40px",
  marginTop: "30px",
  flexDirection: "column",
  display: "grid",
  gridTemplateColumns: "120px 250px",
});

export const Label = styled("label", {
  fontSize: "15px", // 15
  color: "#aa68ca", // violet.violet11
  width: "90px", // 90
  textAlign: "right",
});

export const QuanityContainer = styled("div", {
  marginBottom: "75px",
});
export const FinisheCartContainer = styled("div", {
  marginTop: "100px",
  marginBottom: "50px",
  paddingRight: "45px",
});
export const QuantityItems = styled("div", {
  alignItems: "end",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "15px",

  label: {
    fontSize: "$md",
  },
  div: {
    fontSize: "$lg",
  },
});
export const Total = styled("div", {
  alignItems: "end",
  display: "flex",
  justifyContent: "space-between",
  fontWeight: "bold",

  label: {
    fontSize: "$xl",
  },
  div: {
    fontSize: "$2xl",
  },
});
export const Description = styled("div", {
  div: {
    marginBottom: "15px",
  },
  label: {},
  button: {
    border: "0",
    background: "none",
    display: "flex",
    marginTop: "15px",
    color: "$principal",
    fontSize: "$md",

    cursor: "pointer",

    "&:hover": {
      color: "$light",
    },
  },
});

export const CartProductImage = styled("div", {
  width: "6.3125rem",
  height: "5.8125rem",
  background: "linear-gradient(180deg, #1EA483 0%, #7465D4 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 8,

  img: {
    objectFit: "cover",
  },
});
export const Icon = styled("div", {
  position: "relative",
  top: "15px",
  right: "-35px",
  backgroundColor: "$principal",
  color: "white",
  fontSize: "14px",
  paddingTop: "2px",

  zIndex: "1",

  width: "20px",
  height: "20px",

  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
});

export const IconNull = styled("div", {
  position: "relative",
  top: "15px",
  right: "-35px",
  backgroundColor: "transparent",
  color: "white",
  fontSize: "14px",
  paddingTop: "2px",

  zIndex: "1",

  width: "20px",
  height: "20px",

  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
});
