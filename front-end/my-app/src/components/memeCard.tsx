import {
  Card,
  Text,
  Group,
  Avatar,
  Badge,
  ActionIcon,
  Flex,
  Center,
  Box,
  Divider,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import type { Meme } from "../types/Meme.type";
import { useNavigate } from "react-router-dom";
import MemeButtons from "./memeButtons";
import { getColorFromId } from "../utils/getColor";
import { useState } from "react";

interface MemeCardProps {
  isMemePage: boolean;
  meme: Meme;
}

export default function MemeCard({ meme, isMemePage = false }: MemeCardProps) {
  const userVote = meme.votes?.[0]?.voteType;
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  return (
    <Card
      bg={isHovered ? "dark.6" : "dark.7"}
      padding="xs"
      onClick={() => {
        if (!isMemePage) navigate(`/home/archive/${meme.id}`);
      }}
      w={
        isMemePage
          ? { base: "100%", sm: "90%" }
          : { base: "100%", xs: "90%", sm: "85%", md: "80%", xl: "80%" }
      }
      style={{
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
        cursor: isMemePage ? "default" : "pointer",
      }}
      onMouseEnter={() => !isMemePage && setIsHovered(true)}
      onMouseLeave={() => !isMemePage && setIsHovered(false)}
    >
      <Group gap="xs" wrap="wrap" mb={"xs"}>
        {isMemePage && (
          <ActionIcon
            radius="xl"
            variant="default"
            color="gray"
            onClick={() => {
              navigate("/home/archive");
            }}
          >
            <IconArrowLeft></IconArrowLeft>
          </ActionIcon>
        )}
        <Avatar
          src={null}
          alt={meme.user?.username}
          color={getColorFromId(meme.userId)}
          radius="xl"
          size="sm"
        >
          {meme.user?.username?.charAt(0).toUpperCase()}
        </Avatar>
        <Center>
          <Text size="sm" fw={500}>
            {meme.user?.username || "Anonymous"}
          </Text>
        </Center>
        <Center>
          <Text size="xs" c="dimmed">
            {new Date(meme.createdAt).toLocaleDateString("it-IT")}
          </Text>
        </Center>
      </Group>

      <Box
        mt="xs"
        mb={"xs"}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          maxHeight: "700px",
        }}
      >
        <img
          src={meme.cloudinaryImageUrl}
          alt={meme.title}
          style={{
            maxWidth: "100%",
            maxHeight: "clamp(350px, 60vh, 700px)",
            height: "auto",
            objectFit: "contain",
            borderRadius: "10px",
          }}
        />
      </Box>

      <Text
        fw={700}
        fz={{ base: "lg", xs: "xl", sm: "1.5rem", md: "1.75rem", lg: "2rem" }}
        lineClamp={1}
      >
        {meme.title}
      </Text>

      <Text
        fz={{ base: "xs", xs: "sm", sm: "md", md: "lg" }}
        c="dimmed"
        lineClamp={2}
      >
        {meme.description}
      </Text>

      <Divider mt="xs" w={"100%"}></Divider>

      <Flex
        direction={"row"}
        mt={"md"}
        ml={isMemePage ? 0 : "xs"}
        justify={isMemePage ? "center" : "flex-start"}
        wrap="nowrap"
        gap="xs"
      >
        <Group gap="xs" wrap="wrap">
          {meme.tags.map((tag) => (
            <Badge key={tag.id} color={getColorFromId(tag.id)} variant="light">
              {tag.name}
            </Badge>
          ))}
        </Group>
        <MemeButtons
          isMemePage={isMemePage}
          memeId={meme.id}
          userVote={userVote}
        />
      </Flex>
    </Card>
  );
}
