type ClassValue = string | { [key: string]: boolean | any } | undefined | null;

export default function classNames(...args: ClassValue[]): string {
	const classes: string[] = [];

	for (const arg of args) {
		if (typeof arg === "string") {
			classes.push(arg);
		} else if (typeof arg === "object" && arg !== null && arg !== undefined) {
			for (const key in arg) {
				if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
					classes.push(key);
				}
			}
		}
	}

	return classes.join(" ");
}
