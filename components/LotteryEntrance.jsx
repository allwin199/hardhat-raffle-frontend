import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function LotteryEntrance() {
	const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
	const chainId = parseInt(chainIdHex);
	const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

	const [entranceFee, setEntranceFee] = useState("0");
	const [numPlayers, setNumPlayers] = useState("0");
	const [recentWinner, setRecentWinner] = useState("0");

	const dispatch = useNotification();

	const {
		runContractFunction: enterRaffle,
		isLoading,
		isFetching,
	} = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "enterRaffle",
		params: {},
		msgValue: entranceFee,
	});

	const { runContractFunction: getEntranceFee } = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "getEntranceFee",
		params: {},
	});

	const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "getNumberOfPlayers",
		params: {},
	});

	const { runContractFunction: getRecentWinner } = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "getRecentWinner",
		params: {},
	});

	const handleSuccess = async (tx) => {
		await tx.wait(1);
		handleNewNotification(tx);
		updateUI();
	};

	const handleNewNotification = () => {
		dispatch({
			type: "info",
			message: "Transaction Complete",
			title: "Tx Notification",
			position: "topR",
			// icon: "bell",
		});
	};

	async function updateUI() {
		const entranceFeeFromContract = (
			await getEntranceFee({
				onError: (error) => console.log(error),
			})
		).toString();
		const numPlayersFromContract = (
			await getNumberOfPlayers({
				onError: (error) => console.log(error),
			})
		).toString();
		const recentWinnerFromContract = await getRecentWinner({
			onError: (error) => console.log(error),
		});
		setEntranceFee(entranceFeeFromContract);
		setNumPlayers(numPlayersFromContract);
		setRecentWinner(recentWinnerFromContract);
	}

	useEffect(() => {
		if (isWeb3Enabled) {
			updateUI();
		}
	}, [isWeb3Enabled]);

	return (
		<div className="px-4">
			{raffleAddress ? (
				<div className="m-4">
					Entrance Fee : {ethers.utils.formatUnits(entranceFee, "ether")} ETH Total
					<button
						className="bg-slate-50 rounded-full text-black px-4 py-2 mx-4"
						onClick={async function () {
							await enterRaffle({
								onSuccess: handleSuccess,
								onError: (error) => console.log(error),
							});
						}}
						disabled={isLoading || isFetching}
					>
						Enter Raffle
					</button>
					<br />
					Players : {numPlayers}
					<br />
					Recent Winner : {recentWinner}
				</div>
			) : (
				<div>No Raffle Address Detected</div>
			)}
		</div>
	);
}
