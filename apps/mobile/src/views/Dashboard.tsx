import { Text, Button } from "@chas/ui";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleViewPackage = () => {
    // Navigate to a sample package or you could use a real package ID
    navigate("/package/123");
  };

  return (
    <div>
      <Text variant="h1">Dashboard</Text>
      <Button onClick={handleViewPackage}>View Package Details</Button>
    </div>
  );
};

export default Dashboard;
