import { auth } from "../firebase/firebase"
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from "react-router";
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

  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const continueWithGoogle = async () => {
    setIsAuth(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate(`${routes.HOME}`);
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
        navigate(`${routes.HOME}`);
      })
      .catch((error: any) => {
        console.log(error);
        setError("Error: Invalid Email/Password");
        setIsAuth(false);
      });
  };

  return (
    <div className="grid grid-cols-12 py-8 px-6 h-screen items-center">
    <div className="col-span-9"></div>
      <div className="shadow-md border rounded-2xl border-gray-300 px-6 w-full py-12 space-y-8 bg-white col-span-3">
        <div className="">
          <div className="flex justify-center border-b border-gray-300">
            <OdenLogo />
          </div>
          <p className="text-base text-gray-600">Welcome Back !</p>
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
            <SignInButton onClick={() => signInWithEmail()} disabled={isAuth}>
              Login
            </SignInButton>
            <div className="w-full flex items-center justify-center relative py-4">
              <div className="w-full h-0.5 bg-black"></div>
              <p className="text-lg absolute text-black px-2 bg-white">OR</p>
            </div>
            <LoginWithGoogle
              onClick={() => continueWithGoogle()}
              disabled={isAuth}
            >
              Continue with Google
            </LoginWithGoogle>
          </div>

          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-normal text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={switchMode}
                className="font-semibold italic text-primary-400 hover:underline"
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
