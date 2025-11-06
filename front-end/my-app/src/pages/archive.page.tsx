import {
  ActionIcon,
  Box,
  Flex,
  Menu,
  Switch,
  TextInput,
  Tooltip,
} from "@mantine/core";
import MemeList from "../components/memeList";
import {
  IconArrowRight,
  IconCalendarWeek,
  IconClockHour1,
  IconSearch,
  IconStarFilled,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { DatePicker } from "@mantine/dates";
import useInfiniteMeme from "../hook/useInfiniteMeme";
import useInfiniteSearchMeme from "../hook/useInfiniteSearchMeme";
import { useSearchParams } from "react-router-dom";

export default function ArchivePage() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTags, setSearchTags] = useState("");
  const [value, setValue] = useState<[string | null, string | null]>([
    null,
    null,
  ]);
  const [checked, setChecked] = useState(false);

  const sortBy = checked ? "votes" : "date";
  const activeSearch = searchParams.get("tags") || "";

  const normalQuery = useInfiniteMeme({ sortBy });
  const searchQuery = useInfiniteSearchMeme({
    tags: activeSearch,
    dateFrom: value[0] ? new Date(value[0]) : undefined,
    dateTo: value[1] ? new Date(value[1]) : undefined,
    sortBy,
  });

  const hasSearchParams = activeSearch || value[0] || value[1];
  const selectedQuery = hasSearchParams ? searchQuery : normalQuery;

  const handleSearch = () => {
    const params: Record<string, string> = {};

    if (searchTags.trim()) {
      params.tags = searchTags.trim();
    }
    setSearchParams(params);
  };

  useEffect(() => {
    const params: Record<string, string> = {};

    if (activeSearch) {
      params.tags = activeSearch;
    }
    if (value[0]) {
      params.dateFrom = value[0];
    }
    if (value[1]) {
      params.dateTo = value[1];
    }

    if (Object.keys(params).length > 0) {
      setSearchParams(params);
    } else if (!activeSearch && !value[0] && !value[1]) {
      setSearchParams({});
    }
  }, [value, setSearchParams, activeSearch]);

  useEffect(() => {
    if (searchTags.trim() === "" && activeSearch) {
      const params: Record<string, string> = {};

      setSearchParams(params);
    }
  }, [searchTags, activeSearch, value, setSearchParams]);

  return (
    <>
      <Box
        w="100%"
        style={{
          position: "sticky",
          top: isMobile ? 50 : 0,
          backgroundColor: "rgb(24, 24, 24)",
          zIndex: isMobile ? 99 : 200,
          paddingTop: isMobile ? "0.5rem" : "1rem",
          paddingBottom: isMobile ? "0.7rem" : "1rem",
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        <Flex
          direction={{ base: "column", sm: "row" }}
          justify={"center"}
          w={"100%"}
          gap={{ base: "xs", sm: "md" }}
          align={{ base: "center", sm: "flex-end" }}
          px={{ base: "xs", sm: 0 }}
        >
          <TextInput
            w={{ base: "95%", xs: "85%", sm: "75%", md: "70%", lg: "60%" }}
            radius={"xl"}
            size="md"
            placeholder="Search tags"
            value={searchTags}
            onChange={(event) => setSearchTags(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            rightSectionWidth={80}
            leftSection={<IconSearch size={18} stroke={1.5} />}
            rightSection={
              <Flex gap={"xs"} align="center" pr="xs">
                <Menu shadow="md">
                  <Menu.Target>
                    <ActionIcon
                      size={32}
                      radius="md"
                      color="gray"
                      variant="subtle"
                    >
                      <IconCalendarWeek size={18} stroke={1.5} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <DatePicker
                      type="range"
                      value={value}
                      onChange={setValue}
                    />
                  </Menu.Dropdown>
                </Menu>
                <ActionIcon
                  size={32}
                  radius="xl"
                  color="violet.9"
                  variant="filled"
                  onClick={handleSearch}
                >
                  <IconArrowRight size={18} stroke={1.5} />
                </ActionIcon>
              </Flex>
            }
          />
          <Tooltip
            color="black"
            label={checked ? "Order by rate" : "Order by date"}
            refProp="rootRef"
            disabled={isMobile}
          >
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              size={"md"}
              color="dark.4"
              onLabel={
                <IconStarFilled
                  size={16}
                  stroke={2.5}
                  color="var(--mantine-color-yellow-4)"
                />
              }
              offLabel={
                <IconClockHour1
                  size={16}
                  stroke={2.5}
                  color="var(--mantine-color-blue-4)"
                />
              }
            />
          </Tooltip>
        </Flex>
      </Box>
      <MemeList query={selectedQuery}></MemeList>
    </>
  );
}
