import { Avatar, Divider, Flex, Loader, Text } from "@mantine/core";
import MemeCard from "../components/memeCard";
import { useParams } from "react-router-dom";
import { useGetMeme } from "../hook/useGetMeme";
import { useAuthContext } from "../context/authContext";
import { getColorFromId } from "../utils/getColor";
import { FloatingLabelInput } from "../components/floatingLabel";
import CommentList from "../components/commentList";


export default function MemePage() {
  const { user } = useAuthContext();
  const { id } = useParams<{ id: string }>();
  const { isError, isLoading, data, error } = useGetMeme(id!, user?.id);

  if (isLoading)
    return (
      <Flex w={"100%"} h={"100vh"} justify={"center"} align={"center"}>
        <Loader size="lg" />
      </Flex>
    );

  if (!data || isError) return <Text c="red">Errore: {error?.message}</Text>;

  return (
    <Flex w="100%" direction={"column"} align={"center"} gap={"xs"}>
      <MemeCard meme={data} isMemePage={true}></MemeCard>
      <Divider orientation="horizontal" w={"100%"}></Divider>

      <Flex
        direction={"row"}
        gap={"md"}
        w={{
          base: "95%",
          xs: "90%",
          sm: "80%",
          md: "75%",
          lg: "75%",
          xl: "65%",
        }}
        mt={"lg"}
        mb={"lg"}
        align={"center"}
      >
        <Avatar
          src={null}
          alt={user?.username}
          color={getColorFromId(user?.id || "1")}
          radius="xl"
          size="md"
        >
          {user?.username.charAt(0).toUpperCase() || ""}
        </Avatar>

        <FloatingLabelInput memeId={data.id}></FloatingLabelInput>
      </Flex>

      <CommentList memeId={data.id}></CommentList>
    </Flex>
  );
}
