import logo from "@/public/images/kiwify-green-logo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import cx from "clsx";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().email().required(),
    emailConfirm: yup
      .string()
      .email()
      .oneOf([yup.ref("email")], "Email doesn't match")
      .required(),
    password: yup
      .string()
      .min(8)
      .max(16)
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
      .required(),
    agreement: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required(),
  })
  .required();

type Inputs = yup.InferType<typeof schema>;

export default function SignUp() {
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
        <title>Sign Up - Kiwify</title>
        <meta name="description" content="Sign up to Kiwify" />
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
            Criar nova conta
          </h2>
          <p className="mt-2 text-center text-base leading-5 text-gray-600">
            Ou{" "}
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              href="/login"
            >
              entrar na sua conta existente
            </Link>
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
              <label
                className="block text-sm font-medium leading-5 mb-1 text-gray-700"
                htmlFor="emailConfirm"
              >
                Repetir e-mail
              </label>
              <input
                className={cx(
                  "block py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 w-full",
                  errors.emailConfirm ? "border-rose-500" : "border-gray-300"
                )}
                type="email"
                {...register("emailConfirm")}
              />
              {errors.emailConfirm?.type === "oneOf" && (
                <div className="text-xs text-red-500 mt-1">
                  Os dois e-mails devem ser iguais.
                </div>
              )}
              {errors.emailConfirm?.type === "required" && (
                <div className="text-xs text-red-500 mt-1">
                  Esse campo é obrigatório
                </div>
              )}
            </div>
            <div className="mt-6">
              <label
                className="block text-sm font-medium leading-5 mb-1 text-gray-700"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                className={cx(
                  "block py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 w-full",
                  errors.password ? "border-rose-500" : "border-gray-300"
                )}
                type="password"
                {...register("password")}
              />
              {errors.password?.type === "min" && (
                <div className="text-xs text-red-500 mt-1">
                  As senhas devem ter pelo menos 8 caracteres
                </div>
              )}
              {errors.password?.type === "max" && (
                <div className="text-xs text-red-500 mt-1">
                  A palavra-passe não deve exceder 16 caracteres
                </div>
              )}
              {errors.password?.type === "matches" && (
                <div className="text-xs text-red-500 mt-1">
                  As senhas devem ter 1 letra maiúscula, 1 letra minúscula, e 1
                  número.
                </div>
              )}
              {errors.password?.type === "required" && (
                <div className="text-xs text-red-500 mt-1">
                  Esse campo é obrigatório
                </div>
              )}
            </div>
            <div className="mt-6">
              <label
                className="relative flex items-start mt-2"
                htmlFor="agreement"
              >
                <div className="flex items-center h-5">
                  <input
                    className={cx(
                      "h-4 w-4 text-indigo-600 transition duration-150 ease-in-out cursor-pointer",
                      {
                        "border-red-300": errors.agreement,
                      }
                    )}
                    type="checkbox"
                    {...register("agreement")}
                  />
                </div>
                <div className="ml-2 text-sm leading-5">
                  <span className="font-medium text-gray-700">
                    Eu li e aceito os{" "}
                    <a
                      className="underline"
                      href="https://kiwify.com.br/termos-de-uso"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      termos de uso
                    </a>
                    ,{" "}
                    <a
                      className="underline"
                      href="https://kiwify.com.br/licenca-de-uso-software"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      termos de licença de uso de software
                    </a>
                    ,{" "}
                    <a
                      className="underline"
                      href="https://kiwify.com.br/politica-de-conteudo"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      política de conteúdo
                    </a>{" "}
                    da Kiwify
                  </span>
                  {errors.agreement?.type === "oneOf" && (
                    <div className="text-red-500 border-b-0">
                      (Esse campo é obrigatório)
                    </div>
                  )}
                </div>
              </label>
            </div>
            <div className="mt-6">
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                type="submit"
              >
                Criar conta
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
