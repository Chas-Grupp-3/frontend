import styled from "styled-components";
import { Icon, radius, Text, type IconName } from "@chas/ui";

import type { colors } from "@chas/ui";

interface StatusCardProps {
  IconName: IconName;
  IconSize: number | "sm" | "md" | "lg";
  backgroundColor?: string;
  Status?: string;
  Type?: "indicator" | "temperature" | "humidity";
  label?: string;
  labelColor?: keyof typeof colors;
}

const StatusCard = ({
  IconName,
  IconSize,
  backgroundColor,
  Status,
  Type,
  label,
  labelColor = "blueText",
}: StatusCardProps) => {
  return (
    <Card
      $backgroundColor={backgroundColor}
      role="region"
      aria-label={`Status card for ${Type || "information"}: ${label || "No label"}`}
      aria-describedby={
        Type === "indicator" && Status ? "status-text" : undefined
      }
    >
      <Icon
        name={IconName}
        size={IconSize}
        aria-label={`${Type || "Status"} icon`}
        alt={`Icon representing ${Type || "status information"}`}
      />
      <Text
        color={labelColor}
        aria-label={`Label: ${label || "No label provided"}`}
      >
        {label}
      </Text>
      {Type === "indicator" && (
        <Text aria-label={`Status value: ${Status || "No status"}`}>
          {Status}
        </Text>
      )}
    </Card>
  );
};

export default StatusCard;

const Card = styled.div<{ $backgroundColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: ${radius.box};
  background-color: ${(props) => props.$backgroundColor};
  width: 100%;
  width: 100%;
  aspect-ratio: 1; /* keep it square */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  gap: 0.5rem;
  text-align: center;
`;
