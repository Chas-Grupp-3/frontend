import { useParams } from "react-router";
import Scan from "../components/Scan";

const ScanWrapper = () => {
  const { mode } = useParams<{ mode: "search" | "add" | "deliver" }>();

  if (!mode || !["search", "add", "deliver"].includes(mode)) {
    return <div>Invalid scan mode</div>;
  }

  return <Scan mode={mode} />;
};

export default ScanWrapper;
