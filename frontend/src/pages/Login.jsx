import Form from "../components/Form";
import Header from "../components/Header";

function Login() {
  return (
    <>
      <Header />
      <Form route="/api/token/" method="login" />
    </>
  );
}
export default Login;
