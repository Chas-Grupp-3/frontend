import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { Icon } from "@chas/ui";

const greenIconHtml = ReactDOMServer.renderToStaticMarkup(
  <Icon
    name="greenPin"
    size="md"
    aria-label="Green location pin"
    alt="Green map pin icon"
  />
);
const redIconHtml = ReactDOMServer.renderToStaticMarkup(
  <Icon
    name="redPin"
    size="md"
    aria-label="Red location pin"
    alt="Red map pin icon"
  />
);
const yellowIconHtml = ReactDOMServer.renderToStaticMarkup(
  <Icon
    name="yellowPin"
    size="md"
    aria-label="Yellow location pin"
    alt="Yellow map pin icon"
  />
);

export const greenPinIcon = L.divIcon({
  html: greenIconHtml,
  className: "my-leaflet-div-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export const redPinIcon = L.divIcon({
  html: redIconHtml,
  className: "my-leaflet-div-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export const yellowPinIcon = L.divIcon({
  html: yellowIconHtml,
  className: "my-leaflet-div-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});
