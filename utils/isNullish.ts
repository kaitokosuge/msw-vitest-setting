/**
 * valueがnull or undefinedならtrueを返す
 */
export const isNullish = <T>(value: T) => {
	const isNullish = value === undefined || value === null;
	if (isNullish) {
		return true;
	}
	return false;
};
