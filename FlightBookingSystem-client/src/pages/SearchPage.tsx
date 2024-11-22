import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useSearchFlightQuery } from "../store/features/flight/flightApi";
import { TFlight } from "../types/types.flight";
import FlightSearchCard from "../features/flight/FlightSerchCard";
import Skeleton from "../components/skeleton/Skeleton";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState({ searchTerm: "" });
  const [value] = useDebounce(searchValue, 1000);
  const { data, isLoading } = useSearchFlightQuery(value);
  return (
    <div className="mb-20">
      <div className="bg-primary">
        <div className=" py-20 flex flex-col items-center justify-center px-4 text-center">
          <div className="text-white uppercase">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
              Search Your Flight
            </h1>
            <p className="text-lg md:text-xl mt-4">
              Book flights to your dream destinations at unbeatable prices.
            </p>

            <div className="flex items-center justify-center text-black my-5">
              <div className="w-full md:w-2/3 relative">
                <input
                  onChange={(e) =>
                    setSearchValue({ searchTerm: e.target.value })
                  }
                  type="text"
                  placeholder="Search by City, Airport, or Country"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="container mt-5">
          {data?.data?.map((d: TFlight) => (
            <FlightSearchCard flight={d} isLoading={isLoading} />
          ))}
        </div>
      )}

      {!isLoading && data?.data?.length === 0 && (
        <div className="container">
          <p className="text-center py-10 text-red-500 font-bold">
            {" "}
            No Flight Found
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
