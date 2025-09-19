type Props = { children: React.ReactNode; title: string };
const Card = ({ children, title }: Props) => {
  return (
    <div style={{ backgroundColor: "red" }}>
      {title}
      {children}
    </div>
  );
};

export default Card;
