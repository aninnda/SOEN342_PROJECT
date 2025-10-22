import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type {
  ConnectionModel,
  TravelerModel,
  TripModel,
} from "../models/models";
import { createTrip } from "../queries/tripQueries";
import dayjs, { Dayjs } from "dayjs";
import { DateTimeField } from "@mui/x-date-pickers";

type BookingDialogProps = {
  open: boolean;
  onClose: () => void;
  routeIds: string[];
  connection?: ConnectionModel;
};

export default function BookingModal({
  open,
  onClose,
  routeIds,
  connection,
}: BookingDialogProps) {
  const [numTravelers, setNumTravelers] = useState(1);
  const [travelers, setTravelers] = useState<TravelerModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [departureDateTime, setDepartureDateTime] = useState<Dayjs>(
    dayjs().startOf("day")
  );

  // Update travelers array when numTravelers changes
  const handleNumTravelersChange = (n: number) => {
    setNumTravelers(n);
    setTravelers((prev) => {
      const arr = [...prev];
      while (arr.length < n)
        arr.push({ id: "", firstName: "", lastName: "", age: 0 });
      while (arr.length > n) arr.pop();
      return arr;
    });
  };

  const handleTravelerChange = (
    idx: number,
    field: string,
    value: string | number
  ) => {
    setTravelers((prev) => {
      const arr = [...prev];
      arr[idx] = { ...arr[idx], [field]: value };
      return arr;
    });
  };

  const handleSubmit = async () => {
    if (travelers.some((t) => !t.firstName || !t.age || !t.id)) {
      alert("Please fill all fields for all travelers");
      return;
    }

    const payload: TripModel = {
      id: 0, // is assigned by the backend
      travelers: travelers,
      routeIds,
      initialDepartureDateTime: departureDateTime,
    };
    setLoading(true);
    try {
      const res = await createTrip(payload);
    } catch (err: any) {
      console.error("Booking error:", err);
      if (err instanceof Error) {
        alert(`Booking failed: ${err.message}`);
      } else {
        alert("Booking failed: Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <DateTimeField
            value={departureDateTime}
            onChange={(value) => setDepartureDateTime(value as Dayjs)}
          />

          <Typography variant="h6" mb={2}>
            Book Route(s): {routeIds.join(", ")}
          </Typography>
          <TextField
            fullWidth
            type="number"
            label="Number of Travelers"
            value={numTravelers}
            onChange={(e) =>
              handleNumTravelersChange(Math.max(1, Number(e.target.value)))
            }
            sx={{ mb: 2 }}
            inputProps={{ min: 1 }}
          />
          {travelers.map((t, idx) => (
            <Box key={idx} mb={2}>
              <Typography variant="subtitle1">Traveler {idx + 1}</Typography>
              <Box sx={{ mb: 1 }}>
                <TextField
                  fullWidth
                  label="First name"
                  value={t.firstName}
                  onChange={(e) =>
                    handleTravelerChange(idx, "firstName", e.target.value)
                  }
                />

                <TextField
                  fullWidth
                  label="Last name"
                  value={t.lastName}
                  onChange={(e) =>
                    handleTravelerChange(idx, "lastName", e.target.value)
                  }
                />
              </Box>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={t.age}
                onChange={(e) =>
                  handleTravelerChange(
                    idx,
                    "age",
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                sx={{ mb: 1 }}
                inputProps={{ min: 0 }}
              />
              <TextField
                fullWidth
                label="ID (letters & numbers)"
                value={t.id}
                onChange={(e) =>
                  handleTravelerChange(idx, "id", e.target.value)
                }
                sx={{ mb: 1 }}
              />
            </Box>
          ))}
          <Box display="flex" gap={2} justifyContent="flex-end">
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* {tripReference && (
        <Dialog
          open={true}
          onClose={() => {
            setTripReference(null);
            onClose();
          }}
        >
          <DialogTitle>Trip Complete</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>Your trip reference number:</Typography>
            <Typography variant="h6" color="primary">
              {tripReference}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setTripReference(null);
                onClose();
              }}
              variant="contained"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )} */}
    </>
  );
}
