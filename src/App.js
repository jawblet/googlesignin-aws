import React, { useEffect, useState } from 'react';
import { Hub, Auth } from 'aws-amplify';
import { Loader } from 'skylight-react';
import './App.css';
import 'skylight-react/dist/skylight.css';
import Landing from './modules/Landing';
import UserHome from './modules/UserHome';

function App() {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

async function getUser() {
try {
const token = await Auth.currentAuthenticatedUser();
setLoading(false);
setUser(token);
} catch(err) {
console.log(err);
setLoading(false);
}
}

//check user on load, sign in, sign out
useEffect(() => {
Hub.listen('auth', ({ payload }) => {
if (payload.event === 'signIn') {
  return getUser();
}
if (payload.event === 'signOut') {
  setUser(null);
  return setLoading(false);
}
});
getUser();
}, []);

if(loading) return <Loader/>

return (
<div className="App">
  {user
     ? <UserHome email={user.attributes.email}/>
     : <Landing/>
}
</div>
);
}

export default (App);