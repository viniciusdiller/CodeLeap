import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CodeLeap Network Preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background:
          "linear-gradient(to bottom right, #0f172a, #1e293b, #7695EC)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "sans-serif",
        padding: "40px",
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: 900,
          letterSpacing: "-0.05em",
          backgroundClip: "text",
          marginBottom: 20,
          textShadow: "0 4px 10px rgba(0,0,0,0.5)",
        }}
      >
        CodeLeap
      </div>
      <div
        style={{
          fontSize: 45,
          color: "#94a3b8",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 60,
        }}
      >
        Network
      </div>
      <div
        style={{
          fontSize: 36,
          color: "#e2e8f0",
          textAlign: "center",
          maxWidth: "850px",
          lineHeight: 1.4,
        }}
      >
        A modern, responsive, and interactive social feed platform.
      </div>
    </div>,
    { ...size },
  );
}
