/**
 * Capitalize first char at string
 *
 * which provided string for each first char toUpperCase then return string
 * if you are give empty string it will return empty string
 */
export const capitalize = (s: string) =>
	(s &&
		s
			.toLowerCase()
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ")) ||
	"";

/**
 * Compare time
 *
 * @param t1 start time
 * @param t2 end time
 * This is meant to compare start time and end time,
 * then return the mms (response time) of request
 */
export function hrdiff(t1: number[], t2: number[]) {
	var s = t2[0] - t1[0];
	var mms = t2[1] - t1[1];
	return s * 1e9 + mms;
}
