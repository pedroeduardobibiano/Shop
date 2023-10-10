import { styled } from "../styles";

export const ArrowButton = styled("button", {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "8.5rem",
  height: "40%",
  background:'transparent',
  cursor: "pointer",
  border: "none",
  outline: "none",
  color: "$white",
  fill: "$white",
  padding: "0 1rem",


  variants: {
      direction: {
          left: {
              left: 8,
              textAlign: "left",
          },
          right: {
              right: 0,
              textAlign: "right",
              background:'transparent',
          },
      },
      disabled: {
          true: {
              opacity: 0.5,
          },
      },
  },
});