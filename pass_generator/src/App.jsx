import { useState, useCallback , useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);  
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsaazxcvbnm";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!~@#$%^&*()_+|}{:";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassToClick = useCallback(() =>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <h1 className="text-4xl text-center mb-8">Password Generator</h1>
      <div className="w-full max-w-md mx-auto bg-gray-700 p-6 rounded-lg shadow-md text-white">
        <div className="mb-4">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-3 bg-gray-800 rounded-lg outline-none"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyPassToClick}
          className="mt-2 bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-lg">Copy</button>
        </div>

        <div className="mb-4">
          <label htmlFor="lengthRange" className="block">Length: {length}</label>
          <input
            type="range"
            id="lengthRange"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer w-full"
            onChange={(evt) => setLength(evt.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput" className="ml-2">Numbers</label>
        </div>

        <div className="mb-4">
          <input
            type="checkbox"
            checked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput" className="ml-2">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
