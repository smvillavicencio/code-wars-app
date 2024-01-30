
import { Paper } from '@mui/material'


const Item = ({ item }) => {
  return (
    <Paper
      sx={{
        backgroundColor: "rgba(255,255,255,0)",
        boxShadow: "10px 10px rgba(0,0,0,0)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{
          width: "130px",
          height: "130px",
        }}
      />
    </Paper>
  )
}

export default Item;