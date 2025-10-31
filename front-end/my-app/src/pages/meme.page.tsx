import { Center, Flex, Loader, Text } from "@mantine/core";
import MemeCard from "../components/memeCard";
import { useParams } from "react-router-dom";
import { useGetMeme } from "../hook/useGetMeme";
import { useAuthContext } from "../context/authContext";

export default function MemePage() {
  const { user } = useAuthContext();
  const { id } = useParams<{ id: string }>();
  const { isError, isLoading, data, error } = useGetMeme(id!, user?.id);

  if (isLoading)
    return (
      <Flex w={"100%"} h={"100%"}>
        <Center>
          <Loader />
        </Center>
      </Flex>
    );

  if (!data || isError) return <Text c="red">Errore: {error?.message}</Text>;

  return (
    <Flex w="100%" direction={"column"} bg="#25262b">
      <MemeCard meme={data} isMemePage={true}></MemeCard>
    </Flex>
  );
}
