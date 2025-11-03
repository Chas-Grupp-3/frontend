import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { Icon } from "@chas/ui";

const iconHtml = ReactDOMServer.renderToStaticMarkup(
  <Icon name="truckLeft" size="md" />
);

export const truckIcon = L.divIcon({
  html: iconHtml,
  className: "my-leaflet-div-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});
