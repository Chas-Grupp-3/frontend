import { Text } from "@chas/ui";
import { useLocation } from "react-router";

const DriverPackageDetails = () => {
  const location = useLocation();
  const { packageData } = location.state || {};
  console.log("packageData", packageData);
  return (
    <div>
      {packageData ? (
        <div>
          <Text variant="h1">packageDetails</Text>
          {/* Render other package details */}
        </div>
      ) : (
        <p>No package data available.</p>
      )}
    </div>
  );
};

export default DriverPackageDetails;
