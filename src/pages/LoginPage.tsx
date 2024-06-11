import { useState, useEffect } from 'react';
import { SignInOutput, getCurrentUser, signIn, signOut } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';




const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [challengeResponse, setChallengeResponse] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [getuser, setUser] = useState<SignInOutput | null>(null);
  const [stage] = useState(1);

  // const fetchTokens = async () => {
  //   try {
  //     const { tokens } = await fetchAuthSession({ forceRefresh: true });
  //     console.log(tokens);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);
      console.log(err);
    }
  }

  useEffect(() => {

    currentAuthenticatedUser();

  }, []);



  const handleSignIn = async () => {
    try {
      await signIn({
        username,
        password,
        // options: {
        //     authFlowType: 'CUSTOM_WITH_SRP',
        //   },
      })
        .then(user => {
          setIsLoggedIn(true);
          setUser(user);
          //setStage(2);
          console.log("signInStep" + user.nextStep.signInStep);
        })
    } catch (error) {
      console.log('Error signing in', error);
    }
  };

  async function handleSignOut() {
    try {
      await signOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }


  const handleSubmitChallenge = async () => {
    // try {
    //   const loggedUser = await Auth.sendCustomChallengeAnswer(user, challengeResponse);
    //   setUser(loggedUser);
    //   if (loggedUser.signInUserSession) {
    //     console.log('Logged in successfully');
    //   }
    // } catch (error) {
    //   console.log('Error submitting challenge', error);
    // }
  };

  return (

    <div>
      {isLoggedIn ? (
        <div>
          <p>Hello </p>
          <button onClick={handleSignOut}>Sign out</button>
        </div>

      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      )}
    </div>
  );

};
export default LoginPage;
