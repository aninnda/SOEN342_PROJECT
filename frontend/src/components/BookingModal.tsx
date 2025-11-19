import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useState } from "react";
import type {
  ConnectionModel,
  TravelerModel,
  TripModel,
} from "../models/models";
import { useCreateTrip } from "../queries/tripQueries";
import { toIndex } from "../utils/dateUtils";
import { formatRouteNameList } from "../utils/stringFormatUtils";

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
  const createTripMutation = useCreateTrip();

  const [numTravelers, setNumTravelers] = useState(1);
  const [travelers, setTravelers] = useState<TravelerModel[]>([
    { id: "", firstName: "", lastName: "", age: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [departureDate, setDepartureDate] = useState<Dayjs>();

  const [tripId, setTripId] = useState<string | null>(null);

  const shouldDisableConfirm = () => {

    if (!departureDate) return true;

    for (const traveler of travelers) {
      if (
        !traveler.firstName ||
        !traveler.lastName ||
        traveler.age === "" ||
        !traveler.id
      ) {
        return true;
      }
    }
    return false;
  }

  function resetAndClose() {
    setNumTravelers(1);
    setTravelers([{ id: "", firstName: "", lastName: "", age: "" }]);
    setDepartureDate(undefined);
    setLoading(false);
    onClose();
  }

  // Update travelers array when numTravelers changes
  const handleNumTravelersChange = (n: number) => {
    setNumTravelers(n);
    setTravelers((prev) => {
      const arr = [...prev];
      while (arr.length < n)
        arr.push({ id: "", firstName: "", lastName: "", age: "" });
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
    if (travelers.some((t) => !t.firstName || t.age === "" || !t.id) || !departureDate) {
      alert("Please fill all fields for all travelers");
      return;
    }

    const payload: TripModel = {
      id: -1, // is assigned by the backend
      travelers: travelers,
      routeIds,
      initialDepartureDate: departureDate,
    };
    setLoading(true);
    try {
      const data = await createTripMutation.mutateAsync(payload);
      setTripId(data.trip.id.toString());
      resetAndClose();
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
      <Modal open={open} onClose={resetAndClose}>
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
          <Typography variant="h6" mb={2}>
            Book Connection: {formatRouteNameList(connection?.routes || [])}
          </Typography>

          <DatePicker
            label="Departure Date"
            sx={{ width: "100%", mb: 2 }}
            value={departureDate}
            onChange={(value) => setDepartureDate(value as Dayjs)}
            shouldDisableDate={(day) =>
              connection?.routes[0].daysOfOperation
                .map((dayOfOp) => (toIndex(dayOfOp) + 1) % 7)
                .includes(day.day()) === false
            }
          />
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
              <Box sx={{ mb: 1, display: "flex", gap: 1 }}>
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
              <Box sx={{ mb: 1, display: "flex", gap: 1 }}>
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
                  inputProps={{ min: 0 }}
                />
                <TextField
                  fullWidth
                  label="ID (letters & numbers)"
                  value={t.id}
                  onChange={(e) =>
                    handleTravelerChange(idx, "id", e.target.value)
                  }
                />
              </Box>
            </Box>
          ))}
          <Box display="flex" gap={2} justifyContent="flex-end">
            <Button onClick={resetAndClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || shouldDisableConfirm()}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>

      {tripId && (
        <Dialog
          open={true}
          onClose={() => {
            setTripId(null);
            resetAndClose();
          }}
        >
          <DialogTitle>Trip Created Successfully</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>Your trip ID:</Typography>
            <Typography variant="h6" color="primary">
              {tripId}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button href="/trips" target="_blank" variant="text">
              View Trips
            </Button>
            <Button
              onClick={() => {
                setTripId(null);
                resetAndClose();
              }}
              variant="contained"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
