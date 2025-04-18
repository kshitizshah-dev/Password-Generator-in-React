import { useState, useCallback, useEffect } from 'react'
import './App.css'
import back_image from '../src/assets/pexels-jdominici-612266.jpg'

function App() {
  const [range, setRange] = useState(0)
  const [check_num, setNum] = useState(false)
  const [check_special, setSpecial] = useState(false)
  const [password, setPassword] = useState("")

  const Password_generation = useCallback(()=>{
    let passVal = ""
    let strVal ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(check_num){
      strVal += '0123456789'
    }
    if(check_special){
      strVal+= '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

    }

    for (let index = 0; index < range; index++) {
      let rand_index = Math.ceil(Math.random()* strVal.length +1)
      
      passVal+=strVal.charAt(rand_index)
      
    }
    setPassword(passVal)
  }, [range,check_num,check_special])


  useEffect( ()=>{Password_generation()}, [range,check_num,check_special])

  const copy_value = () =>{
    window.navigator.clipboard.writeText(password)
  }


  return (
    // containter
    <div className=" w-screen h-screen flex justify-center items-center bg-cover "
      style={{backgroundImage: `url(${back_image})`}}
    >

      {/* center div */}
      <div 
      className="flex flex-col bg-yellow-400 text-black h-[15rem] w-[35rem] "
      >
              
        {/* title div*/}

        <div className="bg-amber-600 flex h-[3rem] justify-center items-center">
          <span className='text-3xl'>Password Generator</span>
        </div>

        {/* upper box for text and copy */}

        <div className="bg-green-300 flex flex-1 flex-row px-4 pt-4 items-center gap-8">

          <textarea
           className='bg-amber-100 w-[20rem] h-[70%] rounded-xl pl-4' 
           readOnly
           placeholder='..........'
           value={password}
           >
           </textarea>

          <button
           className='bg-amber-300 w-[10rem] h-[70%] rounded-2xl text-white hover:bg-yellow-300'
           onClick={()=>{ copy_value()}}
           >
          Copy
           </button>
        </div>


        {/* bottom box for custom features */}
        <div className="flex flex-row bg-green-300 flex-1 px-2 pb-5 gap-6 justify-center items-center">

        <label className='h-[4-rem] gap-3'>
        <input 
        className='mr-2'type="range" min={0} max={100} value={range}
        onChange={(event)=>{
          setRange(event.target.value)
        }}
        />
          <span className='text-xl'>Length = {range}</span>
        </label>
            
        <label className='h-[4-rem] gap-3'>
          <input 
          className='mr-2' type="checkbox" name="number" id="" 
          onClick={(event)=>{
            setNum(event.target.checked)
          }}
          />
          <span className='text-xl'>number</span>
        </label>

        <label className='h-[4-rem] gap-3'>
          <input 
          className='mr-2' type="checkbox" name='special'
          onClick={(event)=>{
            setSpecial(event.target.checked)
          }}
          />
          <span className='text-xl'>Special</span>
        </label>
        </div>
      </div>
    </div>
  )
}

export default App
