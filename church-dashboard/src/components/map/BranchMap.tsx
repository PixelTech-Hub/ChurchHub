import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import React, { ReactElement } from 'react';

interface Props {
	location: any;
}

const BranchMap = ({ location }: Props): ReactElement => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: 'bvbbfbggfh',
	});
	const mapRef = React.useRef();
	const onMapLoad = React.useCallback((map: any) => {
		mapRef.current = map;
	}, []);
	if (loadError) return "Error";
	if (!isLoaded) return "Maps";

	return (
		<div style={{ marginTop: "50px" }}>
			<GoogleMap
				mapContainerStyle={{
					height: "800px",
				}}
				center={location}
				zoom={13}
				onLoad={onMapLoad}
			>
				<MarkerF
					position={location}
					icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
				/>
			</GoogleMap>
		</div>
	);
};

export default BranchMap;
