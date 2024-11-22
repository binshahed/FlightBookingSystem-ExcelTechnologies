/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button, Label, TextInput } from "flowbite-react";
import PageHeading from "../../components/dashboard/PageHeading";
import Select from "react-select";
import { FlightFormData } from "../../types/types.flight";
import { useCreateFlightMutation } from "../../store/features/flight/flightApi";
import { APIError } from "../../types/ApiError";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define the structure of the form data

const DashboardCreateFlight = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FlightFormData>();

  const [createFlight, { isLoading, isSuccess, isError, error }] =
    useCreateFlightMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FlightFormData> = async (data) => {
    const formattedData = {
      flight: {
        ...data.flight,
        price: {
          economy: Number(data.flight.price.economy),
          business: Number(data.flight.price.business),
          firstClass: Number(data.flight.price.firstClass)
        }
      },
      seats: {
        economy: {
          rows: Number(data.seats.economy.rows),
          columns: data.seats.economy.columns.map((col) => col.value)
        },
        business: {
          rows: Number(data.seats.business.rows),
          columns: data.seats.business.columns.map((col) => col.value)
        },
        firstClass: {
          rows: Number(data.seats.firstClass.rows),
          columns: data.seats.firstClass.columns.map((col) => col.value)
        }
      }
    };

    console.log("Formatted Form Data:", formattedData);

    try {
      // Trigger the API call with the formatted data
      await createFlight(formattedData).unwrap(); // unwrap() gives direct access to the response data

      // Optionally reset the form after successful submission
      reset();

      navigate("/dashboard/flights");

      // Handle any further logic upon success (e.g., redirect to another page)
      toast.success("Flight created successfully");
    } catch (error) {
      // Handle error if the API call fails
      toast.error("Error creating flight:");
      console.log(error);
    }
  };

  const seatColumns = {
    economy: ["A", "B", "C", "D", "E", "F"],
    business: ["A", "B", "C", "D"],
    firstClass: ["A", "B", "C", "D"]
  };

  console.log(error);

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <PageHeading>Create Flight</PageHeading>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        {/* Flight Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Flight Number */}
          <div>
            <Label htmlFor="flightNumber" value="Flight Number" />
            <TextInput
              id="flightNumber"
              type="text"
              placeholder="Enter Flight Number"
              {...register("flight.flightNumber", {
                required: "Flight Number is required"
              })}
            />
            {errors.flight?.flightNumber && (
              <p className="text-red-600">
                {errors.flight.flightNumber.message}
              </p>
            )}
          </div>

          {/* Airline */}
          <div>
            <Label htmlFor="airline" value="Airline" />
            <TextInput
              id="airline"
              type="text"
              placeholder="Enter Airline Name"
              {...register("flight.airline", {
                required: "Airline is required"
              })}
            />
            {errors.flight?.airline && (
              <p className="text-red-600">{errors.flight.airline.message}</p>
            )}
          </div>
        </div>

        {/* Origin Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Origin Airport Code */}
          <div>
            <Label htmlFor="originAirportCode" value="Origin Airport Code" />
            <TextInput
              id="originAirportCode"
              type="text"
              placeholder="e.g., JFK"
              {...register("flight.origin.airportCode", {
                required: "Origin Airport Code is required"
              })}
            />
            {errors.flight?.origin?.airportCode && (
              <p className="text-red-600">
                {errors.flight.origin.airportCode.message}
              </p>
            )}
          </div>

          {/* Origin City */}
          <div>
            <Label htmlFor="originCity" value="Origin City" />
            <TextInput
              id="originCity"
              type="text"
              placeholder="e.g., New York"
              {...register("flight.origin.city", {
                required: "Origin City is required"
              })}
            />
            {errors.flight?.origin?.city && (
              <p className="text-red-600">
                {errors.flight.origin.city.message}
              </p>
            )}
          </div>

          {/* Origin Country */}
          <div>
            <Label htmlFor="originCountry" value="Origin Country" />
            <TextInput
              id="originCountry"
              type="text"
              placeholder="e.g., USA"
              {...register("flight.origin.country", {
                required: "Origin Country is required"
              })}
            />
            {errors.flight?.origin?.country && (
              <p className="text-red-600">
                {errors.flight.origin.country.message}
              </p>
            )}
          </div>
        </div>

        {/* Destination Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Destination Airport Code */}
          <div>
            <Label
              htmlFor="destinationAirportCode"
              value="Destination Airport Code"
            />
            <TextInput
              id="destinationAirportCode"
              type="text"
              placeholder="e.g., LAX"
              {...register("flight.destination.airportCode", {
                required: "Destination Airport Code is required"
              })}
            />
            {errors.flight?.destination?.airportCode && (
              <p className="text-red-600">
                {errors.flight.destination.airportCode.message}
              </p>
            )}
          </div>

          {/* Destination City */}
          <div>
            <Label htmlFor="destinationCity" value="Destination City" />
            <TextInput
              id="destinationCity"
              type="text"
              placeholder="e.g., Los Angeles"
              {...register("flight.destination.city", {
                required: "Destination City is required"
              })}
            />
            {errors.flight?.destination?.city && (
              <p className="text-red-600">
                {errors.flight.destination.city.message}
              </p>
            )}
          </div>

          {/* Destination Country */}
          <div>
            <Label htmlFor="destinationCountry" value="Destination Country" />
            <TextInput
              id="destinationCountry"
              type="text"
              placeholder="e.g., USA"
              {...register("flight.destination.country", {
                required: "Destination Country is required"
              })}
            />
            {errors.flight?.destination?.country && (
              <p className="text-red-600">
                {errors.flight.destination.country.message}
              </p>
            )}
          </div>
        </div>
        {/* Destination Details */}
        <div className="grid grid-cols-2 gap-6">
          {/* Departure Time */}
          <div>
            <Label htmlFor="departureTime" value="Departure Time" />
            <TextInput
              id="departureTime"
              type="datetime-local"
              {...register("flight.departureTime", {
                required: "Departure time is required"
              })}
            />
            {errors.flight?.departureTime && (
              <p className="text-red-600">
                {errors.flight.departureTime.message}
              </p>
            )}
          </div>

          {/* Arrival Time */}
          <div>
            <Label htmlFor="arrivalTime" value="Arrival Time" />
            <TextInput
              id="arrivalTime"
              type="datetime-local"
              {...register("flight.arrivalTime", {
                required: "Arrival time is required"
              })}
            />
            {errors.flight?.arrivalTime && (
              <p className="text-red-600">
                {errors.flight.arrivalTime.message}
              </p>
            )}
          </div>
        </div>

        {/* Prices in one line */}
        <div className="grid grid-cols-3 gap-6">
          {/* Economy Price */}
          <div>
            <Label htmlFor="economyPrice" value="Economy Price" />
            <TextInput
              id="economyPrice"
              type="number"
              placeholder="Enter Economy Price"
              {...register("flight.price.economy", {
                required: "Economy price is required"
              })}
            />
            {errors.flight?.price?.economy && (
              <p className="text-red-600">
                {errors.flight.price.economy.message}
              </p>
            )}
          </div>

          {/* Business Price */}
          <div>
            <Label htmlFor="businessPrice" value="Business Price" />
            <TextInput
              id="businessPrice"
              type="number"
              placeholder="Enter Business Price"
              {...register("flight.price.business", {
                required: "Business price is required"
              })}
            />
            {errors.flight?.price?.business && (
              <p className="text-red-600">
                {errors.flight.price.business.message}
              </p>
            )}
          </div>

          {/* First Class Price */}
          <div>
            <Label htmlFor="firstClassPrice" value="First Class Price" />
            <TextInput
              id="firstClassPrice"
              type="number"
              placeholder="Enter First Class Price"
              {...register("flight.price.firstClass", {
                required: "First Class price is required"
              })}
            />
            {errors.flight?.price?.firstClass && (
              <p className="text-red-600">
                {errors.flight.price.firstClass.message}
              </p>
            )}
          </div>
        </div>

        {/* Seat Configuration */}
        <div className="space-y-4">
          {["economy", "business", "firstClass"].map((seatClass) => (
            <div key={seatClass}>
              <Label
                htmlFor={`${seatClass}Columns`}
                value={`${
                  seatClass.charAt(0).toUpperCase() + seatClass.slice(1)
                } Seat Configuration`}
              />
              <div className="grid grid-cols-2 gap-4">
                {/* Seat Rows */}
                <div>
                  <Label htmlFor={`${seatClass}Rows`} value="Number of Rows" />
                  <TextInput
                    id={`${seatClass}Rows`}
                    type="number"
                    placeholder="e.g., 15"
                    {...register(`seats.${seatClass}.rows` as any, {
                      required: "Number of rows is required"
                    })}
                  />
                  {(errors.seats as any)?.[seatClass]?.rows && (
                    <p className="text-red-600">
                      {(errors.seats as any)[seatClass].rows.message}
                    </p>
                  )}
                </div>

                {/* Seat Columns */}
                <div>
                  <Label htmlFor={`${seatClass}Columns`} value="Seat Columns" />
                  <Controller
                    name={`seats.${seatClass}.columns` as any}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={(seatColumns as any)[seatClass].map(
                          (col: any) => ({
                            value: col,
                            label: col
                          })
                        )}
                        isMulti
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Flight"}
        </Button>

        {/* Optionally, show success or error messages */}
        {isSuccess && (
          <p className="text-green-600">Flight created successfully!</p>
        )}
        {isError && (
          <p className="text-red-600">
            Failed to create flight: {(error as APIError)?.data?.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default DashboardCreateFlight;
