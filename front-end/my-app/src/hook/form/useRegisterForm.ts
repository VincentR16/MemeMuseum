import { useForm } from "@mantine/form";
import type { RegisterRequest } from "../../types/RegisterRequest.types";

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
      name: (val) => (val.trim().length > 0 ? null : "Il nome è obbligatorio"),

      surname: (val) =>
        val.trim().length > 0 ? null : "Il cognome è obbligatorio",

      email: (val) =>
        /^\S+@\S+\.\S+$/.test(val)
          ? null
          : "Inserisci un indirizzo email valido",

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
          : "Seleziona il genere",

      birthDate: (val) => (val ? null : "La data di nascita è obbligatoria"),
    },
  });
}
