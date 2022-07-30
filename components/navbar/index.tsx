import { FC } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import logoDark from "@/public/logo_dark.png";

export interface INavBarProps {}

export const NavBar: FC<INavBarProps> = ({}) => {
  return (
    <div className={styles.navBar}>
      <Image src={logoDark} alt="Demo" />
    </div>
  );
};
