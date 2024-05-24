// components/QRCodeDialog.js
import { useState } from 'react';
import QRCode from 'qrcode';
import styles from './QRCodeDialog.module.css';

const QRCodeDialog = ({ url, isOpen, onClose }) => {
	const [qrCodeUrl, setQrCodeUrl] = useState('');
	
	// Generate the QR code data URI when URL changes
	useState(() => {
		if (url && isOpen) {
			QRCode.toDataURL(url, { errorCorrectionLevel: 'H' }, (err, url) => {
				if (!err) setQrCodeUrl(url);
			});
		}
	}, [url, isOpen]);
	
	if (!isOpen) return null;
	
	return (
		<div className="dialog">
			<div className={styles.dialog_content}>
				<span className={styles.close} onClick={onClose}>&times;</span>
				<img src={qrCodeUrl} alt="QR Code" />
			</div>
		</div>
	);
};

export default QRCodeDialog;
