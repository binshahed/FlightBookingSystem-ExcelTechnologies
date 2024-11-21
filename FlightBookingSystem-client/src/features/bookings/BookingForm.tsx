/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../store/hooks";
import { useCurrentUser } from "../../store/features/auth/authSlice";
import { useCreateBookingMutation } from "../../store/features/booking/bookingApi";
import { toast } from "sonner";
import { APIError } from "../../types/ApiError";
import { useNavigate } from "react-router-dom";

type BookingFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export function BookingForm({ submitData }: { submitData: any }) {
  const user = useAppSelector(useCurrentUser);

  const [createBooking, { data }] = useCreateBookingMutation();
  const navigate = useNavigate();

  // Use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BookingFormValues>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || ""
    }
  });

  const onSubmit = async () => {
    try {
      const res = await createBooking(submitData).unwrap(); // Ensure this function returns a Promise
      if (res?.success) {
        console.log(res);

        toast.success(res.message || "Booking created successfully!");

        navigate("/profile");
      } else {
        console.log("res", res?.error);

        toast.error(
          res?.error?.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      const apiError = err as APIError; // Cast error to your custom error type
      const errorMessage =
        apiError?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };

  console.log("first", data);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 my-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 "
      >
        {/* Name Field */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Full Name" />
          </div>
          <TextInput
            disabled
            id="name"
            type="text"
            placeholder="Your full name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email Address" />
          </div>
          <TextInput
            id="email"
            disabled
            type="email"
            placeholder="name@domain.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Phone Number" />
          </div>
          <TextInput
            id="phone"
            disabled
            type="tel"
            placeholder="Your phone number"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Address Field */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="address" value="Address" />
          </div>
          <Textarea
            id="address"
            disabled
            placeholder="Your address"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="text-red-600 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit">Book Your Flight</Button>
      </form>
    </div>
  );
}
