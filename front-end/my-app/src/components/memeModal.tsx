import {
  Button,
  FileInput,
  Group,
  Modal,
  TagsInput,
  Stack,
  Textarea,
  TextInput,
  ThemeIcon,
  Image,
  Flex,
  Box,
  Loader,
  Center,
} from "@mantine/core";
import {
  IconPhoto,
  IconUpload,
  IconWorldUpload,
  IconX,
} from "@tabler/icons-react";
import { useModalContext } from "../context/modalContext";
import { useMemeForm } from "../hook/form/useMemeForm";
import { CustomTitle } from "./customTitle";
import useTags from "../hook/useTags";
import { useMemo } from "react";
import { useMediaQuery } from "@mantine/hooks";
import usePostMeme from "../hook/usePostMeme";

interface MemeProps {
  setNavabar: React.Dispatch<React.SetStateAction<string>>;
  toggleMobile: () => void;
  mobileOpened: boolean;
}

export default function MemeModal({
  setNavabar,
  mobileOpened,
  toggleMobile,
}: MemeProps) {
  const { memeOpened, closeMeme } = useModalContext();
  const form = useMemeForm();
  const { data: tags, isLoading: isLoadingTags } = useTags();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const postMeme = usePostMeme();
  const { isPending } = postMeme;

  const imagePreview = useMemo(() => {
    return form.values.image ? URL.createObjectURL(form.values.image) : null;
  }, [form.values.image]);

  function handleClose() {
    setNavabar("Archive");
    closeMeme();
    if (isMobile && mobileOpened) {
      toggleMobile();
    }
    setTimeout(() => {
      form.reset();
    }, 500);
  }

  const handleSubmit = form.onSubmit(async (values) => {
    const data = new FormData();
    data.append("image", values.image);
    data.append("title", values.title);
    if (values.description) data.append("description", values.description);

    if (values.tags && values.tags.length > 0) {
      values.tags.forEach((tag) => {
        data.append("tags", tag);
      });
    } else {
      data.append("tags", JSON.stringify([]));
    }
    await postMeme.mutateAsync(data);
    handleClose();
  });

  return (
    <Modal
      size="55%"
      fullScreen={isMobile}
      radius="lg"
      opened={memeOpened}
      onClose={handleClose}
      transitionProps={{
        transition: "slide-up",
        duration: 400,
      }}
      title={
        <CustomTitle
          title="Post a new Meme!"
          icon={<IconWorldUpload color="gray" size={30} />}
        />
      }
      centered
      withinPortal={false}
      closeButtonProps={{
        icon: (
          <ThemeIcon color="red.9" variant="light">
            <IconX size={20} />
          </ThemeIcon>
        ),
      }}
    >
      {isPending ? (
        <Center h="50vh">
          <Loader size="xl" color="violet" />
        </Center>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <Flex direction="row" gap="md" justify="center">
              <FileInput
                style={{ display: "none" }}
                ref={(ref) => {
                  if (ref) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (window as any).fileInputRef = ref;
                  }
                }}
                label="Image"
                placeholder="Upload Image"
                accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                leftSection={<IconPhoto size={16} />}
                required
                {...form.getInputProps("image")}
              />
              <Box
                onClick={() => {
                  const input = document.querySelector(
                    'input[type="file"]'
                  ) as HTMLInputElement;
                  input?.click();
                }}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={imagePreview}
                  h="38vh"
                  w="auto"
                  maw="100%"
                  fit="contain"
                  fallbackSrc="https://placehold.co/600x400/EEE/999?text=Click+to+upload+a+image"
                  radius="xl"
                />
              </Box>
            </Flex>

            <TextInput
              label="Title"
              placeholder="Write the title"
              required
              {...form.getInputProps("title")}
            />

            <Textarea
              label="Caption"
              placeholder="Describe your meme (optional)"
              minRows={2}
              maxRows={5}
              autosize
              {...form.getInputProps("description")}
            />

            <TagsInput
              label="Tags"
              placeholder="Select existing tags or type new ones"
              data={tags ?? []}
              acceptValueOnBlur
              splitChars={[",", " ", "|"]}
              clearable
              maxDropdownHeight={200}
              disabled={isLoadingTags}
              {...form.getInputProps("tags")}
            />

            <Group justify="flex-end" mt="md">
              <Button variant="outline" color="gray" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                color="violet.9"
                leftSection={<IconUpload size={16} />}
              >
                Post
              </Button>
            </Group>
          </Stack>
        </form>
      )}
    </Modal>
  );
}
