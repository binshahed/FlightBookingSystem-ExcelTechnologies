/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "../../store/features/auth/authApi";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setUser,
  useCurrentToken,
  useCurrentUser
} from "../../store/features/auth/authSlice";
import { toast } from "sonner";

export function ProfileEditModal({ userData }: { userData: any }) {
  const [openModal, setOpenModal] = useState(false);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation(); // Destructure loading state
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setValue } = useForm();

  // Close modal
  function onCloseModal() {
    setOpenModal(false);
  }

  console.log("curent user", user);

  // Set default values when userData is available
  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("phone", userData.phone);
      setValue("address", userData.address);
    }
  }, [userData, setValue]);

  // Handle form submission
  const onSubmit = async (data: any) => {
    try {
      // Call the update profile API mutation
      const response = await updateProfile(data).unwrap(); // unwrap() gives us the response directly
      dispatch(setUser({ user: { data: response?.data }, token }));
      // Handle successful update

      console.log(response.data);

      toast.success("Profile updated successfully!");
      setOpenModal(false); // Close modal after successful update
    } catch (error: any) {
      // Handle errors
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Edit Profile</Button>
      <Modal
        dismissible
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
      >
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your Name" />
              </div>
              <TextInput
                id="name"
                placeholder="John Doe"
                {...register("name", { required: "Name is required" })}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your Email" />
              </div>
              <TextInput
                disabled
                id="email"
                type="email"
                placeholder="name@company.com"
                {...register("email", { required: "Email is required" })}
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Your Phone Number" />
              </div>
              <TextInput
                id="phone"
                type="tel"
                placeholder="e.g. +880123456789"
                {...register("phone", { required: "Phone number is required" })}
                required
              />
            </div>

            {/* Address Field */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="address" value="Your Address" />
              </div>
              <TextInput
                id="address"
                placeholder="House: 8/1, Rode: 01, Shamoli, Dhaka"
                {...register("address", { required: "Address is required" })}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="w-full">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
