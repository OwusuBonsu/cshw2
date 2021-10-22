import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { uid, password, salt, hash } from "./Values";
import md5 from "md5";

function App() {
  const [indexSelected, setIndex] = useState(0);
  const [passwordSelected, setPassword] = useState(password[0]);
  const [saltSelected, setSalt] = useState(salt[0]);
  const [hashSelected, setHash] = useState(hash[0]);
  const [matchStatus, setMatchStatus] = useState(false);

  const [crackedPass, getCrackedPass] = useState();
  const [crackedSalt, getCrackedSalt] = useState();

  let handleHashChange = (e) => {
    setHash(e.target.value);
  };

  let handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  let handleSaltChange = (e) => {
    setSalt(e.target.value);
  };

  let handleIndexChange = (e) => {
    setIndex(e.target.value);
  };

  //Checks if currently selected password and salt are equal to selected hash
  const checkHash = () => {
    const Hash = md5(`${passwordSelected}${saltSelected}`);
    if (Hash === hashSelected) {
      console.log("Match");
      setMatchStatus(true);
    } else {
      console.log("No match");
      setMatchStatus(false);
    }
  };

  const checkInfo = () => {
    console.log(indexSelected);
    getCrackedPass(password[indexSelected]);
    getCrackedSalt(salt[indexSelected]);
  };

  return (
    <div className="App">
      <div>Password</div>
      <select onChange={handlePasswordChange}>
        {uid.map((uid, index) => (
          <option value={`${password[index]}`}>{`${password[index]}`}</option>
        ))}
      </select>
      <div>Salt</div>
      <select onChange={handleSaltChange}>
        {uid.map((uid, index) => (
          <option value={`${salt[index]}`}>{`${salt[index]}`}</option>
        ))}
      </select>
      <div>Expected Hash</div>
      <select onChange={handleHashChange}>
        {uid.map((uid, index) => (
          <option value={`${hash[index]}`}>{`${hash[index]}`}</option>
        ))}
      </select>
      <button onClick={checkHash}>Hash</button>
      {matchStatus ? (
        <div>
          The input password and salt matches the hash value in the database
        </div>
      ) : (
        <div>
          The input password and salt does not match the hash value in the
          database
        </div>
      )}
      <br />
      <div>Cracker</div>
      <select onChange={handleIndexChange}>
        {uid.map((uid, index) => (
          <option value={`${[index]}`}>{`${uid}`}</option>
        ))}
      </select>
      <button onClick={checkInfo}>Get Salt / Password</button>
      <div>Salt: {crackedSalt}</div>
      <div>Password: {crackedPass}</div>
    </div>
  );
}

export default App;
