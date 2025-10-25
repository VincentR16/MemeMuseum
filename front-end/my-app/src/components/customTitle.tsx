import { Title, Group, ThemeIcon } from "@mantine/core";
import type { ReactNode } from "react";

type CustomTitleProps = {
  title: string;
  icon: ReactNode;
};

export const CustomTitle = ({ title, icon }: CustomTitleProps) => (
  <Group gap="md">
    <ThemeIcon  c="grey" variant="transparent" size="lg" radius="md">
      {icon}
    </ThemeIcon>
    <Title
      order={3}
      style={{
        fontWeight: 600,
      }}
    >
      {title}
    </Title>
  </Group>
);
