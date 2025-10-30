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
  Divider,
} from "@mantine/core";
import {
  IconArrowBigDown,
  IconArrowBigDownFilled,
  IconArrowBigUp,
  IconArrowBigUpFilled,
  IconMessageCircle,
} from "@tabler/icons-react";
import type { Meme } from "../types/Meme.type";
import { useMediaQuery } from "@mantine/hooks";
import { VoteType } from "../types/VoteTypesEnum.type";
import { useDownvoteMeme, useUpvoteMeme } from "../hook/useVoteMeme";
import { useRequireAuth } from "../hook/useRequireAuth";

interface MemeCardProps {
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

export default function MemeCard({ meme }: MemeCardProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const userVote = meme.votes?.[0]?.voteType;
  const upvoteMutation = useUpvoteMeme();
  const downvoteMutation = useDownvoteMeme();
  const requireAuth = useRequireAuth();

  return (
    <Card
      shadow="md"
      padding="xs"
      w={{ base: "100%", xs: "90%", sm: "85%", md: "85%", xl: "80%" }}
      radius={isMobile ? 0 : "md"}
      withBorder
      style={{
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <Flex
        direction="row"
        justify="space-between"
        mb="xs"
        gap="xs"
        wrap="nowrap"
      >
        <Group gap="xs" wrap="wrap">
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
      </Flex>

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
        <Center ml={"auto"}>
          <Paper radius="lg" p={3}>
            <Flex direction={"row"}>
              <ActionIcon
                onClick={() => {
                  requireAuth(() => {
                    upvoteMutation.mutate(meme.id);
                  });
                }}
                radius="lg"
                variant="subtle"
                color="gray"
                size="md"
              >
                {userVote === VoteType.VOTEUP ? (
                  <IconArrowBigUpFilled size={18} />
                ) : (
                  <IconArrowBigUp size={18} />
                )}
              </ActionIcon>
              <ActionIcon
                onClick={() => {
                  requireAuth(() => {
                    downvoteMutation.mutate(meme.id);
                  });
                }}
                radius="lg"
                variant="subtle"
                color="gray"
                size="md"
              >
                {userVote === VoteType.VOTEDOWN ? (
                  <IconArrowBigDownFilled size={18} />
                ) : (
                  <IconArrowBigDown size={18} />
                )}
              </ActionIcon>
              <Divider orientation="vertical"></Divider>
              <ActionIcon
                ml={1}
                radius="lg"
                variant="subtle"
                color="gray"
                size="md"
              >
                <IconMessageCircle size={18} />
              </ActionIcon>
            </Flex>
          </Paper>
        </Center>
      </Flex>
    </Card>
  );
}
