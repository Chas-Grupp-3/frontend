import packageIcon from "../assets/icons/package.svg";
import smallTemp from "../assets/icons/smallTemp.svg";
import qrScan from "../assets/icons/qrScan.svg";
import hamburger from "../assets/icons/hamburger.svg";
import bigTemp from "../assets/icons/bigTemp.svg";
import whiteHamburger from "../assets/icons/whiteHamburger.svg";

export const iconMap = {
  package: packageIcon,
  smallTemp: smallTemp,
  qrScan: qrScan,
  bigTemp: bigTemp,
  hamburger: hamburger,
  whiteHamburger: whiteHamburger,
} as const;

export type IconName = keyof typeof iconMap;
