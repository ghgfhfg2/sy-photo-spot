import { Spinner, SpinnerProps } from "@chakra-ui/react";
import React from "react";
interface LoadingProps {
  size: SpinnerProps["size"];
}
export default function Loading({ size }: LoadingProps): React.ReactElement {
  return (
    <>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="blue.200"
        color="blue.500"
        size={size}
      />
    </>
  );
}
