import { auth } from "../firebase/firebase"
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { routes } from "../config/routes";
import {
  InputEmail,
  InputPassword,
  LoginWithGoogle,
  SignInButton,
} from "../core/components/Login";
import { InputText } from "../core/components/Form";
import { OdenLogo } from "../core/OdenLogo";

interface Props {
  switchMode: () => void;
}

export const Signup: React.FC<Props> = ({ switchMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuth, setIsAuth] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // OTP
  // const [showOtp, setShowOtp] = useState(false);
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [verificationId, setVerificationId] = useState<any>(null);
  // const [tempUser, setTempUser] = useState<any>(null)
  // const recaptchaRef = useRef<any>(null);
  // const { setIsVerifyingOTP } = useAuth();
  
  // const passwordsMatch = password === confirmPassword && password.length > 0;

  const from = location.state?.from?.pathname || routes.HOME;

  const continueWithGoogle = async () => {
    setIsAuth(true);
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const isNewUser = getAdditionalUserInfo(result)?.isNewUser;

      console.log("Firebase Auth Result", {isNewUser, uid: result.user.uid});

      // if (isNewUser) {
      //   console.log("Show OTP Triggered!");
      //   setIsVerifyingOTP(true);
      //   setTempUser(result.user);
      //   setShowOtp(true)
      // } else {
      //   console.log(result.user.uid, "New user?", isNewUser);
      //   navigate(from, { replace: true });
      // }
      console.log(result.user.uid, "New user?", isNewUser);
      navigate(from, { replace: true });
    } catch (error: any) {
      console.log(error);
      setError(error.message);
      setIsAuth(false);
    }
  };

  // const sendOtp = async () => {
  //   try {
  //     if (recaptchaRef.current) {
  //       recaptchaRef.current.clear();
  //     }

  //     const recaptchaVerify = new RecaptchaVerifier(auth, 'recaptcha-container', {
  //       size: 'invisible',
  //       callback: (res: any) => {
  //         console.log(res, "Recaptcha:")
  //       }
  //     });

  //     recaptchaRef.current = recaptchaVerify;

  //     const provider = new PhoneAuthProvider(auth);
  //     const id = await provider.verifyPhoneNumber(phoneNumber, recaptchaVerify);
  //     setVerificationId(id);
  //   } catch (error: any) {
  //     setError("Failed to send OTP:" + error.message);
  //   }
  // };

  // const verifyOtp = async (otpCode: string) => {
  //   try {
  //     const credential = PhoneAuthProvider.credential(verificationId, otpCode);
  //     await linkWithCredential(tempUser, credential);

  //     navigate(from, {replace: true})
  //   } catch (error: any) {
  //     console.error(error);
  //     setError("Verification failed!");
  //   }
  // };

  const signUpwithEmail = async () => {
    setIsAuth(true);
    setError("");

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(response.user, {
        displayName: name,
      });

      console.log(response.user.uid, "Name saved!", response.user.displayName);
      navigate(from, { replace: true });
    } catch (error: any) {
      console.log(error);
      setError(error.message);
      setIsAuth(false);
    }
  };

  return (
    <div className="grid grid-cols-12 px-20 h-screen items-center pt-6">
    <div className="col-span-9 px-8">
        <p className="text-white text-3xl text-start font-black tracking-widest">
        Join the Community.<br/>
        Create an Account.
        </p>
      </div>
      <div className="shadow-md border rounded-2xl border-gray-300 p-8 w-full space-y-5 bg-gray-100 col-span-3">
        <div>
            <div className="flex justify-center border-b border-gray-300">
              <OdenLogo />
            </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <InputText
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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

            <InputPassword
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {password !== confirmPassword && confirmPassword.length > 0 && (
              <p className="text-xs text-red-500 italic">Passwords do not match</p>
            )}

            {error && (
              <div className="text-sm text-red-500 italic">{error}</div>
            )}
          </div>

          <div className="space-y-2">
            <SignInButton onClick={() => signUpwithEmail()}>
              {isAuth ? "Creating Account..." : "Sign up"}
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

          {/* {showOtp && (
            <Modal show={true}>
              <PopupHeader onClose={() => setShowOtp(false)}>
                <EyeSlashIcon className="w-5 text-gray-500" />
                Verify your Identity
              </PopupHeader>
              {!verificationId
              ? (
                <>
                <InputText label="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)} />
                <button onClick={sendOtp}
                  className="bg-primary-500 flex gap-x-4 text-white font-semibold text-sm items-center shadow-md rounded-md py-2 px-6 cursor-pointer">
                    Send Verifyication Code
                </button>
                </>
              ) : (
                <>
                  <InputText label="Enter OTP"
                  onChange={(e) => {
                    if (e.target.value.length === 6)
                      verifyOtp(e.target.value);
                  }} />
                  <p className="text-xs text-center">Verifying automatically at 6 digits...</p>
                </>
              )}

              <div id="recaptcha-container"></div>
            </Modal>
          )} */}

          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-normal text-gray-600">
              Do you have an account?{" "}
              <button
                onClick={switchMode}
                className="font-semibold italic text-primary-500 hover:underline"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
