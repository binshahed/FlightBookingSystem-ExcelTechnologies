import { z } from 'zod';

// Airport schema validation
const airportValidation = z.object({
  airportCode: z.string({ message: 'Airport code is required' }),
  city: z.string({ message: 'City is required' }),
  country: z.string({ message: 'Country is required' }),
});

// Price schema validation
const priceValidation = z.object({
  economy: z.number({ message: 'Economy price is required' }),
  business: z.number({ message: 'Business price is required' }),
  firstClass: z.number({ message: 'First-class price is required' }),
});

// Seat configuration validation (rows and columns)
const seatConfigValidation = z.object({
  rows: z.number({ message: 'Rows are required' }).min(1),
  columns: z.array(z.string().min(1), { message: 'Columns are required' }),
});

// Flight schema validation
const flightValidation = z.object({
  flightNumber: z.string({ message: 'Flight number is required' }),
  airline: z.string({ message: 'Airline name is required' }),
  origin: airportValidation,
  destination: airportValidation,
  departureTime: z.string({ message: 'Departure time is required' }).datetime(),
  arrivalTime: z.string({ message: 'Arrival time is required' }).datetime(),
  price: priceValidation,
});

// Seats schema validation
const seatsValidation = z.object({
  economy: seatConfigValidation,
  business: seatConfigValidation,
  firstClass: seatConfigValidation,
});

// Create flight validation schema
const createFlightValidation = z.object({
  body: z.object({
    flight: flightValidation,
    seats: seatsValidation,
  }),
});

// Update flight validation schema
const updateFlightValidation = z.object({
  body: z.object({
    flight: flightValidation.partial(),
    seats: seatsValidation.partial(),
  }),
});

export const FlightValidation = {
  createFlightValidation,
  updateFlightValidation,
};
