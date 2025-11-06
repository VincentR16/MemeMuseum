import { useForm } from "@mantine/form";
import type { CreateMemeRequest } from "../../types/CreateMemeRequest";
import { notifications } from "@mantine/notifications";

export function useMemeForm() {
  return useForm<CreateMemeRequest>({
    initialValues: {
      image: null as unknown as File,
      title: "",
      description: "",
      tags: [],
    },
    validate: {
      image: (value) => {
        if (!value) {
          notifications.show({
            title: "Missing image",
            message: "Please upload an image",
            color: "red",
          });
          return "Image is required";
        }
        return null;
      },

      title: (val) => (val.trim().length > 0 ? null : "Name is required"),

      description: (value) => {
        if (value && value.length > 200) {
          return `Description is too long (${value.length}/200 characters)`;
        }
        return null;
      },

      tags: (value) => {
        if (!value || value.length === 0) return null;

        const invalidTags = value.filter(
          (tag) =>
            tag.length < 2 || tag.length > 40 || !/^[a-zA-Z0-9-_]+$/.test(tag)
        );

        if (invalidTags.length > 0) {
          return "Tags must be 2-40 characters and contain only letters, numbers, - and __";
        }

        return null;
      },
    },
  });
}
