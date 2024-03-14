import "./index.css";

function BaseInput({ baseType = "text", baseName = undefined, innerRef }) {
  return (
    <label className="base-input-label" htmlFor={baseName}>
      <input
        ref={innerRef}
        className="base-input"
        name={baseName}
        type={baseType}
      />
      <span className="base-input-text">{baseName}</span>
    </label>
  );
}

export default BaseInput;
