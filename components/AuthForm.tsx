"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" })
      .max(50, { message: "First name must be at most 50 characters" })
      .optional(),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(50, { message: "Last name must be at most 50 characters" })
      .optional(),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters" })
      .max(100, { message: "Address must be at most 100 characters" })
      .optional(),
    city: z
      .string()
      .min(2, { message: "City must be at least 2 characters" })
      .max(50, { message: "City must be at most 50 characters" })
      .optional(),
    state: z
      .string()
      .min(2, { message: "State must be at least 2 characters" })
      .max(50, { message: "State must be at most 50 characters" })
      .optional(),
    postalCode: z
      .string()
      .min(4, { message: "Postal code must be at least 4 characters" })
      .max(12, { message: "Postal code must be at most 12 characters" })
      .optional(),
    dob: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date of birth must be in YYYY-MM-DD format",
      })
      .optional(),
    ssn: z
      .string()
      .regex(/^\d{9}$/, { message: "SSN must be 9 digits" })
      .optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" })
      .refine(
        (val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(val),
        {
          message:
            "Password must contain uppercase, lowercase, number, and special character",
        }
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      type === "sign-in"
        ? {
            email: "",
            password: "",
          }
        : {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
            dob: "",
            ssn: "",
          },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      if (type === "sign-up") {
        const newUser = await signUp(values);
        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: values.email,
          password: values.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className=" cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          ></Image>
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            {" "}
            Horizon
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex flex-row justify-between gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="form-label">
                            First Name
                          </FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Input
                                placeholder="Enter your first name"
                                className="input-class"
                                {...field}
                              ></Input>
                            </FormControl>
                            <FormMessage className="form-message mt-2"></FormMessage>
                          </div>
                        </div>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="form-label">
                            Last Name
                          </FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Input
                                placeholder="Enter your last name"
                                className="input-class"
                                {...field}
                              ></Input>
                            </FormControl>
                            <FormMessage className="form-message mt-2"></FormMessage>
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <div className="form-item">
                        <FormLabel className="form-label">Address</FormLabel>
                        <div className="flex w-full flex-col">
                          <FormControl>
                            <Input
                              placeholder="Enter your street address"
                              className="input-class"
                              {...field}
                            ></Input>
                          </FormControl>
                          <FormMessage className="form-message mt-2"></FormMessage>
                        </div>
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <div className="form-item">
                        <FormLabel className="form-label">City</FormLabel>
                        <div className="flex w-full flex-col">
                          <FormControl>
                            <Input
                              placeholder="Enter your city"
                              className="input-class"
                              {...field}
                            ></Input>
                          </FormControl>
                          <FormMessage className="form-message mt-2"></FormMessage>
                        </div>
                      </div>
                    )}
                  />

                  <div className="flex flex-row justify-between gap-4">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="form-label">State</FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Input
                                placeholder="Enter your state"
                                className="input-class"
                                {...field}
                              ></Input>
                            </FormControl>
                            <FormMessage className="form-message mt-2"></FormMessage>
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="form-label">
                            Postal Code
                          </FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Input
                                placeholder="Enter your postal code"
                                className="input-class"
                                {...field}
                              ></Input>
                            </FormControl>
                            <FormMessage className="form-message mt-2"></FormMessage>
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <div className="flex flex-row justify-between gap-4">
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="form-label">
                            Date of Birth
                          </FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Input
                                placeholder="YYYY-MM-DD"
                                className="input-class"
                                {...field}
                              ></Input>
                            </FormControl>
                            <FormMessage className="form-message mt-2"></FormMessage>
                          </div>
                        </div>
                      )}
                    />{" "}
                    <FormField
                      control={form.control}
                      name="ssn"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="form-label">SSN</FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Input
                                placeholder="Enter your 9-digit SSN"
                                className="input-class"
                                {...field}
                              ></Input>
                            </FormControl>
                            <FormMessage className="form-message mt-2"></FormMessage>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">Email</FormLabel>
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          className="input-class"
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage className="form-message mt-2"></FormMessage>
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">Password</FormLabel>
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          className="input-class"
                          type="password"
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage className="form-message mt-2"></FormMessage>
                    </div>
                  </div>
                )}
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isloading}>
                  {isloading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account ?"
                : "Already have an account?"}{" "}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "sign-in"}
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
