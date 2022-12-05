import React, { useState, useContext, useEffect, useRef } from 'react'
import { UserContext } from '../UserContext'
import "./HomePage.css"
import 'react-bootstrap'
import HomePageBody from './HomePageBody'
import categories from '../Category/CategoryDB'
import { Modal } from 'react-bootstrap'

function HomePage() {

	// will hold the data of the user
  const [signUpData, setSignUpData] = useState({userField: '', passwordField: '', ageField: ''});
  const [signInData, setSignInData] = useState({userField: '', passwordField: ''});

  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitSignIn, setIsSubmitSignIn] = useState(false);
  const [isSubmitSignUp, setIsSubmitSignUp] = useState(false);

  const [isSignIn, setSignIn] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
     
  // create the uset holder
  const {user, setUser} = useContext(UserContext);

  const searchBox = useRef(null);
   
   
     async function VerifyUser() {
    //    const requestOptions = {
    //        method: 'POST',
    //        headers: { 'Content-Type': 'application/json' },
    //        body: JSON.stringify({ userName: fieldData.userField, password: fieldData.passwordField })
    //    };
    //    await fetch('https://localhost:7201/api/Users/login', requestOptions)
    //    .then(async response => {
    //      if(response.status === 200){
    //        const userTokenObject = await response.json();
    //        const JWTtoken = userTokenObject.token;
    //        const user = userTokenObject.user;
    //        localStorage.setItem("jwt_token", JWTtoken);
    //        console.log(user);
    //        setUser(user);
    //        return "Ok";
    //      }
    //      return response.text();
    //    })
    //    .then(text => {
    //      if(text === "Wrong password")
    //      setFieldErrors({wrongPassword: "Sorry, your password was incorrect. Please double-check your password."});
    //    if(text === "User does not exists")
    //      setFieldErrors({wrongUserName: "Username or password is wrong! Try again"});
    //    });
     }
   
   
     // function for handling the changed of the data when enterd the username & password
  const handleClose = (e) => {
    setSignUp(false);
    setSignIn(false);
    setSignInData({userField: '', passwordField: ''});
    setSignUpData({userField: '', passwordField: '', ageField: ''});
  }
   
     
  // handle submiting, click on Login
  const handleSignInSubmit = () => {
    setFieldErrors(validateSignIn(signInData));
    setIsSubmitSignIn(true);
  }

  const handleSignUpSubmit = () => {
    setFieldErrors(validateSignUp(signUpData));
    setIsSubmitSignUp(true);
  }

       // handle openin new chat
  const handleSignIn = () => {
    setSignUp(false);
    setSignIn(!isSignIn);
    setSignInData({userField: '', passwordField: ''});
  }

  // open new chat with existed contact
  const signIn = () => {
 
  }

  // open new chat with existed contact
  const signUp = () => {
 
  }
    
  

  // handle when field data of open chat with contact changes
  const handleSignUp = (e) => {
    setSignIn(false);
    setSignUp(!isSignUp);
    setSignUp({userField: '', passwordField: '', ageField: ''});
  }

  // handle when field data of new contact changes
  const handleSignInChange = (e) => {
    if (fieldErrors !== {}){
      setFieldErrors({});
      setIsSubmitSignIn(false);
    }
    const {name, value} = e.target;
    setSignInData({...signInData, [name]: value});
  }

  // handle when field data of new contact changes
  const handleSignUpChange = (e) => {
    if (fieldErrors !== {}){
      setFieldErrors({});
      setIsSubmitSignUp(false);
    }
    const {name, value} = e.target;
    setSignUpData({...signUpData, [name]: value});
  }

  // handle enter for Opening new chat with a client
  const handleEnterSignIn = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSignInSubmit();
    }
  }

  // handle enter for Opening new chat with a client
  const handleEnterSignUp = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSignUpSubmit();
    }
  }
   
  // login useeffect.
  useEffect(() => {

  },[fieldErrors])
     
  const validateSignUp = (values) => {
    const errors = {}
    if(!values.userField || !values.passwordField || !values.ageField){
      if (!values.userField){
        errors.userField = "Username is required!";
      }
      if (!values.passwordField){
        errors.passwordField = "Password is required!";
      }
      if (!values.ageField){
        errors.ageField = "Age is required!";
      }
    }
    return errors;
  }

  const validateSignIn = (values) => {
    const errors = {}
    if(!values.userField || !values.passwordField){
      if (!values.userField){
        errors.userField = "Username is required!";
      }
      if (!values.passwordField){
        errors.passwordField = "Password is required!";
      }
    }
    return errors;
  }

  const doSearch = function(q) {
  }
    
  const search = function() {
    doSearch(searchBox.current.value);
  }

  return (
    <div className="HomePage">
      <div className="HomePage-header">
        <div className="HomePage-header-right">
          <p >S E P H O R E V I E W S</p>
          <div className="HomePage-search">
            <i class="bi bi-search"></i>
            <input ref={searchBox} onKeyUp={search} placeholder="Search product" type="text" autocomplete="off"/>
          </div>
        </div>
        <div className="HomePage-header-left">
          <button onClick={handleSignIn} type="button" class="btn btn-outline-secondary">Sign In</button>
          <Modal show={isSignIn} onHide={handleSignIn && signIn}>
            <Modal.Header>
              <div className="signIn-name">
                <h2 className="signIn-title">Sign In</h2>
              </div>
              <i onClick={handleClose} class="bi bi-x-lg"></i>
            </Modal.Header>
            <Modal.Body>
              <div className="signIn-header">
                <h6>Sign in or create an account to search recommendations on sephora's products</h6>
              </div>
              <div className="signIn-connect">
                <input value={signInData.userField} onKeyPress={handleEnterSignIn} onChange={handleSignInChange} placeholder="USERNAME" name="userField" type="text" />
              </div>
              <p>{fieldErrors.userField}</p>
              <div className="signIn-connect">
                <input value={signInData.passwordField} onKeyPress={handleEnterSignIn} onChange={handleSignInChange} placeholder="PASSWORD" name="passwordField" type="password"/>
              </div>
              <p>{fieldErrors.passwordField}</p>
              <div className="signIn-button">
                <button onClick={handleSignInSubmit} type="button" class="btn btn-outline-success">Sign In</button>
              </div>
              <h1>{fieldErrors.wrongPassword}</h1>
              <h1>{fieldErrors.wrongUserName}</h1>
            </Modal.Body>
            <Modal.Footer>
              <div className="last-sentence">
                <h6>Don't have an account ?</h6>
              </div>
              <button onClick={handleSignIn && handleSignUp} type="button" class="btn btn-outline-primary">Sign Up</button>
            </Modal.Footer>
          </Modal>

          <Modal show={isSignUp} onHide={handleSignUp && signUp}>
            <Modal.Header>
              <div className="signIn-name">
                <h2 className="signIn-title">Sign Up</h2>
              </div>
              <i onClick={handleClose} class="bi bi-x-lg"></i>
            </Modal.Header>
            <Modal.Body>
              <div className="signIn-header">
                <h6>Create an account to search recommendations on sephora's products</h6>
              </div>
              <div className="signIn-connect">
                <input value={signUpData.userField} onKeyPress={handleEnterSignUp} onChange={handleSignUpChange} placeholder="USERNAME" name="userField" type="text"/> 
              </div>
              <p>{fieldErrors.userField}</p>
              <div className="signIn-connect">
                <input value={signUpData.passwordField} onKeyPress={handleEnterSignUp} onChange={handleSignUpChange} placeholder="PASSWORD" name="passwordField" type="password"/>
              </div>
              <p>{fieldErrors.passwordField}</p>
              <div className="signIn-connect">
                <input value={signUpData.ageField} onKeyPress={handleEnterSignUp} onChange={handleSignUpChange} placeholder="AGE" name="ageField" type="number"/> 
              </div>

              <p>{fieldErrors.ageField}</p>

              <div className="signIn-button">
                <button className="join-now-button" onClick={handleSignUpSubmit} type="button" class="btn btn-outline-success">Join Now</button>
              </div>

              <h1>{fieldErrors.wrongPassword}</h1>
              <h1>{fieldErrors.wrongUserName}</h1>
            </Modal.Body>
            <Modal.Footer>
              <div className="last-sentence">
                <h6>Already have an account ?</h6>
              </div>
              <button onClick={handleSignUp && handleSignIn} type="button" class="btn btn-outline-primary">Sign In</button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

      <div className="HomePage-body" id="HomePage-body">
        <HomePageBody categoriesList={categories} />
      </div>

      <div className="HomePage-footer"> 

      </div>
    </div>
  )
}

export default HomePage
