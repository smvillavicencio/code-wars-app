import { createContext, useState } from 'react';

// create user context using the createContext api
export const userDetailsContext = createContext();

export const UserDetailsProvider = (props) => {
	// state that will be implemented globally
	const [userDetails, setUserDetails] = useState();

	return (
		<userDetailsContext.Provider value={[userDetails, setUserDetails]}>
			{props.children}
		</userDetailsContext.Provider>
	);
};