import {
  Card,
  Text,
  Image,
  Group,
  Avatar,
  Badge,
  ActionIcon,
  Paper,
  Flex,
  Center,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import type { Meme } from "../types/Meme.type";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import MemeButtons from "./memeButtons";

interface MemeCardProps {
  isMemePage: boolean;
  meme: Meme;
}

const MANTINE_COLORS = [
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "lime",
  "yellow",
  "orange",
  "green",
];

const getColorFromId = (id: string): string => {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return MANTINE_COLORS[hash % MANTINE_COLORS.length];
};

export default function MemeCard({ meme, isMemePage = false }: MemeCardProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const userVote = meme.votes?.[0]?.voteType;

  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        if (!isMemePage) {
          navigate(`/home/archive/${meme.id}`);
        }
      }}
      shadow="md"
      padding="xs"
      w={
        isMemePage
          ? "100%"
          : { base: "100%", xs: "90%", sm: "85%", md: "80%", xl: "80%" }
      }
      radius={isMobile || isMemePage ? 0 : "md"}
      withBorder={isMemePage ? false : true}
      style={{
        cursor: isMemePage ? "auto" : "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
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
      <Text fw={600} fs={{ base: "md", sm: "lg" }} lineClamp={1}>
        {meme.title}
      </Text>
      <Text size="sm" c="dimmed" lineClamp={2} mb="xs">
        {meme.description}
      </Text>
      <Card.Section>
        <Paper p="xs" withBorder shadow="lg">
          <Image
            src={meme.cloudinaryImageUrl}
            h={{ base: 300, xs: 350, sm: 400, md: 450, xl: 650 }}
            fit="contain"
            alt={meme.title}
          />
        </Paper>
      </Card.Section>

      <Flex direction={"row"} mt={"md"}>
        <Group gap="xs" wrap="wrap">
          {meme.tags.map((tag) => (
            <Badge key={tag.id} color={getColorFromId(tag.id)} variant="light">
              {tag.name}
            </Badge>
          ))}
        </Group>
        <MemeButtons memeId={meme.id} userVote={userVote}></MemeButtons>
      </Flex>
    </Card>
  );
}
