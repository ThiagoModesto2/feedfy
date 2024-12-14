import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FeedFy - Códigos",
  description: "Código lucrativo",
};

import Codes from "@/pages/Codes";

export default function CodesPage() {
  return <Codes />;
}
