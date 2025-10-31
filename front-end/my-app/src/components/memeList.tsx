import { Center, Flex, Loader, Stack, Text } from "@mantine/core";
import { useInViewport, useMediaQuery } from "@mantine/hooks";
import useInfiniteMeme from "../hook/useInfiniteMeme";
import { useEffect } from "react";
import MemeCard from "./memeCard";

export default function MemeList() {
  const isMobile = useMediaQuery("(max-width: 766px)");
  const { ref, inViewport } = useInViewport();
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteMeme();

  useEffect(() => {
    if (inViewport && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inViewport, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending")
    return (
      <Flex w={"100%"} h={"100%"}>
        <Center>
          <Loader />
        </Center>
      </Flex>
    );

  if (status === "error") return <Text c="red">Errore: {error.message}</Text>;

  return (
    <Flex w="100%" direction="column" align="center">
      {data?.pages.map((page) => (
        <Stack
          mt={isMobile ? 0 : "xs"}
          key={page.pagination.currentPage}
          align="center"
          gap={isMobile ? 0 : "xs"}
          w="100%"
        >
          {page.memes.map((meme) => (
            <MemeCard meme={meme} key={meme.id} isMemePage={false} />
          ))}
        </Stack>
      ))}

      <div ref={ref} style={{ height: "1px", margin: "3px" }} />

      {isFetchingNextPage && <Loader />}
    </Flex>
  );
}
