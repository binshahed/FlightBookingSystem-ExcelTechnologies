/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PageHeading from "../../components/dashboard/PageHeading";
import {
  useGetAllFlightsQuery,
  useDeleteFlightMutation
} from "../../store/features/flight/flightApi";
import { Table, Spinner, Button } from "flowbite-react";
import { ConfirmModal } from "../../components/dashboard/ConfirmModal";
import { Link } from "react-router-dom";

const DashboardFlights = () => {
  const {
    data: flightData,
    isLoading: isFlightLoading,
    refetch
  } = useGetAllFlightsQuery(undefined);
  const [deleteFlight] = useDeleteFlightMutation();
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteFlight(id).unwrap(); // API call to delete the flight
      refetch(); // Refresh the flight list after deletion
      setOpenModal(false);
    } catch (error) {
      console.error("Failed to delete flight:", error);
    }
  };

  if (isFlightLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner aria-label="Loading flights" size="lg" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <PageHeading>Flights</PageHeading>
        <Link to="/dashboard/flights/create">
          <Button>Create Flight</Button>
        </Link>
      </div>

      <Table className="w-full mt-6">
        <Table.Head>
          <Table.HeadCell>Flight Number</Table.HeadCell>
          <Table.HeadCell>Airline</Table.HeadCell>
          <Table.HeadCell>Origin</Table.HeadCell>
          <Table.HeadCell>Destination</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {flightData?.data?.map((flight: any) => (
            <Table.Row key={flight._id} className="bg-white hover:bg-gray-100">
              <Table.Cell>{flight.flightNumber}</Table.Cell>
              <Table.Cell>{flight.airline}</Table.Cell>
              <Table.Cell>
                {flight.origin.city} ({flight.origin.airportCode})
              </Table.Cell>
              <Table.Cell>
                {flight.destination.city} ({flight.destination.airportCode})
              </Table.Cell>
              <Table.Cell>
                <ConfirmModal
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  deleteFlight={handleDelete}
                  id={flight._id}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DashboardFlights;
