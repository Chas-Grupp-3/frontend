import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { Icon } from "@chas/ui";

const greenIconHtml = ReactDOMServer.renderToStaticMarkup(
  <Icon name="greenPin" size="md" />
);
const redIconHtml = ReactDOMServer.renderToStaticMarkup(
  <Icon name="redPin" size="md" />
);
const yellowIconHtml = ReactDOMServer.renderToStaticMarkup(
  <Icon name="yellowPin" size="md" />
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
