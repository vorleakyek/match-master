import { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { AppContext } from '../components/AppContext';

type Props = {
  action: 'sign-in' | 'sign-up';
};

export function AuthPage({ action }: Props) {
  const navigate = useNavigate();
  const { user, handleSignIn } = useContext(AppContext);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const alternateActionTo = action === 'sign-up' ? '/sign-in' : '/sign-up';
  const alternateActionText =
    action === 'sign-up' ? 'Create account' : 'Sign In';

  const welcomeMessage =
    action === 'sign-in' ? (
      <>
        New User? <Link to={alternateActionTo}>Create an account</Link>
      </>
    ) : (
      <>
        Already have an account? <Link to={alternateActionTo}>Sign In</Link>
      </>
    );

  return (
    <div className="container">
      <div className="row">
        <div className="column-full">
          <h1>{alternateActionText}</h1>
          <p>{welcomeMessage}</p>
        </div>
      </div>
      <AuthForm key={action} action={action} onSignIn={handleSignIn} />
    </div>
  );
}
