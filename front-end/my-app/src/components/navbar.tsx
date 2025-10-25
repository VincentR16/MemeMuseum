import { useState } from "react";
import {
  IconCalendarEvent,
  IconCircleDashedPlus,
  IconHistory,
  IconLogin,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import { Group } from "@mantine/core";
import classes from "./style/navbar.module.css";
import { useModalContext } from "../context/modalContext";
import MemeMuseumLogo from "./memMuseumLogo";
import { useAuthContext } from "../context/authContext";

const data = [
  { link: "", label: "Archive", icon: IconHistory },
  { link: "", label: "Memes of the day", icon: IconCalendarEvent },
  { link: "", label: "Post a Meme", icon: IconCircleDashedPlus },
  { link: "", label: "Profile", icon: IconUserCircle },
];

export function Navbar() {
  const { isAuthenticated } = useAuthContext();
  const [active, setActive] = useState("Archive");
  const { openAuthModal, openLogout } = useModalContext();

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
        <Group className={classes.header}>
          <MemeMuseumLogo></MemeMuseumLogo>
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
            if (isAuthenticated) {
              openLogout();
            } else openAuthModal();
          }}
        >
          {isAuthenticated ? (
            <>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </>
          ) : (
            <>
              <IconLogin className={classes.linkIcon} stroke={1.5} />
              <span>Login or Sign Up</span>
            </>
          )}
        </a>
      </div>
    </nav>
  );
}
