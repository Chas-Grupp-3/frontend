import packageIcon from "../assets/icons/package.svg";
import smallTemp from "../assets/icons/smallTemp.svg";
import qrScan from "../assets/icons/qrScan.svg";
import hamburger from "../assets/icons/hamburger.svg";
import bigTemp from "../assets/icons/bigTemp.svg";
import whiteHamburger from "../assets/icons/whiteHamburger.svg";
import clock from "../assets/icons/clock.svg";
import tempWarning from "../assets/icons/tempWarning.svg";
import whiteTemp from "../assets/icons/whiteTemp.svg";
import smallTempHot from "../assets/icons/smallTempHot.svg";
import truckPin from "../assets/icons/truckPin.svg";
import qrScanHover from "../assets/icons/qrScanHover.svg";

export const iconMap = {
  package: packageIcon,
  smallTemp: smallTemp,
  qrScan: qrScan,
  qrScanHover: qrScanHover,
  bigTemp: bigTemp,
  hamburger: hamburger,
  whiteHamburger: whiteHamburger,
  clock: clock,
  tempWarning: tempWarning,
  whiteTemp: whiteTemp,
  smallTempHot: smallTempHot,
  truckPin: truckPin,
} as const;

export type IconName = keyof typeof iconMap;
