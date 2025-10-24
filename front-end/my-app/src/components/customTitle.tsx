import { Title, Group } from "@mantine/core";
import type { ReactNode } from "react";

type CustomTitleProps = {
  title: string;
  icon: ReactNode;
};

export const CustomTitle = ({ title, icon }: CustomTitleProps) => (
  <Group>
        {icon}
    <Title
      order={3}
      style={{
        background: "linear-gradient(135deg, #7950f2 0%, #5f3dc4 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: 600,
      }}
    >
      {title}
    </Title>
  </Group>
);