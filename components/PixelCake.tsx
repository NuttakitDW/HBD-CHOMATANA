"use client";

type Props = {
  candles: boolean[];
  onBlow: (index: number) => void;
};

const CANDLE_X = [16, 28, 40, 52];

export function PixelCake({ candles, onBlow }: Props) {
  return (
    <svg
      viewBox="0 0 72 64"
      className="w-full h-full"
      shapeRendering="crispEdges"
    >
      <rect x="6" y="46" width="60" height="14" fill="#fff1e8" />
      <rect x="6" y="46" width="60" height="2" fill="#ffd9c0" />
      <rect x="6" y="58" width="60" height="2" fill="#b86f50" />
      <rect x="6" y="46" width="2" height="14" fill="#ffd9c0" />
      <rect x="64" y="46" width="2" height="14" fill="#b86f50" />

      <rect x="10" y="34" width="52" height="14" fill="#ff77a8" />
      <rect x="10" y="34" width="52" height="2" fill="#ffaad5" />
      <rect x="10" y="46" width="52" height="2" fill="#ad2f7e" />
      <rect x="10" y="34" width="2" height="14" fill="#ffaad5" />
      <rect x="60" y="34" width="2" height="14" fill="#ad2f7e" />

      <g>
        {[12, 20, 28, 36, 44, 52].map((x) => (
          <g key={x}>
            <rect x={x} y="38" width="4" height="2" fill="#feeed8" />
            <rect x={x + 2} y="40" width="2" height="2" fill="#feeed8" />
            <rect x={x + 4} y="38" width="4" height="2" fill="#feeed8" />
          </g>
        ))}
      </g>

      <rect x="14" y="22" width="44" height="14" fill="#feeed8" />
      <rect x="14" y="22" width="44" height="2" fill="#fff1e8" />
      <rect x="14" y="34" width="44" height="2" fill="#b86f50" />
      <rect x="14" y="22" width="2" height="14" fill="#fff1e8" />
      <rect x="56" y="22" width="2" height="14" fill="#b86f50" />

      <rect x="6" y="44" width="60" height="2" fill="#262b44" />
      <rect x="10" y="32" width="52" height="2" fill="#262b44" />
      <rect x="14" y="20" width="44" height="2" fill="#262b44" />
      <rect x="6" y="60" width="60" height="2" fill="#262b44" />

      {CANDLE_X.map((x, i) => (
        <g
          key={i}
          onClick={() => candles[i] && onBlow(i)}
          className={candles[i] ? "cursor-pointer" : ""}
          style={{ pointerEvents: candles[i] ? "auto" : "none" }}
        >
          <rect x={x} y="14" width="4" height="8" fill="#fee761" />
          <rect x={x} y="14" width="2" height="8" fill="#fff1e8" />
          <rect x={x - 1} y="13" width="6" height="2" fill="#262b44" />
          <rect x={x} y="20" width="4" height="2" fill="#b86f50" />

          {candles[i] && (
            <g className="origin-bottom animate-flame">
              <rect x={x + 1} y="6" width="2" height="8" fill="#feae34" />
              <rect x={x + 1} y="4" width="2" height="4" fill="#fee761" />
              <rect x={x} y="10" width="4" height="4" fill="#e43b44" />
              <rect x={x + 1} y="11" width="2" height="2" fill="#feae34" />
            </g>
          )}

          {!candles[i] && (
            <g>
              <rect x={x + 1} y="10" width="2" height="2" fill="#3a3a3a" />
              <rect x={x} y="11" width="4" height="1" fill="#5a5a5a" />
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
