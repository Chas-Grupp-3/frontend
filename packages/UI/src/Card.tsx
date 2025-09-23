type Props = {
  children: React.ReactNode;
  title: string;
};
const Card = ({ children, title }: Props) => {
  return (
    <div style={{ backgroundColor: "violet" }}>
      {title}
      {children}
    </div>
  );
};

export default Card;
