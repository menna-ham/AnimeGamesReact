import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import reg from '../../Imgs/register.jpg'
import styles from './Register.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import joi from 'joi';

export default function Register() {
  const [User, setUser] = useState({
    'first_name':'',
    'last_name':'',
    'email':'',
    'age':0,
    'password':'',
  })
  let [errorApi,setErrorApi] = useState('')
  let [validUser,setValidUser] = useState([])
  let [first,setFirst]= useState('')
  let [last,setLast]= useState('')
  let [email,setEmail]= useState('')
  let [age,setAge]= useState(0)
  let [password,setPassword]= useState('')
  let [load,setLoad]=useState(false);
  let navigate = useNavigate();

  let getUserData=(e)=>{
    let myUser = {...User};
    myUser[e.target.name]=e.target.value;
    setUser(myUser)
  }
  let gotoLogin=()=>{
    navigate('/login')
  }

  //validation of all user 
  let ValidUser=()=>{
      let schema = joi.object({
        first_name:joi.string().alphanum().required().min(2).max(10),
        last_name:joi.string().alphanum().required().min(2).max(10),
        age:joi.number().required().min(18).max(80),
        email:joi.string().required().email({tlds:{allow:['com','net']}}),
        password:joi.string().required().pattern(new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&-+=()._])[a-zA-Z0-9@#$%^&-+=()._]{8,10}/))
      })
      return schema.validate(User,{abortEarly:false});
  }

  //validation of each input 

  let validFirst=(e)=>{
    let schema = joi.string().alphanum().required().min(2).max(10);
    let res= schema.validate(e.target.value);
    if(res.error){
      // edited=res.error
      setFirst(res.error.details[0].message.replace('"value"','First Name'))
      return first;
    }else{
      setFirst('')
      return first;
    }
  }
  let validLast=(e)=>{
    let schema = joi.string().alphanum().required().min(2).max(10);
    let res= schema.validate(e.target.value);
    if(res.error){
      setLast(res.error.details[0].message.replace('"value"','Last Name'))
      return last;
    }else{
      setLast('')
      return last;
    }
  }
  let validAge=(e)=>{
    let schema = joi.number().required().min(18).max(80);
    let res= schema.validate(e.target.value);
    if(res.error){
      setAge(res.error.details[0].message.replace('"value"','Age'))
      return age;
    }else{
      setAge('')
      return age;
    }
  }

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
    let valid = ValidUser();
    if(valid.error){
      // console.log(valid.error.details);
      setValidUser(valid.error.details)
    }else{
      let {data}= await axios.post('https://route-egypt-api.herokuapp.com/signup',User)
      console.log(data);
      if(data.message=='success'){
        gotoLogin();
      }else{
        setErrorApi(data.message);
        console.log(errorApi);
      }
    }

  }

  return (
    <>
    <div className={`${styles.HeightSec} d-flex align-items-center`}>
    <div className="container">
      <div className={`row  g-0  my-5 shadow-5 rounded-3 ${styles.lightBg}`}>

        <div className={`col-lg-6 cd-md-none ${styles.reg} p-0 rounded-start`} >
        </div>


        <div className="col-lg-6 ">
          <div className="register px-3 py-5">
             <h2 className='text-capitalize text-white text-center'> create your account</h2>

             <form className='py-3' onSubmit={submitDB}>
              <div className='d-flex justify-content-between'>
                <div className="form-floating mb-3 w-100 me-3">
                    <input onChange={(e)=>{getUserData(e); validFirst(e)}} type="text" className="form-control" id="floatingInput" name='first_name' placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">First Name</label>
                    {first==''? "": <div className='alert alert-danger mt-2'>{first}</div>}
                  </div>
                  <div className="form-floating mb-3 w-100">
                    <input onChange={(e)=>{getUserData(e); validLast(e)}} type="text" className="form-control" id="floatingInput" name='last_name' placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Last Name</label>
                    {last==''? "": <div className='alert alert-danger mt-2'>{last}</div>}

                  </div>
              </div>

                <div className="form-floating mb-3">
                  <input onChange={(e)=>{getUserData(e); validEmail(e)}} type="email" className="form-control" id="floatingInput" name='email' placeholder="name@example.com"/>
                  <label htmlFor="floatingInput">Email address</label>
                  {email==''? "": <div className='alert alert-danger mt-2'>{email}</div>}

                </div>
                <div className="form-floating mb-3">
                  <input onChange={(e)=>{getUserData(e); validAge(e)}} type="number" className="form-control" id="floatingInput" name='age' placeholder="name@example.com"/>
                  <label htmlFor="floatingInput">Age</label>
                  {age==''? "": <div className='alert alert-danger mt-2'>{age}</div>}

                </div>
              <div className="form-floating">
                <input onChange={(e)=>{getUserData(e); validPass(e)}} type="password" className="form-control" id="floatingPassword" name='password' placeholder="Password"/>
                <label htmlFor="floatingPassword">Password</label>
                {password==''? "": <div className='alert alert-danger mt-2'>Password [8,10] contains [upper,lower,special char,number]</div>}

              </div>
              <button className='btn btn-danger w-100 mt-4 p-2'> Create Account</button>
             </form>

             { errorApi==''? '': <div className='alert alert-danger my-3'>{errorApi}</div>}
             {validUser==''? '': <div className='alert alert-danger my-3'>All Feilds must be Valid</div>}

             <div className='my-3 text-white text-center px-3'>
              <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
             </div>
             <hr/>
             <div className='px-3 text-white'>
              ALready a member
              <Link className='ms-1 text-decoration-none text-danger' to={'/login'}> Login <FontAwesomeIcon icon={faChevronRight} /></Link>
             </div>

          </div>
        </div>
      </div>
    </div>
    </div>

    </>
  )
}
