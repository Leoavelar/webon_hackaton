import { useEffect } from 'react';
import styles from './ImageModal.module.css';

const ImageModal = ({ imageUrl, isOpen, onClose,onButtonClick1, onButtonClick2 }) => {
	// Close the modal when clicking outside of it
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (event.target.classList.contains(styles.overlay)) {
				// onClose();
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
				<img src={imageUrl} alt="Modal" className={styles.image}/>
				<div className={styles.buttonContainer}>
					<button onClick={onButtonClick2}>Cancel</button>
					<button onClick={onButtonClick1}>Next</button>
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
			</div>
		</div>
	);
};

export default ImageModal;
