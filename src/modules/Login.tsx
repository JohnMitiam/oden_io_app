import { auth } from "../firebase/firebase"
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router";
import { routes } from "../config/routes";
import {
  InputEmail,
  InputPassword,
  LoginWithGoogle,
  SignInButton,
} from "../core/components/Login";
import { OdenLogo } from "../core/OdenLogo";

interface Props {
  switchMode: () => void;
}

export const Login: React.FC<Props> = ({ switchMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || routes.HOME;

  const continueWithGoogle = async () => {
    setIsAuth(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate(from, { replace: true });
      })
      .catch((error: any) => {
        console.log(error);
        setError(error.message);
        setIsAuth(false);
      });
  };

  const signInWithEmail = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setIsAuth(true);
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        navigate(from, { replace: true });
      })
      .catch((error: any) => {
        console.log(error);
        setError("Error: Invalid Email/Password");
        setIsAuth(false);
      });
  };

  return (
    <div className="grid grid-cols-12 px-20 h-screen items-center pt-6">
      <div className="col-span-9 px-8">
        <p className="text-white text-3xl text-start font-black tracking-widest">
        Welcome Back.<br/>
        Experience the Difference.
        </p>
      </div>
      <div className="shadow-md border rounded-2xl border-gray-300 p-8 w-full space-y-5 bg-gray-100 col-span-3">
        <div className="">
          <div className="flex justify-center border-b border-gray-300">
            <OdenLogo />
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <InputEmail
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <InputPassword
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div className="text-sm text-red-500 italic">{error}</div>
            )}
          </div>

          <div className="space-y-2">
            <SignInButton onClick={() => signInWithEmail()} >
              {isAuth ? "Loading..." : "Login"}
            </SignInButton>
            <div className="w-full flex items-center justify-center relative py-4">
              <div className="w-full h-0.5 bg-black"></div>
              <p className="text-lg absolute text-black px-2 bg-gray-100">OR</p>
            </div>
            <LoginWithGoogle
              onClick={() => continueWithGoogle()}
              disabled={isAuth}
            >
              Continue with Google
            </LoginWithGoogle>
          </div>

          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-normal text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={switchMode}
                className="font-semibold italic text-primary-500 hover:underline"
              >
                Sign up now!
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
