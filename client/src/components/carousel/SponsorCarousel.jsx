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
        paddingTop: 5,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        height: "200px",
        maxWidth: "350px",
        backgroundColor: "rgba(179,179,179,0.25)",
        boxShadow: "10px 10px 10px rgba(30,30,30,.1)",
        borderRadius: "15px",
        backdropFilter: "blur(4px)",
      }}

      // make prev and next buttons always visible
      navButtonsAlwaysVisible={true}

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
          margin: '10px',
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
