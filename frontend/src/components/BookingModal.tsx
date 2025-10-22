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
import { useState } from "react";
import { createBooking } from "../queries/bookingApi";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  routeIds: string[];
};

export default function BookingModal({
  open,
  onClose,
  routeIds,
}: BookingModalProps) {
  const [numTravelers, setNumTravelers] = useState(1);
  const [travelers, setTravelers] = useState([
    { name: "", age: "", identifier: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [tripReference, setTripReference] = useState<string | null>(null);

  // Update travelers array when numTravelers changes
  const handleNumTravelersChange = (n: number) => {
    setNumTravelers(n);
    setTravelers((prev) => {
      const arr = [...prev];
      while (arr.length < n) arr.push({ name: "", age: "", identifier: "" });
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
    if (travelers.some((t) => !t.name || !t.age || !t.identifier)) {
      alert("Please fill all fields for all travelers");
      return;
    }
    // Generate a trip reference for this group
    const tripReferenceValue = crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 12);
    const payloads = travelers.map((t) => ({
      travelerName: t.name,
      travelerAge: Number(t.age),
      travelerIdentifier: t.identifier,
      routeIds,
      tripReference: tripReferenceValue,
    }));
    setLoading(true);
    try {
      let lastResponse;
      for (const payload of payloads) {
        lastResponse = await createBooking(payload);
      }
      setTripReference(lastResponse.tripReference || tripReferenceValue);
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
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
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
              <TextField
                fullWidth
                label="Name"
                value={t.name}
                onChange={(e) =>
                  handleTravelerChange(idx, "name", e.target.value)
                }
                sx={{ mb: 1 }}
              />
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
                value={t.identifier}
                onChange={(e) =>
                  handleTravelerChange(idx, "identifier", e.target.value)
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
      {tripReference && (
        <Dialog
          open={true}
          onClose={() => {
            setTripReference(null);
            onClose();
          }}
        >
          <DialogTitle>Booking Complete</DialogTitle>
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
      )}
    </>
  );
}
