import packageIcon from "../assets/icons/package.svg";
import smallTemp from "../assets/icons/smallTemp.svg";
import smallTempHot from "../assets/icons/smallTempHot.svg";
import truckPin from "../assets/icons/truckPin.svg";

export const iconMap = {
  package: packageIcon,
  smallTemp: smallTemp,
  smallTempHot: smallTempHot,
  truckPin: truckPin,
} as const;

export type IconName = keyof typeof iconMap;
