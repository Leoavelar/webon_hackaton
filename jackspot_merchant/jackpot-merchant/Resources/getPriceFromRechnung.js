export function getPriceFromRechnung(code) {
	const parts = code.split('_');
	for (let i = 5; i <= 9; i++) {
		if (i >= parts.length) {
			break;
		}
		const value = parseFloat(parts[i].replace(',', '.'));
		
		if (!isNaN(value) && value !== 0) {
			return parts[i];
		}
	}
	return null;
}