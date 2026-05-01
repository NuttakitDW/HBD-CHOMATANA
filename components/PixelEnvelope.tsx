"use client";

type Props = {
  open: boolean;
};

export function PixelEnvelope({ open }: Props) {
  return (
    <svg
      viewBox="0 0 64 48"
      className="w-full h-full"
      shapeRendering="crispEdges"
    >
      <rect x="2" y="10" width="60" height="34" fill="#feae34" />
      <rect x="2" y="10" width="60" height="2" fill="#fee761" />
      <rect x="2" y="42" width="60" height="2" fill="#b86f50" />
      <rect x="2" y="10" width="2" height="34" fill="#fee761" />
      <rect x="60" y="10" width="2" height="34" fill="#b86f50" />

      <rect x="0" y="8" width="64" height="2" fill="#262b44" />
      <rect x="0" y="44" width="64" height="2" fill="#262b44" />
      <rect x="0" y="8" width="2" height="38" fill="#262b44" />
      <rect x="62" y="8" width="2" height="38" fill="#262b44" />

      <g
        style={{
          transformOrigin: "32px 10px",
          transform: open ? "rotateX(180deg)" : "rotateX(0deg)",
          transition: "transform 0.7s cubic-bezier(.6,.2,.4,1.3)",
        }}
      >
        <polygon points="2,10 32,30 62,10" fill="#e43b44" />
        <polygon points="2,10 32,30 62,10 62,12 32,32 2,12" fill="#ad2f3a" />
        <polyline
          points="2,10 32,30 62,10"
          stroke="#262b44"
          strokeWidth="1.5"
          fill="none"
        />
      </g>

      {!open && (
        <g>
          <rect x="28" y="20" width="8" height="8" fill="#fff1e8" />
          <rect x="29" y="21" width="6" height="6" fill="#ff77a8" />
          <rect x="31" y="22" width="2" height="4" fill="#feeed8" />
          <rect x="29" y="23" width="6" height="2" fill="#feeed8" />
        </g>
      )}
    </svg>
  );
}
