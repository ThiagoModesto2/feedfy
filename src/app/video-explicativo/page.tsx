import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FeedFy - Vídeo explicativo",
  description: "Código lucrativo",
};

import Video from "@/pages/Video";

export default function VideoExplicativoPage() {
  return <Video />;
}
