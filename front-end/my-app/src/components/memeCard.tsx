import { Card, Text, Image } from "@mantine/core";
import type { Meme } from "../types/Meme.type";

interface MemeCardProps {
  meme: Meme;
}

export default function MemeCard({ meme }: MemeCardProps) {
  return (
    <Card shadow="sm" padding="xl">
      <Card.Section>
        <Image src={meme.cloudinaryImageUrl} h={160} w="auto" />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {meme.title}
      </Text>

      <Text mt="xs" c="dimmed" size="sm">
        {meme.description}
      </Text>
    </Card>
  );
}
