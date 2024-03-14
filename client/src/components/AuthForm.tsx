import { useState, FormEvent, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Auth, signIn, signUp } from '../lib';

type Props = {
  action: 'sign-up' | 'sign-in';
  onSignIn: (auth: Auth) => void;
};

export function AuthForm({ action, onSignIn }: Props) {
  const navigate = useNavigate();
  const [error, setError] = useState<ReactNode>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    async function handleSignUp(username: string, password: string) {
      await signUp(username, password);
      navigate('/sign-in');
    }
    async function handleSignIn(username: string, password: string) {
      const auth = await signIn(username, password);
      if (auth.user && auth.token) {
        onSignIn(auth);
      } else {
        setError(() => true);
      }
    }
    event.preventDefault();
    if (event.currentTarget === null) throw new Error();
    const formData = new FormData(event.currentTarget);
    const entries = Object.fromEntries(formData.entries());
    const username = entries.username as string;
    const password = entries.password as string;
    try {
      if (action === 'sign-up') {
        handleSignUp(username, password);
      } else {
        handleSignIn(username, password);
      }
    } catch (err) {
      setError(err as ReactNode);
    }
  }

  const submitButtonText = action === 'sign-up' ? 'Register' : 'Log In';
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="column-full">
          <label className="block">
            Username:
            <input
              required
              autoFocus
              name="username"
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
          <span>
            {error && <div style={{ color: 'red' }}>Invalid Login</div>}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="column-full">
          <button className="btn-1">{submitButtonText}</button>
        </div>
      </div>
    </form>
  );
}
