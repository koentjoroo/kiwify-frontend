import logo from "@/public/images/kiwify-green-logo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import cx from "clsx";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
});

type Inputs = yup.InferType<typeof schema>;

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur", resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = (data, e) => console.log(data);
  const onError: SubmitErrorHandler<Inputs> = (errors, e) =>
    console.log(errors);
  return (
    <>
      <Head>
        <title>Reset Password - Kiwify</title>
        <meta name="description" content="Login to Kiwify" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            src={logo}
            title="Kiwify"
            alt="Kiwify"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Redefinir a senha
          </h2>
          <p className="mt-2 text-center text-base leading-5 text-gray-600">
            Você receberá um e-mail com instruções para redefinir a senha
          </p>
        </div>
        <form
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div>
              <label
                className="block text-sm font-medium leading-5 mb-1 text-gray-700"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                className={cx(
                  "block py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 w-full",
                  errors.email ? "border-rose-500" : "border-gray-300"
                )}
                type="email"
                {...register("email")}
              />
              {errors.email?.type === "email" && (
                <div className="text-xs text-red-500 mt-1">
                  O e-mail deve ser válido
                </div>
              )}
              {errors.email?.type === "required" && (
                <div className="text-xs text-red-500 mt-1">
                  Esse campo é obrigatório
                </div>
              )}
            </div>
            <div className="mt-6">
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                type="submit"
              >
                Redefinir senha
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
