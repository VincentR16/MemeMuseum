import {
  Button,
  Group,
  Modal,
  TagsInput,
  Stack,
  Textarea,
  TextInput,
  ThemeIcon,
  Text,
  Loader,
  Center,
  Space,
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
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

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
        data.append("tags[]", tag);
      });
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
      withinPortal={true}
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
          <Space h="xs"></Space>

          <Stack gap="md">
            <Dropzone
              mt="xl"
              onDrop={(files) => {
                if (files.length > 0) {
                  form.setFieldValue("image", files[0]);
                }
              }}
              maxSize={20 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              style={{ cursor: "pointer" }}
            >
              {imagePreview ? (
                <Group justify="center" gap="xl" mih={220}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxHeight: "300px",
                      maxWidth: "100%",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </Group>
              ) : (
                <Group
                  justify="center"
                  gap="xl"
                  mih={220}
                  style={{ pointerEvents: "none" }}
                >
                  <Dropzone.Accept>
                    <IconUpload
                      size={52}
                      color="var(--mantine-color-blue-6)"
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      size={52}
                      color="var(--mantine-color-red-6)"
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto
                      size={52}
                      color="var(--mantine-color-dimmed)"
                      stroke={1.5}
                    />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Max file size: 20 MB (supports images and GIFs)
                    </Text>
                  </div>
                </Group>
              )}
            </Dropzone>

            <TextInput
              size="md"
              label="Title"
              placeholder="Write the title"
              error={form.errors}
              withAsterisk
              {...form.getInputProps("title")}
            />

            <Textarea
              size="md"
              label="Caption"
              placeholder="Describe your meme (optional)"
              minRows={2}
              maxRows={5}
              autosize
              {...form.getInputProps("description")}
            />
            <TagsInput
              size="md"
              label="Tags"
              placeholder="Select existing tags or type new ones"
              data={tags ?? []}
              acceptValueOnBlur
              splitChars={[",", " ", "|"]}
              clearable
              maxDropdownHeight={200}
              disabled={isLoadingTags}
              comboboxProps={{
                withinPortal: false,
                position: "top",
                middlewares: { flip: false, shift: false },
              }}
              {...form.getInputProps("tags")}
            />
            <Space h="xs"></Space>

            <Group justify="flex-end" mt="xl" mb="xs">
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
