import radixThemePlugin from "radix-ui-themes-with-tailwind";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {},
	},
	plugins: [
		radixThemePlugin({
			useTailwindColorNames: true, // optional
			useTailwindRadiusNames: true, // optional
			mapMissingTailwindColors: true, // optional
		}),
	],
};
