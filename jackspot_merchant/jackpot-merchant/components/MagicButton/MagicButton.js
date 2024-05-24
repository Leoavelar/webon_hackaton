'use client';
import styles from './MagicButton.module.scss';

export default function MagicButton() {
	
	return (
		<div className={styles.button_container}>
			<button className={styles.shine_button}>
				<img src={'/magicbutton.png'} alt="referral"/>
			</button>
			<div className={styles.stars}>
				<div className={styles.star}>
					<img src={'/star.png'} alt="star"/>
				</div>
				<div className={styles.star}>
					<img src={'/star.png'} alt="star"/>
				</div>
				<div className={styles.star}>
					<img src={'/star.png'} alt="star"/>
				</div>
				<div className={styles.star}>
					<img src={'/star.png'} alt="star"/>
				</div>
				<div className={styles.star}>
					<img src={'/star.png'} alt="star"/>
				</div>
			</div>
		</div>
	);
}
