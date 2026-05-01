"use client";

type Props = {
  color: "red" | "blue" | "green" | "yellow" | "pink";
  popped: boolean;
  onPop: () => void;
};

const PALETTE: Record<
  Props["color"],
  { fill: string; light: string; dark: string }
> = {
  red: { fill: "#e43b44", light: "#ff6b6b", dark: "#a82430" },
  blue: { fill: "#3978a8", light: "#5fbed8", dark: "#1f4870" },
  green: { fill: "#63c74d", light: "#9bf07a", dark: "#3a8030" },
  yellow: { fill: "#feae34", light: "#fee761", dark: "#b87530" },
  pink: { fill: "#ff77a8", light: "#ffaad5", dark: "#ad2f7e" },
};

export function PixelBalloon({ color, popped, onPop }: Props) {
  const c = PALETTE[color];
  if (popped) {
    return (
      <svg
        viewBox="0 0 32 64"
        className="w-full h-full"
        shapeRendering="crispEdges"
      >
        <g opacity="0.6">
          <rect x="6" y="20" width="3" height="3" fill={c.fill} />
          <rect x="22" y="14" width="3" height="3" fill={c.fill} />
          <rect x="14" y="28" width="3" height="3" fill={c.fill} />
          <rect x="26" y="26" width="2" height="2" fill={c.fill} />
          <rect x="2" y="32" width="2" height="2" fill={c.fill} />
          <rect x="18" y="6" width="2" height="2" fill={c.fill} />
        </g>
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 32 64"
      className="w-full h-full cursor-pointer"
      shapeRendering="crispEdges"
      onClick={onPop}
    >
      <rect x="14" y="38" width="2" height="20" fill="#feeed8" opacity="0.7" />
      <rect x="13" y="36" width="6" height="4" fill={c.dark} />

      <rect x="10" y="6" width="12" height="2" fill={c.fill} />
      <rect x="8" y="8" width="16" height="2" fill={c.fill} />
      <rect x="6" y="10" width="20" height="14" fill={c.fill} />
      <rect x="8" y="24" width="16" height="6" fill={c.fill} />
      <rect x="10" y="30" width="12" height="4" fill={c.fill} />
      <rect x="12" y="34" width="8" height="2" fill={c.fill} />

      <rect x="10" y="6" width="2" height="2" fill={c.light} />
      <rect x="8" y="8" width="2" height="2" fill={c.light} />
      <rect x="6" y="10" width="2" height="6" fill={c.light} />
      <rect x="10" y="10" width="4" height="4" fill={c.light} />

      <rect x="20" y="6" width="2" height="2" fill={c.dark} />
      <rect x="22" y="8" width="2" height="2" fill={c.dark} />
      <rect x="24" y="10" width="2" height="14" fill={c.dark} />
      <rect x="22" y="24" width="2" height="6" fill={c.dark} />
      <rect x="20" y="30" width="2" height="4" fill={c.dark} />

      <rect x="10" y="6" width="12" height="2" fill="#262b44" />
      <rect x="8" y="8" width="2" height="2" fill="#262b44" />
      <rect x="22" y="8" width="2" height="2" fill="#262b44" />
      <rect x="6" y="10" width="2" height="14" fill="#262b44" />
      <rect x="24" y="10" width="2" height="14" fill="#262b44" />
      <rect x="6" y="22" width="2" height="2" fill="#262b44" />
      <rect x="8" y="24" width="2" height="6" fill="#262b44" />
      <rect x="22" y="24" width="2" height="6" fill="#262b44" />
      <rect x="10" y="30" width="2" height="4" fill="#262b44" />
      <rect x="20" y="30" width="2" height="4" fill="#262b44" />
      <rect x="12" y="34" width="8" height="2" fill="#262b44" />
    </svg>
  );
}
