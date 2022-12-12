export const capitalize = (s: string) =>
	(s &&
		s
			.toLowerCase()
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ")) ||
	"";
