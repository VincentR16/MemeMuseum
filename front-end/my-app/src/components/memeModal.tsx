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
} from "@mantine/core";
import {
  IconPhoto,
  IconUpload,
  IconWorldUpload,
  IconX,
} from "@tabler/icons-react";
import { useModalContext } from "../context/modalContext";
import { usePostMemeForm } from "../hook/form/usePostMemeForm";
import { CustomTitle } from "./customTitle";
import useTags from "../hook/useTags";
import { useMemo } from "react";
import { useMediaQuery } from "@mantine/hooks";

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
  const form = usePostMemeForm();
  const { data: tags, isLoading: isLoadingTags } = useTags();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const imagePreview = useMemo(() => {
    return form.values.image ? URL.createObjectURL(form.values.image) : null;
  }, [form.values.image]);

  const handleSubmit = form.onSubmit((values) => {
    console.log(values);
  });

  return (
    <Modal
      fullScreen={isMobile}
      radius="lg"
      opened={memeOpened}
      onClose={() => {
        setNavabar("Archive");
        closeMeme();
        if (isMobile && mobileOpened) {
          toggleMobile();
        }
        setTimeout(() => {
          form.reset();
        }, 2000);
      }}
      title={
        <CustomTitle
          title="Post a new Meme!"
          icon={<IconWorldUpload color="gray" size={30} />}
        />
      }
      size="xl"
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
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Flex mt="md" justify="center" w="100%">
            <Image
              src={imagePreview}
              h={300}
              w="auto"
              maw="100%"
              fit="contain"
              fallbackSrc="https://placehold.co/600x400/EEE/999?text=Upload+Image"
              radius="xl"
            />
          </Flex>

          <FileInput
            label="Image"
            placeholder="Upload Image"
            accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
            leftSection={<IconPhoto size={16} />}
            required
            {...form.getInputProps("image")}
          />

          <TextInput
            label="Title"
            placeholder="Write the title"
            required
            {...form.getInputProps("title")}
          />

          <Textarea
            label="Caption"
            placeholder="Describe your meme (optional)"
            minRows={3}
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
            disabled={isLoadingTags}
            {...form.getInputProps("tags")}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="subtle" color="gray" onClick={closeMeme}>
              Annulla
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
    </Modal>
  );
}
