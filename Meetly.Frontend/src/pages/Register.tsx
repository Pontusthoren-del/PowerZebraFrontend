import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <div className="auth-page">
      <h1>Skapa konto</h1>
      <RegisterForm onSubmit={(form) => console.log(form)} />
    </div>
  );
}
