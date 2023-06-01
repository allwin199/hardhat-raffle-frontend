"use client";

import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

export default function ManualHeader() {
	const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
		useMoralis();

	useEffect(() => {
		if (isWeb3Enabled) return;
		if (localStorage.getItem("connected")) {
			handleWeb3();
		}
	}, [isWeb3Enabled]);

	const handleWeb3 = async () => {
		await enableWeb3();
		localStorage.setItem("connected", "injected");
	};

	useEffect(() => {
		Moralis.onAccountChanged((account) => {
			console.log(`Account changed to ${account}`);
			if (account === null) {
				localStorage.removeItem("connected");
				deactivateWeb3();
				console.log("No Account Found");
			}
		});
	}, []);

	return (
		<div>
			{account ? (
				`Connected to ${account.slice(0, 6)}...${account.slice(account.length - 4)}`
			) : isWeb3EnableLoading ? (
				<div>Connecting...</div>
			) : (
				<button onClick={handleWeb3}>Connect</button>
			)}
		</div>
	);
}
