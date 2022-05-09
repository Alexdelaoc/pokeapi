import React from "react";
import { Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";

const PokeCard = (props) => {
  return(
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={props.data.name}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="300"
        image={props.data.sprites.front_default}
        alt={props.data.name}
      />
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">Type:</Typography>
        <Typography variant="body2" color="text.secondary">
          { props.data.types[0].type.name }
          { props.data.types[1] ? ", " + props.data.types[1].type.name : [] } 
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PokeCard;
