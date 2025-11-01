import { Button, Flex } from "@mantine/core";
import { CommentHtml } from "./comment";
import useGetComments from "../hook/useGetComments";
import { useState } from "react";

export default function CommentList({ memeId }: { memeId: string }) {
  const { data } = useGetComments(memeId);
  const [visibleCount, setVisibleCount] = useState(5);

  const comments = data || [];
  const hasMore = comments.length > visibleCount;
  const visibleComments = comments.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <Flex
      w={{ base: "95%", xs: "90%", sm: "80%", md: "75%", lg: "70%", xl: "65%" }}
      direction={"column"}
      gap={"md"}
      p={{ base: "sm", xs: "md", sm: "lg", md: "xl" }}
    >
      {visibleComments.map((comment) => (
        <CommentHtml key={comment.id} comment={comment} />
      ))}

      {hasMore && (
        <Button variant="subtle" color="gray" onClick={loadMore} mt="xs">
          Load more comments ({comments.length - visibleCount} left)
        </Button>
      )}
    </Flex>
  );
}
