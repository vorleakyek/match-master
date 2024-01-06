import { FormEvent } from "react";

export function RegistrationForm() {

  async function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(userData)
      };
      const res = await fetch('/api/auth/create-account', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const user = await res.json();
      console.log('Registered', user);
    } catch(err) {
      alert(`Error registering user: ${err}`);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column-full">
          <h1>Create account</h1>
          <p>Already have an account? Sign In</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="column-full">
            <label className="block">
              Username:
              <input
                required
                name="usernameText"
                type="text"
                className="input-style-1"
              />
            </label>
            <label className="block">
              Password:
              <input
                required
                name="password"
                type="password"
                className="input-style-1"
              />
            </label>
          </div>
        </div>
        <div className="row">
        <div className="column-full">
          <button className="btn-1">Sign Up</button>
        </div>
      </div>
      </form>
    </div>
  )
}
