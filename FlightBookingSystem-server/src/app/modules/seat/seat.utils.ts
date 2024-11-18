/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import httpStatusCode from 'http-status-codes';
import { seatColumn } from './seat.const';

// Type definitions for seat and seatMap structures
type Seat = {
  seatNumber: string;
  isAvailable: boolean;
};

type SeatMap = {
  economy: {
    rows: number;
    columns: string[];
  };
  business: {
    rows: number;
    columns: string[];
  };
  firstClass: {
    rows: number;
    columns: string[];
  };
};

type FlightSeats = {
  economy: Seat[];
  business: Seat[];
  firstClass: Seat[];
};

const generateSeats = (rows: number, columns: string[]): Seat[] => {
  const seats: Seat[] = [];
  for (let row = 1; row <= rows; row++) {
    columns.forEach((column) => {
      if (!seatColumn.includes(column)) {
        throw new AppError(httpStatusCode.BAD_REQUEST, 'Row is not valid');
      }
      seats.push({
        seatNumber: `${column}${row}`,
        isAvailable: true,
      });
    });
  }
  return seats;
};

export function createSeatsForFlightWithSeatMap(seatMap: SeatMap): any {
  const { economy, business, firstClass } = seatMap;

  const allSeats: FlightSeats = {
    economy: generateSeats(economy.rows, economy.columns),
    business: generateSeats(business.rows, business.columns),
    firstClass: generateSeats(firstClass.rows, firstClass.columns),
  };

  return allSeats;
}

// // Example usage
// const input: SeatMap = {
//   economy: {
//     rows: 15,
//     columns: ['A', 'B', 'C', 'D', 'E', 'F'],
//   },
//   business: {
//     rows: 5,
//     columns: ['A', 'B', 'C', 'D'],
//   },
//   firstClass: {
//     rows: 5,
//     columns: ['A', 'B', 'C', 'D'],
//   },
// };

// // Call the function
// const seats = createSeatsForFlightWithSeatMap(input);

// console.log(seats);
