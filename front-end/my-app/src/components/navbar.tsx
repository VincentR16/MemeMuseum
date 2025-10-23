import { useState } from "react";
import {
  IconCalendarEvent,
  IconCircleDashedPlus,
  IconHistory,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import { Group, } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./style/navbar.module.css";

const data = [
  { link: "", label: "Archive", icon: IconHistory },
  { link: "", label: "Memes of the day", icon: IconCalendarEvent },
  { link: "", label: "Post a Meme", icon: IconCircleDashedPlus },
  { link: "", label: "Profile", icon: IconUserCircle },
];

export function Navbar() {
  const [active, setActive] = useState("Archive");

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group mt="md" className={classes.header} justify="space-between">
          <MantineLogo color="violet" size={28} />
        </Group>
        {links}
      </div>
      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          data-active={"Logout" === active || undefined}
          onClick={(event) => {
            event.preventDefault();
            setActive("Logout");
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
