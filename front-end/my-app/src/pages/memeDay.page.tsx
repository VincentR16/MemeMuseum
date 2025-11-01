import { Flex, Text } from "@mantine/core";
import DecryptedText from "../components/decryptedText";
import useInfiniteDayliMemes from "../hook/useInfiniteDailyMemes";
import MemeList from "../components/memeList";
import useDailyTags from "../hook/useGetDailyTags";

export default function MemesOfTheDayPage() {
  const { data } = useDailyTags();
  const dailyQuery = useInfiniteDayliMemes();
  return (
    <Flex
      direction={"column"}
      p={"md"}
      mt={"md"}
      w={"100%"}
      justify={"center"}
      align={"center"}
      gap={"lg"}
    >
      <div style={{ textAlign: "center", maxWidth: "90%" }}>
        <Text fw="700" style={{ fontSize: "clamp(1rem, 4vw, 2rem)" }}>
          The most searched words of the day are:
        </Text>
      </div>
      <div style={{ textAlign: "center", maxWidth: "90%" }}>
        <DecryptedText
          text={data?.join(", ") || ""}
          animateOn="view"
          revealDirection="center"
          speed={250}
          maxIterations={20}
          className="revealed"
          parentClassName="all-letters"
          encryptedClassName="encrypted"
          style={{
            fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
            fontWeight: "bold",
            wordWrap: "break-word",
          }}
        />
      </div>

      <MemeList
        query={dailyQuery}
        emptyMessage="No meme found for today's trends..."
      />
    </Flex>
  );
}
