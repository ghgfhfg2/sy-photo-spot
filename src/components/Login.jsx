import React, { useEffect, useLayoutEffect } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  Text,
  Container,
  VStack,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import backgroundImg from "../assets/login-back-image.png";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { ref, set } from "firebase/database";
import { createRandomNick } from "../utils/randomNick";
import { useStore } from "../store/store";

const BackgroundBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  background-size: 400% 400%;
  z-index: 0;
`;
const BackgroundImage = styled(Box)`
  width: 90vw;
  height: 0;
  padding-bottom: 75%;
  max-width: 500px;
  position: absolute;
  bottom: 90%;
  left: 50%;
  z-index: -1;
  transform: translateX(-50%);
  background: url(${(props) => props.image}) center no-repeat;
  background-size: contain;
`;

function Login() {
  const userInfo = useStore((state) => state.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.uid) {
      navigate("/");
    }
  }, [userInfo]);

  const googleHandler = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      //const credential = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential.accessToken;
      const user = result.user;
      const randomNick = createRandomNick();
      set(ref(db, `users/${user.uid}`), {
        uid: user.uid,
        nick: randomNick,
        date_regis: new Date().getTime(),
      });
      navigate("/");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <Box
      position="relative"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      {/* Animated background */}
      <BackgroundBox />
      <Container zIndex="1" maxW="md">
        <VStack
          spacing={8}
          p={8}
          bg="white"
          rounded="md"
          position="relative"
          shadow="md"
        >
          <BackgroundImage image={backgroundImg} />
          <Heading>Welcome Back</Heading>
          <Stack spacing={4} w="100%">
            <Button
              leftIcon={<FcGoogle />}
              colorScheme="purple"
              variant="outline"
              w="100%"
              onClick={googleHandler}
            >
              구글 로그인
            </Button>
            <Input placeholder="Email" variant="filled" />
            <Input placeholder="Password" type="password" variant="filled" />
            <Button colorScheme="purple" w="100%">
              로그인
            </Button>
            <Text>
              아직 회원이 아니신가요?{" "}
              <Button colorScheme="purple" variant="link">
                회원가입
              </Button>
            </Text>
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
}

export default Login;
