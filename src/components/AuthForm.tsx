"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

type FormType = "sign_in" | "sign_up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    fullName:
      formType === "sign_up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
    email: z.string().email(),
  });
};

export default function AuthForm({ type }: { type: FormType }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h3 className="form-title">
            {type === "sign_in" ? "Войти в аккаунт" : "Регистрация"}
          </h3>

          {type !== "sign_in" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">
                      Полное имя
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="shad-input"
                        placeholder="Иванов Иван"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">
                    Адрес электронной почты:
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="shad-input"
                      placeholder="ivanIvanov@gmail.com"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === "sign_in" ? "Войти" : "Зарегистрироваться"}

            {isLoading && (
              <Image
                src="/icons/loader.svg"
                alt="Loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign_in" ? "Нет аккаунта?" : "Есть аккаунт?"}
            </p>
            <Link
              href={type === "sign_in" ? "/sign_up" : "/sign_in"}
              className="ml-1 font-medium text-brand"
            >
              {type === "sign_in" ? "Зарегистрироваться" : "Войти"}
            </Link>
          </div>
        </form>
      </Form>

      {/* Верификация с OTP */}
    </>
  );
}
