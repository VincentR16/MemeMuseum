import { ActionIcon, Center, Divider, Flex, Paper } from "@mantine/core";
import {
  IconArrowBigDown,
  IconArrowBigDownFilled,
  IconArrowBigUp,
  IconArrowBigUpFilled,
  IconMessageCircle,
} from "@tabler/icons-react";
import { VoteType } from "../types/VoteTypesEnum.type";
import { useDownvoteMeme, useUpvoteMeme } from "../hook/useVoteMeme";
import { useRequireAuth } from "../hook/useRequireAuth";

interface MemeButtonsProps {
  memeId: string;
  userVote: VoteType;
  isMemePage: boolean;
}

export default function MemeButtons({
  memeId,
  userVote,
  isMemePage,
}: MemeButtonsProps) {
  const upvoteMutation = useUpvoteMeme();
  const downvoteMutation = useDownvoteMeme();
  const requireAuth = useRequireAuth();

  return (
    <Center ml={"auto"}>
      <Paper radius="lg" p={3}>
        <Flex direction={"row"}>
          <ActionIcon
            onClick={(e) => {
              e.stopPropagation();
              requireAuth(() => {
                upvoteMutation.mutate(memeId);
              });
            }}
            radius="lg"
            variant="subtle"
            color="gray"
            size="md"
          >
            {userVote === VoteType.VOTEUP ? (
              <IconArrowBigUpFilled size={18} />
            ) : (
              <IconArrowBigUp size={18} />
            )}
          </ActionIcon>
          <ActionIcon
            onClick={(e) => {
              e.stopPropagation();
              requireAuth(() => {
                downvoteMutation.mutate(memeId);
              });
            }}
            radius="lg"
            variant="subtle"
            color="gray"
            size="md"
          >
            {userVote === VoteType.VOTEDOWN ? (
              <IconArrowBigDownFilled size={18} />
            ) : (
              <IconArrowBigDown size={18} />
            )}
          </ActionIcon>
          {!isMemePage && (
            <>
              <Divider orientation="vertical"></Divider>
              <ActionIcon
                ml={1}
                radius="lg"
                variant="subtle"
                color="gray"
                size="md"
              >
                <IconMessageCircle size={18} />
              </ActionIcon>
            </>
          )}
        </Flex>
      </Paper>
    </Center>
  );
}
