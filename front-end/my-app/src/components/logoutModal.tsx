import { Button, Divider, Group, Modal, Text } from "@mantine/core";
import { CustomTitle } from "./customTitle";
import { IconLogout, IconX } from "@tabler/icons-react";
import useLogout from "../hook/useLogout";
import { useModalContext } from "../context/modalContext";

export default function LogoutModal() {
  const logout = useLogout();
  const { logoutOpened, closeLogout } = useModalContext();
  return (
    <Modal
      opened={logoutOpened}
      onClose={closeLogout}
      title={
        <CustomTitle
          title="Logout"
          icon={<IconLogout size={24}></IconLogout>}
        ></CustomTitle>
      }
      withinPortal={false}
      closeButtonProps={{
        icon: <IconX size={20} color="red"></IconX>,
      }}
    >
      <Divider></Divider>
      <Text mt="md" ml={5}>
        Are you sure you want to logout?
      </Text>

      <Text fs="italic" fw={600} mt={5} ml={5}>
        This action cannot be undone.
      </Text>

      <Group mt={15}>
        <Button
          variant="default"
          onClick={() => {
            logout.mutate();
            closeLogout();
          }}
        >
          Confirm
        </Button>
        <Button color="red" onClick={closeLogout}>
          Cancell
        </Button>
      </Group>
    </Modal>
  );
}
