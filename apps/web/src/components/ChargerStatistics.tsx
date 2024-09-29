import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Stack,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  SessionStats,
  DurationStats,
  ChargingStatistics,
} from "../store/offices";

const formatDuration = (ms: number) => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

const SessionTable = ({ sessions }: { sessions: SessionStats[] }) => (
  <Box sx={{ padding: 2 }}>
    <Typography variant="h6" gutterBottom>
      Top 5 Charging Sessions
    </Typography>
    <TableContainer component={Paper}>
      <Table aria-label="session table">
        <TableHead>
          <TableRow>
            <TableCell align="left">User</TableCell>
            <TableCell align="center">Total Sessions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map((row) => (
            <TableRow key={row.userId}>
              <TableCell component="th" scope="row">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PersonIcon sx={{ color: "#64b5f6" }} />
                  <Typography variant="body2">{row.name}</Typography>
                </Stack>
              </TableCell>
              <TableCell align="center">
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <EventIcon sx={{ color: "#43a047" }} />
                  <Typography variant="body2">{row.totalSessions}</Typography>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

const DurationTable = ({ duration }: { duration: DurationStats[] }) => (
  <Box sx={{ padding: 2 }}>
    <Typography variant="h6" gutterBottom>
      Top 5 Charging Duration
    </Typography>
    <TableContainer component={Paper}>
      <Table aria-label="duration table">
        <TableHead>
          <TableRow>
            <TableCell align="left">User</TableCell>
            <TableCell align="center">Top Charging Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {duration.map((row) => (
            <TableRow key={row.userId}>
              <TableCell component="th" scope="row">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PersonIcon sx={{ color: "#64b5f6" }} />
                  <Typography variant="body2">{row.name}</Typography>
                </Stack>
              </TableCell>
              <TableCell align="center">
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <AccessTimeIcon sx={{ color: "#ff7043" }} />
                  <Typography variant="body2">
                    {formatDuration(row.totalChargingTime)}
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default function ChargingStatistic({
  data,
}: {
  data: ChargingStatistics;
}) {
  return (
    <Accordion
      defaultExpanded={false}
      sx={{
        marginTop: 2,
        marginBottom: 2,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="charging-statistics-content"
        id="charging-statistics-header"
        sx={{ backgroundColor: "#f5f5f5" }}
      >
        <Typography variant="h5">Charging Statistics</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "stretch",
            justifyContent: "space-between",
            width: "100%",
            "& > *": { flexGrow: 1, minWidth: 0 },
          }}
        >
          <SessionTable sessions={data.sessions} />
          <DurationTable duration={data.duration} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
