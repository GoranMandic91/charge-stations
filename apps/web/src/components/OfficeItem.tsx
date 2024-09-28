import * as React from "react";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

export default function OfficeItem({ office }: any) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {office.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          Location
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {office.location}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          Number of charger stations
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {office.chargers.length}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          Max duration of charging session durging high demand
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {office.highDemandDuration}h
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/offices/${office._id}`}>
          more details
        </Button>
      </CardActions>
    </Card>
  );
}
