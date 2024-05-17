import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { AlertCircle, Loader, LoaderCircle } from "lucide-react";
import { loading1 } from "../assets";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Form = ({ route, method }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post(route, {
        first_name: firstName,
        last_name: lastName,
        email,
        username: username.toLowerCase(),
        password,
      });

      if (method === "login") {
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/story");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setError("Invalid username or password!");
      } else if (error.response.status === 400) {
        setError("A user with that username already exists.");
      } else {
        setError("Something went wrong, please try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen py-6">
        <div className="container mx-auto">
          <div className="flex flex-col max-w-md mx-auto text-center">
            <form className="p-8 rounded">
              <div className="mb-10 space-y-3">
                <h4 className="text-3xl">
                  {name === "Login"
                    ? "Login to your account"
                    : "Create an account"}
                </h4>
                <p className="text-sm text-gray-400">
                  {name === "Login"
                    ? "Enter your account details to login"
                    : "Enter your details below to create your account"}
                </p>
              </div>
              {name === "Register" && (
                <div className="flex -mx-3">
                  <div className="flex w-1/2 px-3">
                    <div className="flex w-full mb-4 rounded ">
                      <input
                        className="w-full px-4 py-3 text-xs font-semibold leading-none bg-transparent rounded-lg outline-none ring-2 ring-gray-800"
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex w-1/2 px-3">
                    <div className="flex w-full mb-4 rounded ">
                      <input
                        className="w-full px-4 py-3 text-xs font-semibold leading-none bg-transparent rounded-lg outline-none ring-2 ring-gray-800"
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex mb-4 rounded ">
                <input
                  className="w-full px-4 py-3 text-xs font-semibold leading-none bg-transparent rounded-lg outline-none ring-2 ring-gray-800"
                  type="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              {name === "Register" && (
                <div className="flex mb-4 rounded ">
                  <input
                    className="w-full px-4 py-3 text-xs font-semibold leading-none bg-transparent rounded-lg outline-none ring-2 ring-gray-800"
                    type="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="flex mb-6 rounded ">
                <input
                  className="w-full px-4 py-3 text-xs font-semibold leading-none bg-transparent rounded-lg outline-none ring-2 ring-gray-800"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <Alert variant="destructive" className="mb-6 text-left">
                  <AlertCircle className="w-4 h-4" />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <button
                className="flex items-center justify-center w-full p-4 text-xs font-semibold leading-none text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-700"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading && (
                  <LoaderCircle className="mr-2 animate-spin" size={15} />
                )}
                {name}
              </button>
            </form>
            <div>
              <p className="text-xs text-center text-blue-200">
                <a className="underline hover:text-blue-100" href="#">
                  Police privacy
                </a>{" "}
                and{" "}
                <a className="underline hover:text-blue-100" href="#">
                  Terms of Use
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
