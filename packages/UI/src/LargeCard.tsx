import { colors } from "./styles";
import Text from "./Text/Text";

type CardProps = {
  title: string;
  temperature: number;
  DeliveryStatus: "delivered" | "late" | "on time";
  ETA?: string;
  id: string;
  threshold: number;
};

const LargeCard = ({
  title,
  temperature,
  DeliveryStatus,
  ETA,
  id,
  threshold,
}: CardProps) => {
  const getCardColor = (
    DeliveryStatus: "delivered" | "late" | "on time",
    temperature: number,
    threshold: number
  ) => {
    if (temperature >= threshold) {
      return colors.critical;
    } else if (DeliveryStatus === "late") {
      return `${colors.minor}`;
    } else if (DeliveryStatus === "delivered") {
      return `${colors.pause}`;
    } else {
      return `${colors.ok}`;
    }
  };

  const getStatusText = (
    DeliveryStatus: "delivered" | "late" | "on time",
    temperature: number,
    threshold: number
  ) => {
    if (temperature >= threshold) {
      return "Temp issues";
    }
    if (DeliveryStatus === "late") {
      return "Late";
    }
    if (DeliveryStatus === "delivered") {
      return "Delivered";
    }
    return "On time";
  };
  return (
    <div
      style={{
        ...styles.card,
        color: `${colors.cardText}`,
        backgroundColor: getCardColor(DeliveryStatus, temperature, threshold),
      }}
    >
      <div style={styles.cardBox}>
        <div style={styles.leftColumn}>
          <Text variant="body-smBold">{title}</Text>
          <div style={styles.tempBox}>
          <svg
            width="18"
            height="30"
            viewBox="0 0 18 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.00024 29.1666C10.6146 29.1669 12.1891 28.6657 13.5063 27.7324C14.8235 26.7991 15.8183 25.4797 16.3531 23.9566C16.888 22.4334 16.9366 20.7817 16.4922 19.2298C16.0477 17.6779 15.1322 16.3023 13.8722 15.2932C13.6834 15.15 13.5295 14.9661 13.4218 14.7552C13.3141 14.5442 13.2554 14.3116 13.2502 14.0748V5.08325C13.2502 3.95608 12.8025 2.87508 12.0054 2.07805C11.2084 1.28102 10.1274 0.833252 9.00024 0.833252C7.87307 0.833252 6.79206 1.28102 5.99503 2.07805C5.198 2.87508 4.75024 3.95608 4.75024 5.08325V14.0763C4.75024 14.5551 4.50232 14.9943 4.12832 15.2946C2.86883 16.3039 1.95383 17.6793 1.50974 19.231C1.06565 20.7827 1.11437 22.434 1.64919 23.9568C2.184 25.4796 3.17851 26.7987 4.49532 27.732C5.81213 28.6652 7.38625 29.1665 9.00024 29.1666Z"
              stroke="#1F4F82"
              stroke-width="1.5"
            />
            <path
              d="M12.5418 21.3749C12.5418 22.3142 12.1687 23.2151 11.5045 23.8793C10.8403 24.5434 9.93947 24.9166 9.00016 24.9166C8.06085 24.9166 7.16002 24.5434 6.49583 23.8793C5.83163 23.2151 5.4585 22.3142 5.4585 21.3749C5.4585 20.4356 5.83163 19.5348 6.49583 18.8706C7.16002 18.2064 8.06085 17.8333 9.00016 17.8333C9.93947 17.8333 10.8403 18.2064 11.5045 18.8706C12.1687 19.5348 12.5418 20.4356 12.5418 21.3749Z"
              stroke="#1F4F82"
              stroke-width="1.5"
            />
            <path
              d="M9 17.8333V5.08325"
              stroke="#1F4F82"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <Text variant="h1">{temperature}°</Text>
         </div>
        </div>
        <div style={styles.rightColumn}>
          <Text variant="body-smBold">
            {getStatusText(DeliveryStatus, temperature, threshold)}
          </Text>
          <Text variant="body-sm">ETA: {ETA}</Text>
          <Text variant="body-sm">ID: {id}</Text>
        </div>
      </div>
    </div>
  );
};

export default LargeCard;

const styles = {
  card: {
    width: 340,
    height: 100,
    padding: 5,
    borderRadius: 20,
    margin: 20,
  },
  cardBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  tempBox: {
    display: "flex",
    flexDirection: "row",
    gap: "0.2rem",
    alignItems: "center",

  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 3,
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 3,
  },
};
