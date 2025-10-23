import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  type PaperProps,
  PasswordInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useLoginForm } from "../hook/form/useLoginForm";
import { useRegisterForm } from "../hook/form/useRegisterForm";
import { DatePickerInput } from "@mantine/dates";

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);
  const loginForm = useLoginForm();
  const registerForm = useRegisterForm();

  return (
    <Paper radius="md" p="lg" withBorder {...props}>
      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={
          type === "login"
            ? loginForm.onSubmit(() => {})
            : registerForm.onSubmit(() => {})
        }
      >
        <Stack>
          {type === "register" && (
            <>
              <TextInput
                label="Name"
                placeholder="Your name"
                value={registerForm.values.name}
                onChange={(event) =>
                  registerForm.setFieldValue("name", event.currentTarget.value)
                }
                error={registerForm.errors.name}
                radius="md"
                withAsterisk
              />
              <TextInput
                mt="md"
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
              <TextInput
                label="username"
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
                mt="md"
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
              ></Select>

              <DatePickerInput
                mt="md"
                placeholder="Pick a date"
                label="Date of Birth"
                value={registerForm.values.birthDate}
                onChange={(value) =>
                  registerForm.setFieldValue("birthDate", value || "")
                }
                error={registerForm.errors.birthDate}
                withAsterisk
              />

              <TextInput
                label="Location"
                withAsterisk
                value={registerForm.values.location}
                error={registerForm.errors.location}
                {...registerForm.getInputProps("location")}
              />
            </>
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={
              type === "login"
                ? loginForm.values.emailOrUsername
                : registerForm.values.email
            }
            onChange={(event) => {
              if (type == "login") {
                loginForm.setFieldValue(
                  "emailOrUsername",
                  event.currentTarget.value
                );
              } else {
                registerForm.setFieldValue("email", event.currentTarget.value);
              }
            }}
            error={
              type === "login"
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
              type === "login"
                ? loginForm.values.password
                : registerForm.values.password
            }
            onChange={(event) => {
              if (type == "login") {
                loginForm.setFieldValue("email", event.currentTarget.value);
              } else {
                registerForm.setFieldValue("email", event.currentTarget.value);
              }
            }}
            error={
              type === "login"
                ? loginForm.errors.email
                : registerForm.errors.email
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
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
