import { useState } from "react";
import { Textarea } from "@mantine/core";
import classes from "./style/floatingLabel.module.css";
import usePostComment from "../hook/usePostComment";
import { useRequireAuth } from "../hook/useRequireAuth";

export function FloatingLabelInput({ memeId }: { memeId: string }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const floating = value.trim().length !== 0 || focused || undefined;
  const comment = usePostComment();
  const requireAuth = useRequireAuth();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (value.trim()) {
        requireAuth(() => {
          comment.mutate({ memeId, content: { content: value.trim() } });
          setValue("");
        });
      }
    }
  };

  return (
    <Textarea
      w="100%"
      size="md"
      label="Leave a comment"
      required
      radius={"lg"}
      classNames={classes}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      autoComplete="nope"
      onKeyDown={handleKeyDown}
      rows={1}
      autosize
      maxRows={3}
      data-floating={floating}
      labelProps={{ "data-floating": floating }}
    />
  );
}
