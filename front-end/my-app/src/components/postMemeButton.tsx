import { ActionIcon, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useModalContext } from "../context/modalContext";

export default function PostMemeButton() {
  const { openMeme } = useModalContext();
  return (
    <Tooltip color="black" label="Post a Meme">
      <ActionIcon
        color="violet.9"
        mr="md"
        variant="filled"
        size="xl"
        radius="xl"
        aria-label="Post"
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
        onClick={openMeme}
      >
        <IconPlus style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </Tooltip>
  );
}
