"use client";

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
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import OTPModal from "./OTPModal";

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
  const [accountId, setAccountId] = useState<string | null>(null);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  z.setErrorMap((issue, ctx) => {
    const errorMessages = {
      invalid_type: "Неверный тип. Ожидалось: {expected}, получено: {received}",
      too_small: "Длина значения должна быть больше или равна {minimum}",
      too_big: "Длина значения должна быть меньше или равна {maximum}",
      invalid_string: "Неверное значение {validation}",
      invalid_date: "Неверная дата",
      custom: ctx.defaultError,
    };

    switch (issue.code) {
      case "invalid_type":
        return {
          message: errorMessages.invalid_type
            .replace("{expected}", issue.expected || "unknown")
            .replace("{received}", issue.received || "unknown"),
        };
      case "too_small":
        return {
          message: errorMessages.too_small.replace(
            "{minimum}",
            String(issue.minimum),
          ),
        };
      case "too_big":
        return {
          message: errorMessages.too_big.replace(
            "{maximum}",
            String(issue.maximum),
          ),
        };
      case "invalid_string":
        return {
          message: errorMessages.invalid_string.replace(
            "{validation}",
            String(issue.validation || "некорректный формат"),
          ),
        };
      case "invalid_date":
        return { message: errorMessages.invalid_date };
      default:
        return { message: ctx.defaultError };
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user =
        type === "sign_up"
          ? await createAccount({
              fullName: values.fullName || "",
              email: values.email,
            })
          : await signInUser({ email: values.email });

      setAccountId(user.accountId);
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Не удалось создать аккаунт. Пожалуйста, попробуйте ещё раз",
      );
    }

    setIsLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h3 className="form-title font-unbounded">
            {type === "sign_in" ? "Вход в аккаунт" : "Регистрация"}
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

      {accountId && (
        <OTPModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
}
