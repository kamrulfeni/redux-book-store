/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { usePostRegisterMutation } from "../../redux/features/user/userApi";
import Swal from "sweetalert2";
import { IErrorPayload } from "../../interface/authInterface";

type TFormData = {
  name: string;
  email: string;
  password: string;
  cPassword: string;
};

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TFormData>(initialState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registerPost] = usePostRegisterMutation();
  const { name, email, password, cPassword } = formData;

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (password !== cPassword) {
      return setErrorMessage("Passwords do not match");
    }
    setErrorMessage(null);

    try {
      const response = await registerPost({ name, email, password });
      if ("error" in response) {
        const error: IErrorPayload = response.error as IErrorPayload;
        setErrorMessage(error.message);
      } else {
        setErrorMessage(null);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        Toast.fire({
          icon: "success",
          title: "Signed up successfully",
        });
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user_form">
      <div className="container py-4 m-auto">
        <div className="user_form-body">
          <h4 className="fw-bold text-center  mb-3">
            Books<span className="text_bg-primary pe-1">Bazar</span>
          </h4>

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <label htmlFor="name" className="text-capitalize mb-2">
                full name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full name"
                onChange={changeHandler}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <label htmlFor="name" className="text-capitalize mb-2">
                email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                onChange={changeHandler}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <label htmlFor="name" className="text-capitalize mb-2">
                password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={changeHandler}
                minLength={6}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <label htmlFor="name" className="text-capitalize mb-2">
                confirm password
              </label>
              <input
                type="password"
                id="cPassword"
                name="cPassword"
                placeholder="Confirm Password"
                minLength={6}
                onChange={changeHandler}
                required
              />
            </Form.Group>

            <div className="invalid-feedback d-block fw-bold">
              {errorMessage}
            </div>

            <button className="btn" type="submit">
              Register
            </button>
          </Form>
          <div className="mt-4">
            Already have an account? <Link to="/signin"> Login now</Link>
          </div>
          <div className="text-center">
            <Link to="/" className="btn btn-info px-5 mt-3">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
