import packageIcon from "../assets/icons/package.svg";

export const iconMap = {
  package: packageIcon,
} as const;

export type IconName = keyof typeof iconMap;
