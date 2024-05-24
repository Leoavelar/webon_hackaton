import {useEffect, useState} from 'react';
import styles from './ImageModal.module.css';
import {nomo} from "nomo-webon-kit";

import {useQRCode} from "next-qrcode";

const ImageModal = ({ imageUrl, isOpen, onClose,onButtonClick1, onButtonClick2 }) => {
	
	const { Canvas } = useQRCode();
	const [evmAddress, setEvmAddress] = useState(null);
	
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
		const handleClickOutside = (event) => {
			if (event.target.classList.contains(styles.overlay)) {
				onClose();
			}
		};
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
		}
		return () => document.removeEventListener('click', handleClickOutside);
	}, [isOpen, onClose]);
	
	if (!isOpen) return null;
	
	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
                <span className={styles.close} onClick={onClose}>
                    &times;
                </span>
				{evmAddress?  (
					<Canvas
						text={evmAddress}
						options={{
							errorCorrectionLevel: 'M',
							margin: 3,
							scale: 4,
							width: 240,
							color: {
								dark: '#fcd601',
								light: '#5d0992',
							},
						}}
					/>
				) : ('loading...')}
				
				<div className={styles.buttonContainer}>
					{/*<button onClick={onButtonClick1}>Proceed to Rewards</button>*/}
					{/*<div className={styles.stars}>*/}
					{/*	<div className={styles.star}>*/}
					{/*		<img src={'/star.png'} alt="star"/>*/}
					{/*	</div>*/}
					{/*	<div className={styles.star}>*/}
					{/*		<img src={'/star.png'} alt="star"/>*/}
					{/*	</div>*/}
					{/*	<div className={styles.star}>*/}
					{/*		<img src={'/star.png'} alt="star"/>*/}
					{/*	</div>*/}
					{/*	<div className={styles.star}>*/}
					{/*		<img src={'/star.png'} alt="star"/>*/}
					{/*	</div>*/}
					{/*	<div className={styles.star}>*/}
					{/*		<img src={'/star.png'} alt="star"/>*/}
					{/*	</div>*/}
					{/*</div>*/}
				</div>
			</div>
		</div>
	);
};

export default ImageModal;
