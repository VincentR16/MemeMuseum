import { Avatar, Group, Paper, Text } from "@mantine/core";
import classes from "./style/comment.module.css";
import type { Comment } from "../types/Comment.type";
import { getColorFromId } from "../utils/getColor";

interface CommentHtmlProps {
  comment: Comment;
}

export function CommentHtml({ comment }: CommentHtmlProps) {
  return (
    <Paper radius="md" className={classes.comment}>
      <Group>
        <Avatar
          src={null}
          color={getColorFromId(comment.userId)}
          alt={comment.user?.username}
          radius="xl"
        >
          {comment.user?.username?.charAt(0).toUpperCase()}
        </Avatar>
        <div>
          <Text fz="sm">{comment.user?.username}</Text>
          <Text fz="xs" c="dimmed">
            {new Date(comment.createdAt).toLocaleDateString("it-IT")}
          </Text>
        </div>
      </Group>
      <Text w={"90%"} lineClamp={10} ml={51} size="xl" mt="sm" className={classes.content}>
        {comment.content}
      </Text>
    </Paper>
  );
}
