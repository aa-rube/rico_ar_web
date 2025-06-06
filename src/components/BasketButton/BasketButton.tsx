import "./basketBtnStyles.scss";

export default function BasketButton({
  onClick = () => {},
  title,
}: {
  title: any;
  onClick: () => void;
}) {
  return (
    <div className="basket-btn__container">
      <button onClick={onClick}>{title}</button>
    </div>
  );
}
