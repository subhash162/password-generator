import { useCallback, useEffect,useRef } from 'react';
import { useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(7);
  const [hasNumbers, setHasNumbers] = useState(false);
  const [hasChar, setHasChar] = useState(false);
  const [password, setPassword] = useState('');

  //useRef
  const passwordInput = useRef(null);

  const generatePassword = useCallback(() => {
  
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (hasNumbers) str += '012345678'
    if (hasChar) str += "!@#$%^&*()"
  
    for (let i = 1; i <= length; i++) {

      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }
    setPassword(pass);
  }, [length, hasNumbers, hasChar, setPassword])
  
  const copyPassword = useCallback(() => {
    passwordInput.current?.select();
    window.navigator.clipboard.writeText(password);
   },[password])

  useEffect(() => {
    generatePassword()
  }, [length, hasNumbers, hasChar, generatePassword]);
  return (
    <div className='container'>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h2 className='text-white text-center my-3'>Password generator</h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder='password'
            readOnly
            ref={passwordInput}
          />
          <button
            onClick={copyPassword}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
          
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex flex-col gap-y-1">
            
            <input
              type="checkbox"
              defaultChecked={hasNumbers}
              id="numbers"
              onChange={(e) => {
                setHasNumbers((prev)=>!prev)
              }}
            />
            <label
              htmlFor="numbers">Numbers</
              label>
            
          </div>


          <div className="flex flex-col gap-y-1">
            <input
              type="checkbox"
              defaultChecked={hasChar}
              id="charactersInput"
              onChange={(e) => {
                setHasChar((prev) => !prev)
              }}
            />
            <label
              htmlFor='characterInput'>Characters</
            label>
          </div>


        </div> 


      </div>
    </div>
  )
}

export default App
