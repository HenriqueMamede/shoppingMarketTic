import { useEffect, useState } from "react";
import { isNull } from "lodash";
import authService from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isNull(authService.getLoggedUser())) {
      navigate("/");
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = authService.authenticate(formData);
      console.log(res);
      authService.setLoggedUser(await res);
      return navigate("/");
    } catch {
      console.log("Algo deu errado");
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>Login Form</h1>
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => void handleSubmit(e)}
      >
        <Input
          type="text"
          placeholder="Email"
          value={formData.email}
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <Button type="submit">Login</Button>
      </form>
      <span className="cursor-pointer" onClick={() => navigate("/register")}>
        Sign Up
      </span>
    </div>
  );
}

export default Login;
