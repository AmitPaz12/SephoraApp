import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../UserContext";
import "./HomePage.css";
import "react-bootstrap";
import HomePageBody from "./HomePageBody";
import categories from "../Category/CategoryDB";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomePage() {
  let products = useRef([]);

  // will hold the data of the user
  const [signUpData, setSignUpData] = useState({
    userField: "",
    passwordField: "",
    ageField: "",
  });
  const [signInData, setSignInData] = useState({
    userField: "",
    passwordField: "",
  });

  const [signUpfieldErrors, setSignUpFieldErrors] = useState({});
  const [signInfieldErrors, setSignInFieldErrors] = useState({});
  const [isSubmitSignIn, setIsSubmitSignIn] = useState(false);
  const [isSubmitSignUp, setIsSubmitSignUp] = useState(false);

  const [isSignIn, setSignIn] = useState(false);
  const [isSignUp, setSignUp] = useState(false);

  // create the uset holder
  const { user, setUser } = useContext(UserContext);

  const searchBox = useRef(null);

  const [value, setValue] = useState("");

  async function VerifyUserSignUp() {
    let user = null;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: signUpData.userField,
        password: signUpData.passwordField,
        age: signUpData.ageField,
      }),
    };

    await fetch(
      "https://localhost:7266/api/Users/register",
      requestOptions
    ).then(async (response) => {
      if ((await response.status) === 200) {
        const userTokenObject = await response.json();
        const JWTtoken = userTokenObject.token;
        user = userTokenObject.user;
        localStorage.setItem("jwt_token", JWTtoken);
      } else {
        setSignUpFieldErrors({
          userExists: "you are already in! click Sign in",
        });
      }
    });

    return user;
  }

  async function VerifyUserSignIn() {
    let user = null;
    console.log("try to login");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: signInData.userField,
        password: signInData.passwordField,
      }),
    };
    await fetch("https://localhost:7266/api/Users/login", requestOptions)
      .then(async (response) => {
        if (response.status === 200) {
          const userTokenObject = await response.json();
          const JWTtoken = userTokenObject.token;
          user = userTokenObject.user;
          localStorage.setItem("jwt_token", JWTtoken);
        }
      })
      .catch((text) => {
        console.log("text");
        if (text === "Wrong password")
          setSignInFieldErrors({
            wrongPassword:
              "Sorry, your password was incorrect. Please double-check your password.",
          });
        if (text === "User does not exists")
          setSignInFieldErrors({
            wrongUserName: "Username or password is wrong! Try again",
          });
      });

    return user;
  }

  // function for handling the changed of the data when enterd the username & password
  const handleClose = (e) => {
    setSignUp(false);
    setSignIn(false);
    setSignInData({ userField: "", passwordField: "" });
    setSignUpData({ userField: "", passwordField: "", ageField: "" });
  };

  // handle submiting, click on Login
  const handleSignInSubmit = () => {
    setSignInFieldErrors(validateSignIn(signInData));
    setIsSubmitSignIn(true);
  };

  const handleSignUpSubmit = () => {
    setSignUpFieldErrors(validateSignUp(signUpData));
    setIsSubmitSignUp(true);
  };

  // handle openin new chat
  const handleSignIn = () => {
    setSignUp(false);
    setSignIn(!isSignIn);
    setSignInData({ userField: "", passwordField: "" });
  };

  // open new chat with existed contact
  const signIn = () => {};

  // open new chat with existed contact
  const signUp = () => {};

  useEffect(() => {
    if (Object.keys(signUpfieldErrors).length === 0 && isSubmitSignUp) {
      async function fetchData() {
        const userFromDB = await VerifyUserSignUp();
        if (userFromDB == null) return;
        setUser(userFromDB);
      }
      fetchData();
    }
  }, [signUpfieldErrors]);

  useEffect(() => {
    if (Object.keys(signInfieldErrors).length === 0 && isSubmitSignIn) {
      const fetchData = async () => {
        const userFromDB = await VerifyUserSignIn();
        if (userFromDB == null) return;
        setUser(userFromDB);
      };
      fetchData();
    }
  }, [signInfieldErrors]);

  // handle when field data of open chat with contact changes
  const handleSignUp = (e) => {
    setSignIn(false);
    setSignUp(!isSignUp);
    setSignUp({ userField: "", passwordField: "", ageField: "" });
  };

  // handle when field data of new contact changes
  const handleSignInChange = (e) => {
    if (signInfieldErrors !== {}) {
      setSignInFieldErrors({});
      setIsSubmitSignIn(false);
    }
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  // handle when field data of new contact changes
  const handleSignUpChange = (e) => {
    if (signUpfieldErrors !== {}) {
      setSignUpFieldErrors({});
      setIsSubmitSignUp(false);
    }
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  // handle enter for Opening new chat with a client
  const handleEnterSignIn = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSignInSubmit();
    }
  };

  // handle enter for Opening new chat with a client
  const handleEnterSignUp = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSignUpSubmit();
    }
  };

  const validateSignUp = (values) => {
    const errors = {};
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    if (!values.userField) {
      errors.userField = "Username is required!";
    }
    if (!values.passwordField) {
      errors.passwordField = "Password is required!";
    } else if (!regex.test(values.passwordField)) {
      errors.passwordField =
        "Password must contain minimum five characters, at least one letter and one number.";
    }
    if (!values.ageField) {
      errors.ageField = "Age is required!";
    }

    return errors;
  };

  const validateSignIn = (values) => {
    const errors = {};
    if (!values.userField || !values.passwordField) {
      if (!values.userField) {
        errors.userField = "Username is required!";
      }
      if (!values.passwordField) {
        errors.passwordField = "Password is required!";
      }
    }
    return errors;
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  function getProducts() {
    let all_products = [];
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch("https://localhost:7266/api/Products", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        all_products = responseJson;
        products.current = all_products;
      })
      .catch((error) => {
        all_products = [];
      });
  }

  useEffect(() => {
    function fetchData() {
      getProducts();
    }
    fetchData();
  }, []);

  var loginButton;

  if (!user) {
    loginButton = (
      <button
        onClick={handleSignIn}
        type="button"
        class="btn btn-outline-secondary"
      >
        Sign In
      </button>
    );
  } else {
    loginButton = (
      <h6>
        {" "}
        <i class="bi bi-person-heart"></i> Hello, {user.user_name}!
      </h6>
    );
  }

  return (
    <div className="HomePage">
      <div className="HomePage-header">
        <div className="HomePage-header-right">
          <p>S E P H O R E V I E W S</p>

          <div className="HomePage-search">
              <input
                value={value}
                onChange={onChange}
                placeholder="Search product"
                // placeholder="&#xF52A; Search product"
                type="text"
              />

            <div className="dropdown">
              {products.current
                .filter((item) => {
                  const searchTerm = value.toLowerCase();
                  const fullName = item.product_name.toLowerCase();

                  return searchTerm && fullName.startsWith(searchTerm);
                })
                .map((item) => (
                  <Link
                    to={`/Products/${item.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="dropdown-row" key={item.product_name}>
                      {item.product_name}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div className="HomePage-header-left">
          {loginButton}
        </div>
        <Modal show={isSignIn} onHide={handleSignIn && signIn}>
          <Modal.Header>
            <div className="signIn-name">
              <h2 className="signIn-title">Sign In</h2>
            </div>
            <i onClick={handleClose} class="bi bi-x-lg"></i>
          </Modal.Header>
          <Modal.Body>
            <div className="signIn-header">
              <h6>
                Sign in or create an account to search recommendations on
                sephora's products
              </h6>
            </div>
            <div className="signIn-connect">
              <input
                value={signInData.userField}
                onKeyPress={handleEnterSignIn}
                onChange={handleSignInChange}
                placeholder="USERNAME"
                name="userField"
                type="text"
              />
            </div>
            <p>{signInfieldErrors.userField}</p>
            <div className="signIn-connect">
              <input
                value={signInData.passwordField}
                onKeyPress={handleEnterSignIn}
                onChange={handleSignInChange}
                placeholder="PASSWORD"
                name="passwordField"
                type="password"
              />
            </div>
            <p>{signInfieldErrors.passwordField}</p>
            <div className="signIn-button">
              <button
                onClick={handleSignInSubmit}
                type="button"
                class="btn btn-outline-success"
              >
                Sign In
              </button>
            </div>
            <div className="errors-style">
              <h6>{signInfieldErrors.wrongPassword}</h6>
              <h6>{signInfieldErrors.wrongUserName}</h6>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="last-sentence">
              <h6>Don't have an account ?</h6>
            </div>
            <button
              onClick={handleSignIn && handleSignUp}
              type="button"
              class="btn btn-outline-primary"
            >
              Sign Up
            </button>
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
              <h6>
                Create an account to search recommendations on sephora's
                products
              </h6>
            </div>
            <div className="signIn-connect">
              <input
                value={signUpData.userField}
                onKeyPress={handleEnterSignUp}
                onChange={handleSignUpChange}
                placeholder="USERNAME"
                name="userField"
                type="text"
              />
            </div>
            <p>{signUpfieldErrors.userField}</p>
            <div className="signIn-connect">
              <input
                value={signUpData.passwordField}
                onKeyPress={handleEnterSignUp}
                onChange={handleSignUpChange}
                placeholder="PASSWORD"
                name="passwordField"
                type="password"
              />
            </div>
            <p>{signUpfieldErrors.passwordField}</p>
            <div className="signIn-connect">
              <input
                value={signUpData.ageField}
                onKeyPress={handleEnterSignUp}
                onChange={handleSignUpChange}
                placeholder="AGE"
                name="ageField"
                type="number"
              />
            </div>

            <p>{signUpfieldErrors.ageField}</p>

            <div className="signIn-button">
              <button
                className="join-now-button"
                onClick={handleSignUpSubmit}
                type="button"
                class="btn btn-outline-success"
              >
                Join Now
              </button>
            </div>
            <div className="errors-style">
              <h6>{signUpfieldErrors.wrongPassword}</h6>
              <h6>{signUpfieldErrors.wrongUserName}</h6>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="last-sentence">
              <h6>Already have an account ?</h6>
            </div>
            <button
              onClick={handleSignUp && handleSignIn}
              type="button"
              class="btn btn-outline-primary"
            >
              Sign In
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <HomePageBody categoriesList={categories} />
      <div className="HomePage-footer"></div>
    </div>
  );
}

export default HomePage;
