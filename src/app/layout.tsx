export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="">
			<head>
				<link rel="icon" href="" id="icon" />
				<title id="title"></title>
			</head>
			<body>
				<div id="root">{children}</div>
				<script type="module" src="/src/main.tsx"></script>
				<noscript>
					<h1>This site can&apos;t run without JavaScript.</h1>
				</noscript>
			</body>
		</html>
	);
}
