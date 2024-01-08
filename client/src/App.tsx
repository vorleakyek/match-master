import { NavBar } from "./NavBar";
import { RegistrationForm } from "./RegistrationForm";
import { SignInForm } from "./SignInForm";
import {HomePage} from "./HomePage";

export default function App() {
  return (
    <>
      <div>
        <NavBar/>
        <RegistrationForm/>
        <SignInForm/>
        <HomePage/>
      </div>
    </>
  )
}
