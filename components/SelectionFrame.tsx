const corners = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;

/** Decorative overlay for an existing .selection-target button or link. */
export function SelectionFrame() {
  return (
    <span aria-hidden="true" className="selection-frame">
      {corners.map((corner) => (
        <span key={corner} className={`selection-frame-handle selection-frame-${corner}`} />
      ))}
    </span>
  );
}
