export type TSeat = {
  flightNumber: string;
  seatMap: {
    economy: [
      {
        seatNumber: string;
        isBooked: boolean;
      },
    ];
    business: [
      {
        seatNumber: string;
        isBooked: boolean;
      },
    ];
    firstClass: [
      {
        seatNumber: string;
        isBooked: boolean;
      },
    ];
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