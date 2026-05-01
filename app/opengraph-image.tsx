import { ImageResponse } from "next/og";

export const alt = "HBD CHOMTANA — An 8-bit birthday card for Chomtana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadPixelFont(): Promise<ArrayBuffer> {
  const cssRes = await fetch(
    "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    },
  );
  const css = await cssRes.text();
  const url = css.match(/url\((https:\/\/[^)]+)\)/)?.[1];
  if (!url) throw new Error("Press Start 2P font URL not found");
  const fontRes = await fetch(url);
  return fontRes.arrayBuffer();
}

const COLORS = {
  bg: "#1a1c2c",
  card: "#fff1e8",
  cream: "#feeed8",
  pink: "#ff77a8",
  pinkDark: "#ad2f7e",
  yellow: "#feae34",
  yellowLight: "#fee761",
  red: "#e43b44",
  blue: "#3978a8",
  green: "#63c74d",
  dark: "#262b44",
};

export default async function Image() {
  const fontData = await loadPixelFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: COLORS.bg,
          fontFamily: "PressStart2P",
          color: COLORS.cream,
          padding: "50px 70px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexWrap: "wrap",
            opacity: 0.15,
          }}
        >
          {Array.from({ length: 80 }).map((_, i) => {
            const left = (i * 137.5) % 100;
            const top = (i * 89.7) % 100;
            const sz = (i % 3) + 2;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${left}%`,
                  top: `${top}%`,
                  width: sz,
                  height: sz,
                  background: COLORS.cream,
                  display: "flex",
                }}
              />
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: 660,
          }}
        >
          <div
            style={{
              display: "flex",
              color: COLORS.yellowLight,
              fontSize: 18,
              letterSpacing: 3,
              marginBottom: 18,
            }}
          >
            ★ A LETTER HAS ARRIVED ★
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: COLORS.pink,
              fontSize: 60,
              lineHeight: 1.15,
              textShadow: `5px 5px 0 ${COLORS.pinkDark}, 10px 10px 0 rgba(173,47,126,0.4)`,
            }}
          >
            <div style={{ display: "flex" }}>HAPPY</div>
            <div style={{ display: "flex" }}>BIRTHDAY</div>
            <div style={{ display: "flex" }}>CHOMTANA!</div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 26,
              padding: "12px 20px",
              background: COLORS.dark,
              border: `4px solid ${COLORS.yellowLight}`,
              color: COLORS.yellowLight,
              fontSize: 22,
              boxShadow: `4px 4px 0 ${COLORS.dark}`,
            }}
          >
            <span style={{ display: "flex", color: COLORS.cream }}>Lv.</span>
            <span style={{ display: "flex", color: COLORS.cream }}>25</span>
            <span style={{ display: "flex" }}>▶</span>
            <span style={{ display: "flex" }}>26</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            transform: "scale(0.85)",
            transformOrigin: "center right",
          }}
        >
          <PixelCake />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 26,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 70,
            paddingRight: 70,
            fontSize: 14,
            color: COLORS.cream,
            opacity: 0.75,
          }}
        >
          <div style={{ display: "flex" }}>▶ PRESS [START]</div>
          <div style={{ display: "flex", color: COLORS.pink }}>
            www.chomtana.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "PressStart2P",
          data: fontData,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}

function Px({
  x,
  y,
  w = 1,
  h = 1,
  c,
  unit,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  c: string;
  unit: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x * unit,
        top: y * unit,
        width: w * unit,
        height: h * unit,
        background: c,
        display: "flex",
      }}
    />
  );
}

function PixelCake() {
  const unit = 6;
  const W = 72;
  const H = 64;
  return (
    <div
      style={{
        position: "relative",
        width: W * unit,
        height: H * unit,
        display: "flex",
      }}
    >
      {/* plate */}
      <Px x={6} y={46} w={60} h={14} c={COLORS.card} unit={unit} />
      <Px x={6} y={46} w={60} h={2} c="#ffd9c0" unit={unit} />
      <Px x={6} y={58} w={60} h={2} c="#b86f50" unit={unit} />

      {/* bottom tier */}
      <Px x={10} y={34} w={52} h={14} c={COLORS.pink} unit={unit} />
      <Px x={10} y={34} w={52} h={2} c="#ffaad5" unit={unit} />
      <Px x={10} y={46} w={52} h={2} c={COLORS.pinkDark} unit={unit} />

      {/* drip dots */}
      {[12, 20, 28, 36, 44, 52].map((x) => (
        <Px
          key={x}
          x={x}
          y={38}
          w={6}
          h={2}
          c={COLORS.cream}
          unit={unit}
        />
      ))}

      {/* top tier */}
      <Px x={14} y={22} w={44} h={14} c={COLORS.cream} unit={unit} />
      <Px x={14} y={22} w={44} h={2} c="#fff1e8" unit={unit} />
      <Px x={14} y={34} w={44} h={2} c="#b86f50" unit={unit} />

      {/* outlines */}
      <Px x={6} y={44} w={60} h={2} c={COLORS.dark} unit={unit} />
      <Px x={10} y={32} w={52} h={2} c={COLORS.dark} unit={unit} />
      <Px x={14} y={20} w={44} h={2} c={COLORS.dark} unit={unit} />
      <Px x={6} y={60} w={60} h={2} c={COLORS.dark} unit={unit} />

      {/* candles */}
      {[16, 28, 40, 52].map((x) => (
        <div key={x} style={{ display: "flex" }}>
          {/* candle body */}
          <Px x={x} y={14} w={4} h={8} c={COLORS.yellowLight} unit={unit} />
          <Px x={x} y={14} w={2} h={8} c="#fff1e8" unit={unit} />
          {/* wick */}
          <Px x={x + 1} y={11} w={2} h={2} c={COLORS.dark} unit={unit} />
          {/* flame */}
          <Px x={x + 1} y={6} w={2} h={6} c={COLORS.yellow} unit={unit} />
          <Px x={x + 1} y={3} w={2} h={3} c={COLORS.yellowLight} unit={unit} />
          <Px x={x} y={9} w={4} h={3} c={COLORS.red} unit={unit} />
          <Px x={x + 1} y={10} w={2} h={2} c={COLORS.yellow} unit={unit} />
        </div>
      ))}
    </div>
  );
}
