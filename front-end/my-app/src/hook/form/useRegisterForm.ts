import { useForm } from "@mantine/form";
import type { RegisterRequest } from "../../types/RegisterRequest.type";

export function useRegisterForm() {
  return useForm<RegisterRequest>({
    initialValues: {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      gender: "",
      birthDate: "",
      location: "",
    },

    validate: {
      name: (val) => (val.trim().length > 0 ? null : "Name is required"),
      username: (val) => (val.trim().length > 0 ? null : "Username is required"),

      surname: (val) =>
        val.trim().length > 0 ? null : "Surname is required",

      email: (val) =>
        /^\S+@\S+\.\S+$/.test(val)
          ? null
          : "Email address not valid",

      password: (val) =>
        val.length < 6
          ? "La password deve contenere almeno 6 caratteri"
          : !/[A-Z]/.test(val)
          ? "La password deve contenere almeno una lettera maiuscola"
          : !/[0-9]/.test(val)
          ? "La password deve contenere almeno un numero"
          : null,
      location: (val) => (val ? null : "Location'name is required"),

      gender: (val) =>
        typeof val === "string" && val.trim().length > 0
          ? null
          : "select your gender",

      birthDate: (val) => (val ? null : "Birthdate is required"),
    },
  });
}
