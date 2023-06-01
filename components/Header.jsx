import { ConnectButton } from "web3uikit";

export default function Header() {
	return (
		<div className="border-b-2 border-white mx-4 py-4 flex justify-between items-center">
			<h1 className="ml-4 mb-2">Decentralized Lottery!</h1>
			<ConnectButton moralisAuth={false} />
		</div>
	);
}
