import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111111",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontFamily: "serif",
            color: "#FFFFFF",
            marginBottom: 24,
          }}
        >
          Outprint
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#A3A3A3",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  );
}
