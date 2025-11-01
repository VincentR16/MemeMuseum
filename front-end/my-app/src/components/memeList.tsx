import { Divider, Flex, Loader, Stack, Text } from "@mantine/core";
import { useInViewport } from "@mantine/hooks";
import useInfiniteMeme from "../hook/useInfiniteMeme";
import useInfiniteSearchMeme from "../hook/useInfiniteSearchMeme";
import { useEffect } from "react";
import MemeCard from "./memeCard";

interface MemeListProps {
  searchTags?: string;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  filterbyRate: boolean;
}

export default function MemeList({
  searchTags = "",
  dateFrom = null,
  dateTo = null,
  filterbyRate,
}: MemeListProps) {
  const { ref, inViewport } = useInViewport();
  const sortBy = filterbyRate ? "votes" : "date";

  const normalQuery = useInfiniteMeme({ sortBy });
  const searchQuery = useInfiniteSearchMeme({
    tags: searchTags,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    sortBy,
  });

  const hasSearchParams = searchTags.trim().length > 0 || dateFrom || dateTo;
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = hasSearchParams ? searchQuery : normalQuery;

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
        No meme found...
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
            <>
              <MemeCard meme={meme} key={meme.id} isMemePage={false} />
              <Divider mb={3} mt={3} w={"100%"}></Divider>
            </>
          ))}
        </Stack>
      ))}

      <div ref={ref} style={{ height: "1px", margin: "3px" }} />

      {isFetchingNextPage && <Loader />}
    </Flex>
  );
}
