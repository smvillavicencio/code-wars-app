/* eslint-disable */ 
import Carousel from 'react-material-ui-carousel';

import Item from './CarouselItem';

// Company logos
import azeus from 'assets/Company Logos/Azeus.jpg';
import broadridge from 'assets/Company Logos/BR_logo_rgb_blue.png'
import exist from 'assets/Company Logos/exist-logo_high-res.png'
import kusho from 'assets/Company Logos/KushoLogoWhite.png';
import sxi from 'assets/Company Logos/SXI Logo 02 Horizontal.png';

// Partner logos
import cynthia from 'assets/Partner Logos/Cynthia.jpg';
import tresto from 'assets/Partner Logos/Tresto.jpg';


// placeholder for company logos
var logos = [
	{
		id: '1',
		title: 'Company 1',
		image: `${azeus}`,
	},
	{
		id: '2',
		title: 'Company 2',
		image: `${broadridge}`,
	},
	{
		id: '3',
		title: 'Company 3',
		image: `${exist}`,
	},
	{
		id: '4',
		title: 'Company 3',
		image: `${kusho}`,
	},
	{
		id: '5',
		title: 'Company 3',
		image: `${sxi}`,
	},
	{
		id: '6',
		title: 'Company 3',
		image: `${cynthia}`,
	},
	{
		id: '7',
		title: 'Company 3',
		image: `${tresto}`,
	}
];


/**
 * Purpose: Component that will display the sponsored companies through a carousel
 * Params: None
 */
const SponsorCarousel = () => {

	return (
		<Carousel
			sx={{
				paddingY: 3,
				// minWidth: '100%',
				alignItems: 'center',
				alignContent: 'center',
				justifyContent: 'center',
				borderRadius: '15px',
				bgcolor: 'rgba(255, 255, 255, 0.1)',
				boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.5)',
				backdropFilter: 'blur(10px)',
			}}

			// remove grow animation on component mount
			swipe={false}
			
			// make prev and next buttons always visible
			navButtonsAlwaysVisible={true}

			// adjust marginX for navigation buttons
			navButtonsWrapperProps={{
				style: {
					marginLeft: 5,
					marginRight: 5,
				}
			}} 

			// modify color for active indicator
			activeIndicatorIconButtonProps={{
				style: {
					backgroundColor: 'blue'
				}
			}}
      
			// adjust margin for indicators
			indicatorContainerProps={{
				style: {
					marginTop: '15px',
				}
			}}

			// adjust padding for indicator buttons
			indicatorIconButtonProps={{
				style: {
					marginLeft: 8,
					marginRight: 8,
				}
			}}
		>
			{/* displays the logos */}
			{ logos.map((item) =>
				<Item
					key={item.id}
					logo={item}
				/>
			)}
		</Carousel>
	);
};

export default SponsorCarousel;
