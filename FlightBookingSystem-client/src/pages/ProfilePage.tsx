/* eslint-disable @typescript-eslint/no-explicit-any */
import BookingCard from "../components/cards/BookingCard";
import { ProfileEditModal } from "../features/profile/ProfileEditModal";
import { useCurrentUser } from "../store/features/auth/authSlice";
import { useGetMyBookingsQuery } from "../store/features/booking/bookingApi";
import { useAppSelector } from "../store/hooks";

const ProfilePage = () => {
  const user = useAppSelector(useCurrentUser);

  const { data, isLoading } = useGetMyBookingsQuery(undefined);
  console.log(data);

  return (
    <div className="container">
      <div className=" mx-auto my-10 p-6 bg-gray-50 rounded-lg shadow-md w-full">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" // Replace with user avatar URL
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md"
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600">{user?.phone}</p>
            <p className="text-gray-500 mt-2">📍 {user?.address}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-4">
          <ProfileEditModal userData={user} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {isLoading
          ? "Loading"
          : data?.data?.map((booking: any) => (
              <BookingCard key={booking?.id} booking={booking} />
            ))}
      </div>
    </div>
  );
};

export default ProfilePage;
