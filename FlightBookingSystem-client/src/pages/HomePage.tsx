import { Card } from "flowbite-react";

const HomePage = () => {
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
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Departure City
              </label>
              <input
                type="text"
                placeholder="e.g., New York"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Destination City
              </label>
              <input
                type="text"
                placeholder="e.g., London"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Travel Dates
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="bg-blue-600 text-white w-full py-2 px-4 rounded-md font-bold"
              >
                Search Flights
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="container my-16">
        <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
        <p className="text-lg mb-8">
          Check out the most sought-after destinations by travelers around the world.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            imgSrc="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2030&auto=format&fit=crop"
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Maldives: Tropical Bliss
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Explore the pristine beaches and crystal-clear waters of the Maldives.
            </p>
          </Card>

          <Card
            imgSrc="https://images.unsplash.com/photo-1554036045-d39e8b6a3123?q=80&w=2030&auto=format&fit=crop"
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Santorini: A Greek Paradise
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Unwind on the whitewashed cliffs and stunning views of Santorini.
            </p>
          </Card>

          <Card
            imgSrc="https://images.unsplash.com/photo-1590490358406-6a4a047f1cc3?q=80&w=2030&auto=format&fit=crop"
          >
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
                We offer competitive prices on flights to destinations worldwide.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-2">24/7 Customer Support</h3>
              <p className="text-gray-700">
                Our team is available around the clock to assist you with your needs.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-2">Flexible Booking</h3>
              <p className="text-gray-700">
                Enjoy flexibility with cancellations and changes on select fares.
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
