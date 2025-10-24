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
import greenCheck from "../assets/icons/greenCheck.svg";
import yellowWarning from "../assets/icons/yellowWarning.svg";
import truck from "../assets/icons/truck.svg";
import yellowPin from "../assets/icons/yellowPin.svg";
import yellowPinHover from "../assets/icons/yellowPinHover.svg";
import redPin from "../assets/icons/redPin.svg";
import redPinHover from "../assets/icons/redPinHover.svg";
import greenPin from "../assets/icons/greenPin.svg";
import greenPinHover from "../assets/icons/greenPinHover.svg";
import solidWhiteTemp from "../assets/icons/solidWhiteTemp.svg";
import whiteTempHover from "../assets/icons/whiteTempHover.svg";
import humidity from "../assets/icons/humidity.svg";
import half from "../assets/icons/half.svg";
import halfHover from "../assets/icons/halfHover.svg";
import cross from "../assets/icons/cross.svg";
import crossHover from "../assets/icons/crossHover.svg";
import map from "../assets/icons/map.svg";
import mapHover from "../assets/icons/mapHover.svg";
import whiteWarning from "../assets/icons/whiteWarning.svg";
import whiteWarningHover from "../assets/icons/whiteWarningHover.svg";
import whiteHamburgerHover from "../assets/icons/whiteHamburgerHover.svg";
import whitePackage from "../assets/icons/whitePackage.svg";
import whitePackageHover from "../assets/icons/whitePackageHover.svg";
import whiteCross from "../assets/icons/whiteCross.svg";
import whiteCrossHover from "../assets/icons/whiteCrossHover.svg";
import whiteUser from "../assets/icons/whiteUser.svg";
import whiteUserHover from "../assets/icons/whiteUserHover.svg";
import question from "../assets/icons/question.svg";
import questionHover from "../assets/icons/questionHover.svg";
import whiteClock from "../assets/icons/whiteClock.svg";
import whiteClockHover from "../assets/icons/whiteClockHover.svg";
import facebook from "../assets/icons/facebook.svg";
import twitter from "../assets/icons/twitter.svg";
import mail from "../assets/icons/mail.svg";
import instagram from "../assets/icons/instagram.svg";
import webBell from "../assets/icons/webBell.svg";
import webQr from "../assets/icons/webQr.svg";
import snowflake from "../assets/icons/snowflake.svg";
import webRedPin from "../assets/icons/webRedPin.svg";
import webGreenPin from "../assets/icons/webGreenPin.svg";
import webYellowPin from "../assets/icons/webYellowPin.svg";
import webTruck from "../assets/icons/webTruck.svg";
import bluePin from "../assets/icons/bluePin.svg";
import blueClock from "../assets/icons/blueClock.svg";

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
  greenCheck: greenCheck,
  yellowWarning: yellowWarning,
  truck: truck,
  yellowPin: yellowPin,
  yellowPinHover: yellowPinHover,
  redPin: redPin,
  redPinHover: redPinHover,
  greenPin: greenPin,
  greenPinHover: greenPinHover,
  solidWhiteTemp: solidWhiteTemp,
  whiteTempHover: whiteTempHover,
  humidity: humidity,
  half: half,
  halfHover: halfHover,
  cross: cross,
  crossHover: crossHover,
  map: map,
  mapHover: mapHover,
  whiteWarning: whiteWarning,
  whiteWarningHover: whiteWarningHover,
  whiteHamburgerHover: whiteHamburgerHover,
  whitePackage: whitePackage,
  whitePackageHover: whitePackageHover,
  whiteCross: whiteCross,
  whiteCrossHover: whiteCrossHover,
  whiteUser: whiteUser,
  whiteUserHover: whiteUserHover,
  question: question,
  questionHover: questionHover,
  whiteClock: whiteClock,
  whiteClockHover: whiteClockHover,
  facebook: facebook,
  twitter: twitter,
  mail: mail,
  instagram: instagram,
  webBell: webBell,
  webQr: webQr,
  snowflake: snowflake,
  webRedPin: webRedPin,
  webGreenPin: webGreenPin,
  webYellowPin: webYellowPin,
  webTruck: webTruck,
  bluePin: bluePin,
  blueClock: blueClock,
} as const;

export type IconName = keyof typeof iconMap;
