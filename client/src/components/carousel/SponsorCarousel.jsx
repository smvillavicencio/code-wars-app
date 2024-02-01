import Carousel from 'react-material-ui-carousel'
import Item from './Item'
import placeholder from "../../assets/UPLB COSS.png";

// placeholder for company logos
var logos = [
  {
    id: "1",
    title: "Company 1",
    image: `${placeholder}`,
  },
  {
    id: "2",
    title: "Company 2",
    image: `${placeholder}`,
  },
  {
    id: "3",
    title: "Company 3",
    image: `${placeholder}`,
  }
]


const SponsorCarousel = () => {

  return (
    <Carousel
      sx={{
        paddingY: 3,
        minWidth: 350,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        bgcolor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)",
        borderRadius: "15px",
        backdropFilter: "blur(10px)",
      }}

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
      { logos.map((item) =>
        <Item
          key={item.id}
          item={item}
        />
      )}
    </Carousel>
  )
}

export default SponsorCarousel;
