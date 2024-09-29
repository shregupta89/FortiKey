import { useState, useCallback, useRef, useEffect } from 'react'



function App() {
  // const [count, setCount] = useState(0)
  const [password,setPassword]=useState('')
  const [length,setLength]=useState(8)
  const [numAllowed,setnumAllowed]=useState(false)
  const [charAllowed,setcharAllowed]=useState(false)

  //useRef hook
  const passwordRef=useRef(null)

  const passGen=useCallback(()=>{
    let pass='';
    let str='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(numAllowed) str+='0123456789';
    if(charAllowed) str+='!@#$%^&*()-_=+[]{}|;:,.<>?/~';
    for(let i=0;i<length;i++){
      let charIndex=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(charIndex);
    }
    setPassword(pass)

  },[numAllowed,charAllowed,setPassword,length]);

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password)
    //This line uses the Clipboard API to write the password string to the user's clipboard.
  },[password])


  useEffect(()=>{
    passGen()
  },[length,charAllowed,numAllowed,passGen])
  
  return (
    <>
  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" 
          value={password} 
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
          />
          <button 
          type='button'
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-3'>
        <div className='flex items-center gap-x-1'>
          <input 
          id="length"
          type="range"
          min={8}
          max={20}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{
            console.log(e)
            setLength(e.target.value)}}
            />
          <label htmlFor="length"
            >Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={numAllowed}
          id="numberInput"
          onChange={()=>{
            console.log
            setnumAllowed((prev)=>{!prev})} }
          />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={charAllowed}
          id='charInput'
          onChange={()=>{setcharAllowed((prev)=>!prev)}} />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
  </div>


    </>
  )
}

export default App
