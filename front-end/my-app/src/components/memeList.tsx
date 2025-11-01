import { Divider, Flex, Loader, Stack, Text } from "@mantine/core";
import { useInViewport } from "@mantine/hooks";
import { Fragment, useEffect } from "react";
import MemeCard from "./memeCard";
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import type { PaginatedMeme } from "../types/paginatedMeme.type";

interface MemeListProps {
  query: UseInfiniteQueryResult<InfiniteData<PaginatedMeme, unknown>, Error>;
  emptyMessage?: string;
}

export default function MemeList({
  query,
  emptyMessage = "No meme found...",
}: MemeListProps) {
  const { ref, inViewport } = useInViewport();

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = query;

  useEffect(() => {
    if (inViewport && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inViewport, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending")
    return (
      <Flex w={"100%"} h={"100vh"} justify={"center"} align={"center"}>
        <Loader size="lg" />
      </Flex>
    );

  if (status === "error") return <Text c="red">Errore: {error.message}</Text>;

  if (data?.pages[0]?.memes.length === 0)
    return (
      <Flex
        w={"100%"}
        mt={"xl"}
        h={"100%"}
        justify={"center"}
        direction={"row"}
      >
        {emptyMessage}
      </Flex>
    );

  return (
    <Flex w="100%" direction="column" align="center">
      {data?.pages.map((page) => (
        <Stack
          mt={0}
          key={page.pagination.currentPage}
          align="center"
          gap={0}
          w="100%"
        >
          {page.memes.map((meme) => (
            <Fragment key={meme.id}>
              <MemeCard meme={meme} key={meme.id} isMemePage={false} />
              <Divider mb={3} mt={3} w={"100%"}></Divider>
            </Fragment>
          ))}
        </Stack>
      ))}

      <div ref={ref} style={{ height: "1px", margin: "3px" }} />

      {isFetchingNextPage && <Loader />}
    </Flex>
  );
}
