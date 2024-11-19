/* eslint-disable @typescript-eslint/no-explicit-any */
export type TSeat = {
  save?: any;
  seatNumber: string;
  isBooked: boolean;
};

export type TSeats = {
  flightNumber: string;
  seatMap: {
    economy: [TSeat];
    business: [TSeat];
    firstClass: [TSeat];
  };
};

type Column = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type TSeatInput = {
  economy: {
    rows: number;
    columns: Column[]; // Only allows 'A', 'B', 'C', 'D', 'E', 'F'
  };
  business: {
    rows: number;
    columns: Column[]; // Only allows 'A', 'B', 'C', 'D'
  };
  firstClass: {
    rows: number;
    columns: Column[]; // Only allows 'A', 'B', 'C', 'D'
  };
};
