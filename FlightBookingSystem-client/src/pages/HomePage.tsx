import { Card } from "flowbite-react";
import { useSearchFlightQuery } from "../store/features/flight/flightApi";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const HomePage = () => {
  const [searchValue, setSearchValue] = useState({ searchTerm: "" });
  const [value] = useDebounce(searchValue, 1000);
  const { data, isLoading } = useSearchFlightQuery(value);

  console.log(data);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-600">
        <div className="h-[70vh] md:h-[50vh] flex flex-col items-center justify-center px-4 text-center">
          <div className="text-white uppercase">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
              Discover Your Next Destination
            </h1>
            <p className="text-lg md:text-xl mt-4">
              Book flights to your dream destinations at unbeatable prices.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Find Flights & Plan Your Journey
          </h2>
          <div className="flex items-center justify-center">
            <div className="w-full md:w-1/3 relative">
              <input
                onChange={(e) => setSearchValue({ searchTerm: e.target.value })}
                type="text"
                placeholder="e.g., New York"
                className="w-full px-4 py-2 border rounded-md"
              />

              {/* search overlay  */}

              {/* Search Results Overlay */}
              {value?.searchTerm && (
                <div className="absolute left-0 right-0 top-10 mt-2 bg-white shadow-lg rounded-md z-10">
                  {isLoading && (
                    <div className="p-4 text-center text-gray-500">
                      Loading...
                    </div>
                  )}
                  {!isLoading && data && data?.data?.length > 0
                    ? data?.data?.map((flight) => (
                        <div
                          key={flight?._id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex text-center"
                        >
                          <div>
                            <p>{flight?.origin?.airportCode}</p>
                            <p>{flight?.origin?.city}</p>
                            <p>{flight?.origin?.country}</p>
                          </div>{" "}
                          <span className="mx-3">-</span>
                          <div>{flight?.flightNumber}</div>
                        </div>
                      ))
                    : !isLoading &&
                      value?.searchTerm && (
                        <div className="p-4 text-center text-gray-500">
                          No results found.
                        </div>
                      )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="container my-16">
        <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
        <p className="text-lg mb-8">
          Check out the most sought-after destinations by travelers around the
          world.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card imgSrc="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2030&auto=format&fit=crop">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Maldives: Tropical Bliss
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Explore the pristine beaches and crystal-clear waters of the
              Maldives.
            </p>
          </Card>

          <Card imgSrc="https://images.unsplash.com/photo-1554036045-d39e8b6a3123?q=80&w=2030&auto=format&fit=crop">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Santorini: A Greek Paradise
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Unwind on the whitewashed cliffs and stunning views of Santorini.
            </p>
          </Card>

          <Card imgSrc="https://images.unsplash.com/photo-1590490358406-6a4a047f1cc3?q=80&w=2030&auto=format&fit=crop">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dubai: A City of Wonders
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Experience luxury, adventure, and culture in the heart of the UAE.
            </p>
          </Card>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Book With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-700">
                We offer competitive prices on flights to destinations
                worldwide.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-2">24/7 Customer Support</h3>
              <p className="text-gray-700">
                Our team is available around the clock to assist you with your
                needs.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-2">Flexible Booking</h3>
              <p className="text-gray-700">
                Enjoy flexibility with cancellations and changes on select
                fares.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-blue-600 py-8">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-xl font-bold mb-4">Ready to Explore?</h2>
          <p className="mb-6">
            Book your flights now and start your adventure today!
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
