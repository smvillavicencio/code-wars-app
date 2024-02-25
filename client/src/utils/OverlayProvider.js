/* eslint-disable */ 
import { createContext, useState } from 'react';
import { FreezeOverlay } from 'components';

// create user context using the createContext api
export const overlayContext = createContext();

export const OverlayProvider = (props) => {
	// state that will be implemented globally
	const [freezeOverlay, setFreezeOverlay] = useState(false);

	return (
		<overlayContext.Provider value={[freezeOverlay, setFreezeOverlay]}>
			{freezeOverlay ? <FreezeOverlay /> : <>{props.children}</>}
		</overlayContext.Provider>
	);
};