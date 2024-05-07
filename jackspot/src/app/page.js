'use client';

import Image from "next/image";
import styles from "../../components/Home/Home.module.css";
import {nomo} from 'nomo-webon-kit';
import {useEffect, useState} from "react";
import MagicButton from "../../components/MagicButton/MagicButton";
import Transactions from "../../components/Transactions/Transactions";


export default function Home() {
	
	const [balance, setBalance] = useState(null);
	const [evmAddress, setEvmAddress] = useState(null);
	const [transactions, setTransactions] = useState([]);
	
	
	useEffect(() => {
		// Define the async function to fetch balance
		const fetchEvmAddress = async () => {
			try {
				const result = await nomo.getEvmAddress();
				setEvmAddress(result); // Update the state with fetched balance
			} catch (error) {
				console.error('Failed to fetch Address:', error);
			}
		};
		fetchEvmAddress();
	}, []);
	
	useEffect(() => {
		// Define the async function to fetch balance
		const fetchBalance = async () => {
			try {
				const result = await nomo.getBalance({
					network: 'zeniq-smart-chain',
					contractAddress: '0x203718eE620ef9b68EA28b698d9502567DB6207d'
				});
				setBalance(result.balance / 10 ** 18); // Update the state with fetched balance
			} catch (error) {
				console.error('Failed to fetch balance:', error);
			}
		};
		fetchBalance();
	}, []);
	
	useEffect(() => {
		async function fetchTransactions() {
			try {
				const response = await nomo.getTransactions({
					network: 'zeniq-smart-chain',
					contractAddress: '0x203718eE620ef9b68EA28b698d9502567DB6207d'
				});
				console.log(response.txs);
				setTransactions(response.txs); // Set the transactions state
			} catch (error) {
				console.error('Failed to fetch transactions:', error);
			}
		}
		
		fetchTransactions();
	}, []);
	
	async function scanQRcode() {
		try {
			const response = await nomo.qrScan();
			console.log(response);
		} catch (error) {
			console.error('Failed to fetch QR code:', error);
		}
		
	}
	
	function shortenAddress(address, chars = 6) {
		if (!address || address.length < chars * 2 + 2) {
			return address;
		}
		return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`;
	}
	
	return (
		<div className={styles.background}>
			<div className={styles.container}>
				<div className={styles.flexrow}>
					<div className={styles.flexcol}>
						<div className={styles.text}>
							<p1>
								Your Rewards ($JACK)
							</p1>
							<div className={styles.flexrow}>
								<div className={styles.image_coin}>
									<img src={'/jackcoin.png'} alt="profile picture"/>
								</div>
								<h1 id='balance-display'>
									{balance !== null ? balance.toFixed(2) : 'loading...'}
								</h1>
							</div>
							<div className={styles.flexrow}>
								{/*<p2 id='address-display'>*/}
								{/*  {evmAddress !== null ? shortenAddress(evmAddress) : 'loading...'}*/}
								{/*</p2>*/}
							</div>
						</div>
					</div>
					<div className={styles.image_profile}>
						<img src={'/laila.png'} alt="profile picture"/>
					</div>
				</div>
				
				<div className={styles.spacer}></div>
				
				<div className={styles.flexrow}>
					<div className={styles.flexcol}>
						<div className={styles.icon_container}>
							<img src={'/store.png'} alt="Virtual store"/>
						</div>
						<p>Virtual Stores</p>
					</div>
					<div className={styles.flexcol}>
						<div className={styles.icon_container}>
							<img src={'/grocery-store.png'} alt="Physical store"/>
						</div>
						<p>Physical Stores</p>
					</div>
					<div className={styles.flexcol}>
						<div className={styles.icon_container}>
							<img src={'/discount.png'} alt="On Sale"/>
						</div>
						<p>Special Offers</p>
					</div>
					<div className={styles.flexcol}>
						<div className={styles.icon_container}>
							<img src={'/high-five.png'} alt="referral"/>
						</div>
						<p>Friend Referral</p>
					</div>
				</div>
				
				<div className={styles.spacer}></div>
				
				<div className={styles.flexrow}>
					<button onClick={scanQRcode}>
						<MagicButton/>
					</button>
				</div>
			</div>
			<div className={styles.flexrow}>
				<Transactions transactions={transactions}/>
			</div>
		</div>
	);
}
