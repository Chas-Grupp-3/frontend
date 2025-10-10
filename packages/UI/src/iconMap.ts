import packageIcon from "../assets/icons/package.svg";
import smallTemp from "../assets/icons/smallTemp.svg";

export const iconMap = {
  package: packageIcon,
  smallTemp: smallTemp,
} as const;

export type IconName = keyof typeof iconMap;
