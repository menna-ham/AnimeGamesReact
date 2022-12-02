import React from 'react'
import styles from './Login.module.css'
import { useState } from 'react'
import joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


export default function Login({getUserToken}) {
  const [User, setUser] = useState({
    'email':'',
    'password':'',
  })
  let [errorApi,setErrorApi] = useState('')
  let [validUser,setValidUser] = useState([])
  let [email,setEmail]= useState('')
  let [password,setPassword]= useState('')
  let [load,setLoad]=useState(false);
  let navigate = useNavigate();

  let getUserData=(e)=>{
    let myUser = {...User};
    myUser[e.target.name]=e.target.value;
    setUser(myUser)
  }
  let gotoHome=()=>{
    navigate('/home')
  }

  //validation of all user 
  let ValidUser=()=>{
      let schema = joi.object({
        email:joi.string().required().email({tlds:{allow:['com','net']}}),
        password:joi.string().required().pattern(new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&-+=()._])[a-zA-Z0-9@#$%^&-+=()._]{8,10}/))
      })
      return schema.validate(User,{abortEarly:false});
  }

  //validation of each input 

  let validEmail=(e)=>{
    let schema = joi.string().required().email({tlds:{allow:['com','net']}});
    let res= schema.validate(e.target.value);
    if(res.error){
      setEmail(res.error.details[0].message.replace('"value"','Email'))
      return email;
    }else{
      setEmail('')
      return email;
    }
  }
  
  let validPass=(e)=>{
    let schema = joi.string().required().pattern(new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&-+=()._])[a-zA-Z0-9@#$%^&-+=()._]{8,10}/))
    let res= schema.validate(e.target.value);
    if(res.error){
      setPassword(res.error.details[0].message.replace('"value"','Password'))
      return password;
    }else{
      setPassword('')
      return password;
    }
  }

  let submitDB=async(e)=>{

    e.preventDefault()
    setLoad(true)
    let valid = ValidUser();
    if(valid.error){
      console.log(valid.error.details);
      setValidUser(valid.error.details);
      setLoad(false)
    }else{
      let {data}= await axios.post('https://route-egypt-api.herokuapp.com/signin',User)
      console.log(data);
      if(data.message=='success'){
        gotoHome();
        localStorage.setItem('TokenGame',data.token)
        getUserToken()
      }else{
        setErrorApi(data.message);
        setLoad(false)
        console.log(errorApi);
      }
    }

  }

  return (
    <>
    <div className={`${styles.photoBg} d-flex justify-content-center align-items-center `}>
      <div className="container">
      <div className={`${styles.log}  rounded-4 w-75 m-auto p-5`}>
      <h2 className='text-capitalize text-white text-center'> Login</h2>

        <form className='py-3' onSubmit={submitDB}>
                <div className="form-floating mb-3">
                  <input onChange={(e)=>{getUserData(e); validEmail(e)}} type="email" className="form-control" id="floatingInput" name='email' placeholder="name@example.com"/>
                  <label htmlFor="floatingInput">Email address</label>
                  {email==''? "": <div className='alert alert-danger mt-2'>{email}</div>}

                </div>
              <div className="form-floating">
                <input onChange={(e)=>{getUserData(e); validPass(e)}} type="password" className="form-control" id="floatingPassword" name='password' placeholder="Password"/>
                <label htmlFor="floatingPassword">Password</label>
                {password==''? "": <div className='alert alert-danger mt-2'>Password [8,10] contains [upper,lower,special char,number]</div>}

              </div>
              <div className=' d-flex justify-content-center'>
              <button className='btn btn-danger w-25  mt-4 p-2'> Login</button>
              </div>
          </form>

          { errorApi==''? '': <div className='alert alert-danger my-3'>{errorApi}</div>}
          {validUser==''? '': <div className='alert alert-danger my-3'>All Feilds must be Valid</div>}
      <div className='px-3 text-white'>
              Not member yet 
              <Link className='ms-1 text-decoration-none text-danger' to={'/register'}> Joi Us <FontAwesomeIcon icon={faChevronRight}/> </Link>
             </div>
          

      </div>
      </div>

 

    </div>
    </>
  )
}
