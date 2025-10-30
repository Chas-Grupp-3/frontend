import { iconMap } from "./iconMap";
import type { IconName } from "./iconMap";

interface IconProps {
  name: IconName;
  size: "sm" | "md" | "lg" | number;
  alt?: string;
}

export const Icon = ({ name, size, alt }: IconProps) => {
  const sizeMap = {
    sm: "24px",
    md: "40px",
    lg: "64px",
    xl: "220px",
  };

  const iconSize = typeof size === "string" ? sizeMap[size] : `${size}px`;
  const iconSrc = iconMap[name];

  return (
    <img src={iconSrc} alt={alt || name} width={iconSize} height={iconSize} />
  );
};
