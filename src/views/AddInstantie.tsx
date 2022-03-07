import {useRouter} from "next/router";
import {useStore} from "../store/use-store";
import React from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

interface IAddInstantieForm {
  name: string;
  startDate: Date | null;
  endDate: Date | null;
}

export const AddInstantieView: React.FC = (): JSX.Element => {
  const router = useRouter();
  const {categorieList, setCategorieList} = useStore();

  const validationSchema = yup
    .object({
      name: yup.string().required("Verplicht veld"),
      startDate: yup.date().required().nullable("Verplicht veld"),
      endDate: yup
        .date()
        .required("Verplicht veld")
        .nullable()
        .when("startDate", (startDate, yup) => {
          if (startDate && startDate !== "Invalid Date") {
            return (
              startDate &&
              yup.min(startDate, "Startdatum moet vóór de einddatum zijn")
            );
          }
        }),
    })
    .required();

  const defaultValues: IAddInstantieForm = {
    name: "",
    startDate: null,
    endDate: null,
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm<IAddInstantieForm>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: IAddInstantieForm) => {
    const list = [...categorieList];

    list[router.query["category"] as unknown as number].items.push({
      ...data,
    });

    setCategorieList(list);

    reset();
    router.replace({
      pathname: "/",
      query: {"selected-category": router.query["category"]},
    });
  };

  React.useEffect(() => {
    if (router.isReady && !router.query["category"]) {
      router.replace("/");
    }
  }, [router.isReady]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Naam: </label>
        <input {...register("name")} type="text" />
        {errors?.name && (
          <p className="error-message">{errors?.name?.message}</p>
        )}
      </div>
      <div>
        <label>Begin datum: </label>
        <input {...register("startDate")} type="date" />
        {errors?.startDate && (
          <p className="error-message">{errors?.startDate?.message}</p>
        )}
      </div>
      <div>
        <label>Einddatum: </label>
        <input {...register("endDate")} type="date" />
        {errors?.endDate && (
          <p className="error-message">{errors?.endDate?.message}</p>
        )}
      </div>
      <div>
        <button type="submit">Indienen</button>
        <button onClick={() => router.push("/")}>Rug</button>
      </div>
      <style jsx>{`
        .error-message {
          color: red;
        }
      `}</style>
    </form>
  );
};
