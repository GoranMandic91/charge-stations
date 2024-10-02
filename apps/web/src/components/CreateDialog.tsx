import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { createNewOffice, setIsCreateDialogOpen } from "../store/offices";
import { Box, FormControl, TextField } from "@mui/material";

export default function CreateDialog() {
  const dispatch = useAppDispatch();
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [locationError, setLocationError] = React.useState(false);
  const [locationErrorMessage, setLocationErrorMessage] = React.useState("");
  const [chargersError, setChargersError] = React.useState(false);
  const [chargersErrorMessage, setChargersErrorMessage] = React.useState("");
  const [durationError, setDurationError] = React.useState(false);
  const [durationErrorMessage, setDurationErrorMessage] = React.useState("");
  const { isLoading, isCreateDialogOpen } = useAppSelector((state) => ({
    isLoading: state.offices.isLoading,
    isCreateDialogOpen: state.offices.isCreateDialogOpen,
  }));

  const handleClose = () => {
    dispatch(setIsCreateDialogOpen(false));
  };

  const validateInputs = () => {
    const name = document.getElementById("name") as HTMLInputElement;
    const location = document.getElementById("location") as HTMLInputElement;
    const chargers = document.getElementById("chargers") as HTMLInputElement;
    const duration = document.getElementById("duration") as HTMLInputElement;

    let isValid = true;

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Office name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!location.value || location.value.length < 1) {
      setLocationError(true);
      setLocationErrorMessage("Office location is required.");
      isValid = false;
    } else {
      setLocationError(false);
      setLocationErrorMessage("");
    }

    if (!chargers.value || chargers.value.length < 1) {
      setChargersError(true);
      setChargersErrorMessage("Number of chargers is required.");
      isValid = false;
    } else {
      setChargersError(false);
      setChargersErrorMessage("");
    }

    if (!duration.value || duration.value.length < 1) {
      setDurationError(true);
      setDurationErrorMessage("Duration is required.");
      isValid = false;
    } else {
      setDurationError(false);
      setDurationErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const location = data.get("location")?.toString();
    const name = data.get("name")?.toString();
    const numOfChargers = data.get("chargers")?.toString();
    const highDemandDuration = data.get("duration")?.toString();

    dispatch(
      createNewOffice({ location, name, highDemandDuration, numOfChargers })
    );
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={isCreateDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Wanna create new office with chargers?"}
        </DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Fill in the form and hit create button.
            </DialogContentText>
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Office name"
                type="text"
                fullWidth
                variant="outlined"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="location"
                name="location"
                label="Office location"
                type="text"
                fullWidth
                variant="outlined"
                error={locationError}
                helperText={locationErrorMessage}
                color={locationError ? "error" : "primary"}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </FormControl>
            <div>
              <FormControl>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="chargers"
                  name="chargers"
                  label="Number of chargers"
                  type="number"
                  variant="outlined"
                  error={chargersError}
                  helperText={chargersErrorMessage}
                  color={chargersError ? "error" : "primary"}
                  slotProps={{
                    input: { inputProps: { min: 1 } },
                    inputLabel: { shrink: true },
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="duration"
                  name="duration"
                  label="Max duration during high load"
                  type="number"
                  variant="outlined"
                  error={durationError}
                  helperText={durationErrorMessage}
                  color={durationError ? "error" : "primary"}
                  slotProps={{
                    input: { inputProps: { min: 1 } },
                    inputLabel: { shrink: true },
                  }}
                />
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>cancel</Button>
            <Button
              onClick={validateInputs}
              autoFocus
              type="submit"
              disabled={isLoading}
            >
              create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
