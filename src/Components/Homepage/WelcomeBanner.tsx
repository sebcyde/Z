import { useSelector } from 'react-redux';

function WelcomeBanner() {
	const Version = useSelector((state: any) => state.VersionState);

	return (
		<div
			style={{
				backgroundColor: 'rgb(194, 87, 0)',
				width: '100%',
				textAlign: 'center',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '40px',
			}}
		>
			<h4 style={{ margin: '0px', fontSize: '18px' }}>
				App Version: v{Version.Version}
			</h4>
		</div>
	);
}

export default WelcomeBanner;
