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

export default function ArchivePage() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [searchTags, setSearchTags] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [value, setValue] = useState<[string | null, string | null]>([
    null,
    null,
  ]);
  const [checked, setChecked] = useState(false);

  const handleSearch = () => {
    setActiveSearch(searchTags);
  };

  useEffect(() => {
    if (!searchTags.trim().length) {
      setActiveSearch("");
    }
  }, [searchTags]);

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
                      numberOfColumns={isMobile ? 1 : 2}
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
      <MemeList
        filterbyRate={checked}
        dateFrom={value[0] ? new Date(value[0]) : null}
        dateTo={value[1] ? new Date(value[1]) : null}
        searchTags={activeSearch}
      ></MemeList>
    </>
  );
}