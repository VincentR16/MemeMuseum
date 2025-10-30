import { ActionIcon, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useModalContext } from "../context/modalContext";
import { useRequireAuth } from "../hook/useRequireAuth";

export default function PostMemeButton() {
  const { openMeme } = useModalContext();
  const requireAuth = useRequireAuth();

  return (
    <Tooltip color="black" label="Post a Meme">
      <ActionIcon
        color="violet.9"
        variant="filled"
        size="xl"
        radius="xl"
        aria-label="Post"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 100,
        }}
        onClick={() => {
          requireAuth(() => {
            openMeme();
          });
        }}
      >
        <IconPlus style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </Tooltip>
  );
}
