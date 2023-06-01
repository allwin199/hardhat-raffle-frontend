"use client";

import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
// import ManualHeader from "@/components/ManualHeader.jsx";
import Header from "@/components/Header";
import LotteryEntrance from "@/components/LotteryEntrance";

export default function Home() {
	return (
		<MoralisProvider initializeOnMount={false}>
			<NotificationProvider>
				{/* <ManualHeader /> */}
				<Header />
				<LotteryEntrance />
			</NotificationProvider>
		</MoralisProvider>
	);
}
