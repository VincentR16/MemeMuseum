import { ActionIcon, Box, Center, TextInput } from "@mantine/core";
import MemeList from "../components/memeList";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

export default function ArchivePage() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return (
    <>
      <Box
        w="100%"
        style={{
          position: "sticky",
          top: isMobile ? 50 : 0,
          backgroundColor: "rgb(24, 24, 24)",
          zIndex:  isMobile ? 99 : 200,
          paddingTop:  isMobile ? "0.5rem" : "1rem",
          paddingBottom: isMobile ? "0.7rem" : "1rem",
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        <Center w={"100%"}>
          <TextInput
            w={{ base: "95%", xs: "85%", sm: "75%", md: "70%", lg: "60%" }}
            radius={"xl"}
            size="md"
            pos={"sticky"}
            placeholder="Search tags"
            rightSectionWidth={42}
            leftSection={<IconSearch size={18} stroke={1.5} />}
            rightSection={
              <ActionIcon
                size={32}
                radius="xl"
                color="violet.9"
                variant="filled"
              >
                <IconArrowRight size={18} stroke={1.5} />
              </ActionIcon>
            }
          />
        </Center>
      </Box>
      <MemeList></MemeList>
    </>
  );
}
