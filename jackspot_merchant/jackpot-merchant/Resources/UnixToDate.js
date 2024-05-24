export function unixMsToDateString(unixTime) {
	const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	// Calculate the total seconds
	let totalSeconds = Math.floor(unixTime / 1000);
	
	// Calculate years since 1970
	let year = 1970;
	while (true) {
		let daysInYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;
		if (totalSeconds >= daysInYear * 86400) {
			totalSeconds -= daysInYear * 86400;
			year++;
		} else {
			break;
		}
	}
	
	// Calculate the month and day
	let month = 0;
	const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	daysInMonth[1] = isLeapYear ? 29 : 28; // Update February for leap years
	
	while (true) {
		if (totalSeconds >= daysInMonth[month] * 86400) {
			totalSeconds -= daysInMonth[month] * 86400;
			month++;
		} else {
			break;
		}
	}
	
	// Calculate the day of the month
	const day = Math.floor(totalSeconds / 86400) + 1;
	totalSeconds %= 86400;
	
	// Calculate hours, minutes, and seconds
	const hours = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	
	// Format date string
	return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')} ` +
		`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}