import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  Select,
  Stack,
  TextInput,
  SimpleGrid,
} from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useLoginForm } from "../hook/form/useLoginForm";
import { useRegisterForm } from "../hook/form/useRegisterForm";
import { DatePickerInput } from "@mantine/dates";

export function AuthenticationForm() {
  const [type, toggle] = useToggle(["Login", "Register"]);
  const loginForm = useLoginForm();
  const registerForm = useRegisterForm();

  return (
      <form
        onSubmit={
          type === "Login"
            ? loginForm.onSubmit(() => {})
            : registerForm.onSubmit(() => {})
        }
      >
        <Stack>
          {type === "Register" && (
            <>
              <SimpleGrid cols={2}>
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={registerForm.values.name}
                  onChange={(event) =>
                    registerForm.setFieldValue(
                      "name",
                      event.currentTarget.value
                    )
                  }
                  error={registerForm.errors.name}
                  radius="md"
                  withAsterisk
                />
                <TextInput
                  label="Surname"
                  placeholder="Your Surname"
                  value={registerForm.values.surname}
                  onChange={(event) =>
                    registerForm.setFieldValue(
                      "surname",
                      event.currentTarget.value
                    )
                  }
                  error={registerForm.errors.surname}
                  radius="md"
                  withAsterisk
                />
              </SimpleGrid>

              <SimpleGrid cols={2}>
                <TextInput
                  label="Username"
                  placeholder="Your username"
                  value={registerForm.values.username}
                  onChange={(event) =>
                    registerForm.setFieldValue(
                      "username",
                      event.currentTarget.value
                    )
                  }
                  error={registerForm.errors.username}
                  radius="md"
                  withAsterisk
                />
                <Select
                  comboboxProps={{ withinPortal: true }}
                  data={["Male", "Female", "Other"]}
                  placeholder="Pick one"
                  label="Gender"
                  withAsterisk
                  value={registerForm.values.gender}
                  onChange={(value) =>
                    registerForm.setFieldValue("gender", value || "")
                  }
                  error={registerForm.errors.gender}
                  radius="md"
                />
              </SimpleGrid>

              <SimpleGrid cols={2}>
                <DatePickerInput
                  placeholder="Pick a date"
                  label="Date of Birth"
                  value={registerForm.values.birthDate}
                  onChange={(value) =>
                    registerForm.setFieldValue("birthDate", value || "")
                  }
                  error={registerForm.errors.birthDate}
                  withAsterisk
                  radius="md"
                />
                <TextInput
                  label="Location"
                  withAsterisk
                  value={registerForm.values.location}
                  error={registerForm.errors.location}
                  {...registerForm.getInputProps("location")}
                  radius="md"
                />
              </SimpleGrid>
            </>
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={
              type === "Login"
                ? loginForm.values.emailOrUsername
                : registerForm.values.email
            }
            onChange={(event) => {
              if (type == "Login") {
                loginForm.setFieldValue(
                  "emailOrUsername",
                  event.currentTarget.value
                );
              } else {
                registerForm.setFieldValue("email", event.currentTarget.value);
              }
            }}
            error={
              type === "Login"
                ? loginForm.errors.email
                : registerForm.errors.email
            }
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={
              type === "Login"
                ? loginForm.values.password
                : registerForm.values.password
            }
            onChange={(event) => {
              if (type == "Login") {
                loginForm.setFieldValue("password", event.currentTarget.value);
              } else {
                registerForm.setFieldValue(
                  "password",
                  event.currentTarget.value
                );
              }
            }}
            error={
              type === "Login"
                ? loginForm.errors.password
                : registerForm.errors.password
            }
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
          >
            {type === "Register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" color="violet" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
  );
}
