/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useLoginMutation } from "../store/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import {
  setUser,
  TUserData,
  useCurrentToken
} from "../store/features/auth/authSlice";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { APIError } from "../types/ApiError";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from?: string };
  const token = useAppSelector(useCurrentToken);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();

  const onSubmit = async (values: LoginFormInputs) => {
    try {
      const res = await login({
        email: values.email,
        password: values.password
      }).unwrap();
      const user = (await verifyToken(res.token)) as TUserData;

      dispatch(setUser({ user, token: res.token }));
      toast.success("Login successful");

      const targetPath =
        state?.from && state.from.startsWith("/") ? state.from : "/";
      navigate(targetPath.trim(), { replace: true });
    } catch (err) {
      const apiError = err as APIError;
      toast.error(apiError.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      const targetPath =
        state?.from && state.from.startsWith("/") ? state.from : "/";
      navigate(targetPath.trim(), { replace: true });
    }
  }, []);

  return (
    <div className="container h-[80vh] flex items-center justify-center">
      <Card className="w-2/3 md:w-1/3">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="Enter your email address"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="bg-primary" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
