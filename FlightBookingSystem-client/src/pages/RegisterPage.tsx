import { useForm } from "react-hook-form";
import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";
import { toast } from "sonner";
import { useSignUpMutation } from "../store/features/auth/authApi";
import { useAppDispatch } from "../store/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser, TUserData } from "../store/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

const RegisterPage = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from?: string };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const res = await signUp(data).unwrap();
      const user = (await verifyToken(res.data.token)) as TUserData;
      console.log("Response:", res);
      console.log("User:", user);
      toast.success("Registration successful!");
      dispatch(setUser({ user, token: res.data.token }));
      toast.success("Register successful");
      const targetPath =
        state?.from && state.from.startsWith("/") ? state.from : "/";
      navigate(targetPath, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <div className="container h-[90vh] flex items-center justify-center">
      <Card className="w-2/3 md:w-1/3">
        <h2 className="text-xl font-bold text-center mb-4">Register</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              type="text"
              placeholder="Enter Your Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters"
                }
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <Label htmlFor="phone" value="Phone Number" />
            <TextInput
              id="phone"
              type="tel"
              placeholder="Enter a phone number"
              {...register("phone", {
                required: "Phone number is required"
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Address Field */}
          <div>
            <Label htmlFor="address" value="Address" />
            <Textarea
              id="address"
              placeholder="Enter Your Address"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-4 bg-primary"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
