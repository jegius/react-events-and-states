import { useState } from "react";

function VirtualScroll({
  rowHeight,
  totalItems,
  items,
  visibleItemsLength,
  containerHeight,
}) {
  const totalHeight = rowHeight * totalItems;

  const [scrollTop, setScrollTop] = useState(0);

  const startNodeElem = Math.ceil(scrollTop / rowHeight);

  const visibleItems = items?.slice(
    startNodeElem,
    startNodeElem + visibleItemsLength
  );

  const offsetY = startNodeElem * rowHeight;

  const handleScroll = (e) => {
    setScrollTop(e?.currentTarget?.scrollTop);
  };
  return (
    <div
      style={{
        height: containerHeight,
        overflow: "auto",
        border: "3px solid #ffff",
        borderRadius: "5px",
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems}
        </div>
      </div>
    </div>
  );
}

export default VirtualScroll;
