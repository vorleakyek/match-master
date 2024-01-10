import { NavBar } from "./NavBar";
import { RegistrationForm } from "./RegistrationForm";
import { SignInForm } from "./SignInForm";
import {HomePage} from "./HomePage";
import { GamePage } from "./GamePage";

export default function App() {
  return (
    <>
      <div>
        <NavBar/>
        <RegistrationForm/>
        <SignInForm/>
        <HomePage/>
        <GamePage/>
      </div>
    </>
  )
}
