import { NavBar } from "./NavBar";
import { RegistrationForm } from "./RegistrationForm";
import { SignInForm } from "./SignInForm";
export default function App() {
  return (
    <>
      <div>
        <NavBar/>
        <RegistrationForm/>
        <SignInForm/>
      </div>
    </>
  )
}
