import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useVirtualConfig } from './VirtualContext';

export default function VirtualList({ items, renderItem, height = 360 }) {
  const { itemHeight, overscan } = useVirtualConfig();
  const ref = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [atBottom, setAtBottom] = useState(true);
  const THRESHOLD = 80;

  const total = items.length;
  const totalHeight = total * itemHeight;

  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const end = Math.min(total, Math.ceil((scrollTop + height) / itemHeight) + overscan);
  const visible = useMemo(() => items.slice(start, end), [items, start, end]);
  const offsetY = start * itemHeight;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      setScrollTop(el.scrollTop);
      const nearBottom = el.scrollHeight - (el.scrollTop + el.clientHeight) <= THRESHOLD;
      setAtBottom(nearBottom);
    };
    el.addEventListener('scroll', onScroll);
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (atBottom) el.scrollTop = el.scrollHeight;
  }, [items.length, atBottom]);

  return (
    <div
      ref={ref}
      style={{
        height,
        overflowY: 'auto',
        position: 'relative',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        background: 'var(--card)',
        padding: 12,
      }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: offsetY, left: 0, right: 0 }}>
          {visible.map((it, i) => renderItem(it, start + i))}
        </div>
      </div>
    </div>
  );
}
