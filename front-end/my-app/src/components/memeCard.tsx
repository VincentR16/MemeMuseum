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
import { IconArrowBigDown, IconArrowBigUp } from "@tabler/icons-react";
import type { Meme } from "../types/Meme.type";
import { useMediaQuery } from "@mantine/hooks";

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
  const hash = id
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return MANTINE_COLORS[hash % MANTINE_COLORS.length];
};

export default function MemeCard({ meme }: MemeCardProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  
  return (
    <Card
      shadow="md"
      padding="xs"
       w={{ base: "100%", xs: "90%", sm: "85%", md: 650 }}
      maw={650}
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

        <Paper radius="lg" p={3}>
          <ActionIcon radius="lg" variant="subtle" color="gray" size="md">
            <IconArrowBigUp size={18} />
          </ActionIcon>
          <ActionIcon radius="lg" variant="subtle" color="gray" size="md">
            <IconArrowBigDown size={18} />
          </ActionIcon>
        </Paper>
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
            h={{ base: 300, xs: 350, sm: 400, md: 450 }}
            fit="contain"
            alt={meme.title}
          />
        </Paper>
      </Card.Section>

      <Group gap="xs" mt="md" mb="xs" wrap="wrap">
        {meme.tags.map((tag) => (
          <Badge 
            key={tag.id} 
            color={getColorFromId(tag.id)} 
            variant="light"
          >
            {tag.name}
          </Badge>
        ))}
      </Group>
    </Card>
  );
}