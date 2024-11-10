import styled from "styled-components";

const MapStyled = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  .btn-container {
    position: relative;
    display: flex;
    align-items: center;
    z-index: 500;
    padding-bottom: 2rem;
  }
  .save-pointer-box {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    z-index: 400;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    .info-txt {
      background: rgba(0, 0, 0, 0.5);
      padding: 10px;
      border-radius: 7px;
    }
  }
`;

export { MapStyled };
