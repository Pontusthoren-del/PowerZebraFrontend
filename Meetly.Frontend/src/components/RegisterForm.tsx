import { useState } from "react";
import type { SignupForm } from "../types/Auth";

const fields = [
  { name: "firstName", placeholder: "Förnamn", maxLength: 50 },
  { name: "lastName", placeholder: "Efternamn", maxLength: 50 },
  { name: "email", type: "email", placeholder: "E-post" },
  { name: "password", type: "password", placeholder: "Lösenord" },
];

interface Props {
  onSubmit: (form: SignupForm) => void;
}

export default function RegisterForm({ onSubmit }: Props) {
  const [form, setForm] = useState<SignupForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <input
          key={field.name}
          name={field.name}
          type={field.type ?? "text"}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          value={form[field.name as keyof SignupForm]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit" className="auth-button">
        Registera
      </button>
    </form>
  );
}
