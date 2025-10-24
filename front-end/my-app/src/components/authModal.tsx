import { Center, Modal, ThemeIcon } from "@mantine/core";
import { useModalContext } from "../context/modalContext";
import { CustomTitle } from "./customTitle";
import { AuthenticationForm } from "./auhtentication";
import { IconLogin, IconX } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import MemeMuseumLogo from "./memMuseumLogo";

export default function AuthModal() {
  const { authOpened, closeAuthModal } = useModalContext();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Modal
      opened={authOpened}
      fullScreen={isMobile}
      onClose={() => {
        closeAuthModal();
      }}
      title={
        <CustomTitle
          title="Welcome"
          icon={<IconLogin size={24}></IconLogin>}
        ></CustomTitle>
      }
      centered
      size="xl"
      closeButtonProps={{
        icon: (
          <ThemeIcon color="red.9" variant="light">
            <IconX size={20}></IconX>
          </ThemeIcon>
        ),
      }}
      withinPortal={false}
      transitionProps={{
        transition: "slide-up",
        duration: 300,
      }}
      radius="md"
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: isMobile ? "calc(100vh - 120px)" : "auto",
        },
        content: {
          border: "1px solid #373a40",
        },
      }}
    >
      <Center mb="xl">
        <MemeMuseumLogo></MemeMuseumLogo>
      </Center>

      <AuthenticationForm></AuthenticationForm>
    </Modal>
  );
}
