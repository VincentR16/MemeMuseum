import { useForm } from "@mantine/form";
import type { CreateMemeRequest } from "../../types/CreateMemeRequest";

export function usePostMemeForm() {
  return useForm<CreateMemeRequest>({
    initialValues: {
      image: null,
      title: "",
      description: "",
      Tags: [],
    },
    validate: {
      image: (value) => (value ? null : "Image is required"),

      title: (val) => (val.trim().length > 0 ? null : "Name is required"),

      description: (value) => {
        if (value && value.length > 200) {
          return `Description is too long (${value.length}/200 characters)`;
        }
        return null;
      },

      Tags: (value) => {
        if (!value || value.length === 0) return null;

        const invalidTags = value.filter(
          (tag) =>
            tag.length < 2 || tag.length > 20 || !/^[a-zA-Z0-9-_]+$/.test(tag)
        );

        if (invalidTags.length > 0) {
          return "Tags must be 2-20 characters and contain only letters, numbers, - and __";
        }

        return null;
      },
    },
  });
}
