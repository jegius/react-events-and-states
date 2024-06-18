import "./index.css";

function BaseButton({ onClickProp, text, baseType = "button" }) {
  return (
    <button type={baseType} className="base-btn" onClick={onClickProp}>
      {text}
    </button>
  );
}

export default BaseButton;
