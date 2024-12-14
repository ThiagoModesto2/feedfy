import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FeedFy - Saque Agora",
  description: "Código lucrativo",
};

import Withdrawal from "@/pages/Withdrawal";

export default function WithdrawalPage() {
  return <Withdrawal />;
}
