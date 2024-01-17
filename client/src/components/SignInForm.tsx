import { FormEvent } from "react";

export function SignInForm() {

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
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const {user, token} = await res.json();
      sessionStorage.setItem('token', token);
      console.log('signed in', user,'received token: ', token);
    } catch(err) {
      alert(`Error registering user: ${err}`);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column-full">
          <h1>Sign in</h1>
          <p>
            New user? <Link to="/">Create an account</Link>
          </p>
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
            <button className="btn-1">Sign In</button>
          </div>
        </div>
      </form>
    </div>
  );
}