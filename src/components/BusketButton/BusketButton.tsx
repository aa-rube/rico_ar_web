import "./busketBtnStyles.scss";

export default function BusketButton({
  onClick = () => {},
  title,
}: {
  title: any;
  onClick: () => void;
}) {
  return (
    <div className="busket-btn__container">
      <button onClick={onClick}>{title}</button>
    </div>
  );
}
