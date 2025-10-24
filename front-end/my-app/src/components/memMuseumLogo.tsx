import { Center, Flex } from "@mantine/core";
import { Logo } from "./logo.svg";

export default function MemeMuseumLogo() {
  return (
    <>
      <Flex direction="column" w="100%">
        <Center>
          <Logo width={80} height={80}></Logo>
        </Center>
        <Center>
          <span
            style={{
              color: "#862e9c",
              fontWeight: 800,
              fontStyle: "italic",
              fontSize: "1.8rem",
            }}
          >
            Meme
          </span>
          <span
            style={{
              color: "#5f3dc4",
              fontWeight: 400,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.15em",
              fontSize: "1.8rem",
            }}
          >
            Museum
          </span>
        </Center>
      </Flex>
    </>
  );
}
