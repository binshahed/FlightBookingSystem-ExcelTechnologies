import { Schema, model } from 'mongoose';
import { TAirport, TFlight, TPrice,  } from './flight.interface';

// Airport schema with custom validation messages
const AirportSchema = new Schema<TAirport>({
  airportCode: {
    type: String,
    required: [true, 'Airport code is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
});



// Price schema with custom validation messages
const PriceSchema = new Schema<TPrice>({
  economy: {
    type: Number,
    required: [true, 'Economy price is required'],
  },
  business: {
    type: Number,
    required: [true, 'Business price is required'],
  },
  firstClass: {
    type: Number,
    required: [true, 'First-class price is required'],
  },
});

// Flight schema with custom validation messages
const FlightSchema = new Schema<TFlight>(
  {
    flightNumber: {
      type: String,
      required: [true, 'Flight number is required'],
      unique: true,
    },
    airline: {
      type: String,
      required: [true, 'Airline name is required'],
    },
    origin: {
      type: AirportSchema,
      required: [true, 'Origin details are required'],
    },
    destination: {
      type: AirportSchema,
      required: [true, 'Destination details are required'],
    },
    departureTime: {
      type: String,
      required: [true, 'Departure time is required'],
    },
    arrivalTime: {
      type: String,
      required: [true, 'Arrival time is required'],
    },
   
    
    price: {
      type: PriceSchema,
      required: [true, 'Price details are required'],
    },
    seats: {
      type: Schema.Types.ObjectId,
      ref: 'Seat',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  },
);

// Export the Mongoose model
export const FlightModel = model<TFlight>('Flight', FlightSchema);
