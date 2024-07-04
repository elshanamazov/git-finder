const options: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
};

export const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString('en-US', options);
};
