'use client';
import styles from './Transactions.module.css';
import {unixMsToDateString} from '../../Resources/UnixToDate'

export default function Transactions({transactions}) {
	
	return (
		<div className={styles.container}>
			<p> Latest Transactions</p>
			<div className={styles.transactions_container}>
				<ul className={styles.transactions_list}>
					{transactions.length > 0 ? (
						transactions.map((transaction, index) => (
							<li key={index}>
								<div className={styles.row}>
									<div className={styles.row}>
										<div className={styles.image_coin}>
											<img src={'/jackcoin.png'} alt="profile picture"/>
										</div>
										<h1>{(transaction.amount.value / 10 ** 18).toFixed(2)}</h1>
									</div>
									<h2>{unixMsToDateString(transaction.timeMilli)}</h2>
								</div>
							</li>
						))
					) : (
						<li>Loading...</li>
					)}
				</ul>
			</div>
		</div>
	
	);
}
