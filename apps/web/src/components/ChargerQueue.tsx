import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Stack,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ChargingUser {
  id: string;
  name: string;
}

interface ChargerRequest {
  user: ChargingUser;
  officeId: string;
  chargerId: number;
  createdAt: Date;
}

export default function ChargerQueue({ queue }: { queue: ChargerRequest[] }) {
  return (
    <Accordion
      defaultExpanded
      sx={{
        margin: 4,
        padding: 2,
        borderRadius: 4,
        backgroundColor: "#f5f5f5",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="queue-content"
        id="queue-header"
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Typography variant="h5" component="span">
            Queue Information
          </Typography>

          <Typography variant="body2" color="textSecondary" component="span">
            {queue.length > 0
              ? `${queue.length} user(s) awaiting`
              : "No users in queue"}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        {queue.length === 0 ? (
          <Typography variant="body1" color="textSecondary" component="span">
            The queue is currently empty.
          </Typography>
        ) : (
          <List>
            {queue.map((request, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: "#64b5f6" }}>
                      {request.user.name[0].toUpperCase()}
                    </Avatar>
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <PersonIcon sx={{ color: "#64b5f6" }} />{" "}
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          component="span"
                        >
                          {request.user.name}
                        </Typography>
                      </Stack>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                      >
                        Created at:
                        {new Date(request.createdAt).toLocaleString()}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < queue.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
