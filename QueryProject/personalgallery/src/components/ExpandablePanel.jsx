import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import { useState } from "react";

function ExpandablePanel({ header, children }) {
  // sadece içindekileri basmak istediğimiz için props.children yazıyoruz buda children'a eşittir.
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded); // true ise false false ise true yap.
  };
  return (
    <div className="panelDiv">
      <div className="topArrangement">
        <div className="topArrangement">{header} </div>
        <div onClick={handleClick}>
          {expanded ? (
            <GoChevronDown style={{ cursor: "pointer" }} />
          ) : (
            <GoChevronLeft style={{ cursor: "pointer" }} />
          )}
        </div>
      </div>
      {expanded && <div>{children} </div>}
      {/* expanded true oldugu sürece children'ı bas. if else olarakta yazılabilir. */}
    </div>
  );
}

export default ExpandablePanel;
