import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@font-face {
	font-family: 'Pretendard Variable';
	font-weight: 45 920;
	font-style: normal;
	font-display: swap;
	src: url('../fonts/PretendardVariable.woff2') format('woff2-variations');
}


  *, *::before, *::after {
    box-sizing: border-box;
  }
  html,body,#root{
  font-family:'Pretendard Variable';
  font-weight:400;
  width:100%;height:100%;
  font-size:14px;
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

.leaflet-tile {
  image-rendering: crisp-edges; /* 크리스프한 엣지를 사용하여 렌더링 품질 개선 */
  image-rendering: pixelated;   /* 픽셀화된 이미지를 사용하여 렌더링 품질 개선 */
}

`;

export default GlobalStyle;
