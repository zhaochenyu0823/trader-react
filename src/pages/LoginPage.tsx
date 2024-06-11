import { useState, useEffect } from 'react';
import { SignInOutput, signIn, signOut } from 'aws-amplify/auth';
import SignOutButton from './SignOutButton';




const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [challengeResponse, setChallengeResponse] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [getuser, setUser] = useState<SignInOutput | null>(null);
  const [stage, setStage] = useState(1);




  useEffect(() => {
    // 恢复登录状态和用户信息
    if (getuser) {
      setIsLoggedIn(true);
    }
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

      //   if (user.nextStep.signInStep === 'CUSTOM_CHALLENGE') {
      //     setStage(2);
      //   }
    } catch (error) {
      console.log('Error signing in', error);
    }
  };


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

  async function handleSignOut() {
    try {
      await signOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }


  



  return (



    
    <div>
      <button onClick={handleSignOut}>Sign out</button>
      {stage === 1 && (
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

      {stage === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter verification code"
            value={challengeResponse}
            onChange={(e) => setChallengeResponse(e.target.value)}
          />
          <button onClick={handleSubmitChallenge}>Submit</button>
        </div>
      )}








      {isLoggedIn ? (
        <div>
          <p>Hello </p>
          <button onClick={handleSignOut}>Sign out</button>
        </div>

      ) : (
        <p>Please sign in.</p>
      )}

      <SignOutButton/>
    

    </div>

  );

};
export default LoginPage;
