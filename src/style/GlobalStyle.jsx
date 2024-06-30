import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html,body,#root{
  width:100%;height:100%;
  }


  h2, p {
    margin: 0;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }

  .leaflet-div-icon {
  background: transparent;
  border: none;
}
`;

export default GlobalStyle;
