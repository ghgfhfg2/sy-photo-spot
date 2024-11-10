import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";

const GlobalStyle = createGlobalStyle`

@font-face {
	font-family: 'Pretendard Variable';
	font-weight: 45 920;
	font-style: normal;
	font-display: swap;
	src: url('../fonts/PretendardVariable.woff2') format('woff2-variations');
}


html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
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

.chakra-checkbox .chakra-checkbox__control {
  border:1px solid  ${colors.BLACK_600};
}

//기본 마커 대체 썸네일
.thumbnail-marker{
  border-radius: .25rem;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  object-fit: cover;
  object-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

`;

export default GlobalStyle;
