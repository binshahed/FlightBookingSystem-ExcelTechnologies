/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Table } from "flowbite-react";
import PageHeading from "../../components/dashboard/PageHeading";
import {
  useGetAllBookingQuery,
  useUpdateBookingMutation
} from "../../store/features/booking/bookingApi";
import { toast } from "sonner";
import { useEffect } from "react";

const DashboardBooking = () => {
  const {
    data: bookingData,
    isLoading: isBookingLoading,
    error: bookingError
  } = useGetAllBookingQuery(undefined);

  const [
    updateBooking,
    { isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError }
  ] = useUpdateBookingMutation();

  const bookings = bookingData?.data;

  const handleChange = (value: {
    bookingId: string;
    bookingStatus: string;
  }) => {
    updateBooking({
      id: value.bookingId,
      data: { bookingStatus: value.bookingStatus }
    });
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success("Booking status updated successfully!");
    }
    if (isUpdateError) {
      const errorMessage =
        (updateError as any)?.data?.message ||
        "Failed to update booking status.";
      toast.error(errorMessage);
    }
  }, [isUpdateSuccess, isUpdateError, updateError]);

  return (
    <div>
      <PageHeading>Bookings</PageHeading>

      {bookingError && (
        <div className="text-red-600">
          Failed to load bookings:{" "}
          {(bookingError as any)?.data?.message || "Unknown error occurred."}
        </div>
      )}

      <div className="overflow-x-auto mt-4">
        <Table>
          <Table.Head>
            <Table.HeadCell>Flight No</Table.HeadCell>
            <Table.HeadCell>Customer Name</Table.HeadCell>
            <Table.HeadCell>Customer Email</Table.HeadCell>
            <Table.HeadCell>Customer Phone</Table.HeadCell>
            <Table.HeadCell>Seats</Table.HeadCell>
            <Table.HeadCell>Total Price</Table.HeadCell>
            <Table.HeadCell>Booking Time</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {isBookingLoading ? (
              <Table.Row>
                <Table.Cell colSpan={8} className="text-center">
                  Loading...
                </Table.Cell>
              </Table.Row>
            ) : bookings && bookings.length > 0 ? (
              bookings.map((booking: any) => (
                <Table.Row
                  key={booking._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {booking.flightId.flightNumber}
                  </Table.Cell>
                  <Table.Cell>{booking.userId.name}</Table.Cell>
                  <Table.Cell>{booking.userId.email}</Table.Cell>
                  <Table.Cell>{booking.userId.phone}</Table.Cell>
                  <Table.Cell>
                    {`Economy: ${booking.seats.economy.join(
                      ", "
                    )}, Business: ${booking.seats.business.join(
                      ", "
                    )}, First Class: ${booking.seats.firstClass.join(", ")}`}
                  </Table.Cell>
                  <Table.Cell>${booking.totalPrice}</Table.Cell>
                  <Table.Cell>
                    {new Date(booking.createdAt).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Select
                      onChange={(e) =>
                        handleChange({
                          bookingId: booking?._id,
                          bookingStatus: e.target.value
                        })
                      }
                      defaultValue={booking?.bookingStatus}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </Select>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={8} className="text-center">
                  No bookings found.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default DashboardBooking;
