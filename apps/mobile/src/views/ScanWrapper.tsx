import { useParams } from "react-router";
import Scan from "../components/Scan";

const ScanWrapper = () => {
  const { mode, id } = useParams<{
    mode: "add" | "deliver" | "search";
    id?: string;
  }>();
  if (!mode || !["search", "add", "deliver"].includes(mode)) {
    return <div>Invalid scan mode</div>;
  }

  return <Scan mode={mode} packageId={id} />;
};

export default ScanWrapper;
