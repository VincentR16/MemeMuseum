import { Center, Flex, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Logo } from "./logo.svg";

export default function MemeMuseumLogo() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const logoSize = isMobile ? 40 : 45;

  return (
    <Flex 
      direction="row" 
      w="100%" 
      justify="center"
      align="center"
      wrap="wrap"
    >
      <Center>
        <span style={{
          color: "var(--mantine-color-violet-7)",
          fontWeight: 800,
          fontStyle: "italic",
          fontSize: "clamp(1.25rem, 5vw, 1.5rem)", 
        }}>
          Meme
        </span>
        <span style={{
          color: "#ced4da",
          fontWeight: 400,
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "0.15em",
          fontSize: "clamp(1.25rem, 5vw, 1.5rem)", 
        }}>
          Museum
        </span>
      </Center>
      <Center>
        <Logo width={logoSize} height={logoSize} />
      </Center>
    </Flex>
  );
}