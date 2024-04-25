import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./component/Navbar/Navbar";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./Theme/DarkTheme";
import { CssBaseline } from "@mui/material";
import Home from "./component/Home/Home";
import RestaurantDetails from "./component/Restaurant/RestaurantDetails";
import Cart from "./component/Cart/Cart";
import Profile from "./component/Profile/Profile";
import CustomerRoute from "./Routers/CustomerRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./component/State/Authentication/Action";
import Routers from "./Routers/Routers";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
  }, [auth.jwt]);
  return (
    // <ThemeProvider theme={darkTheme}>
    //   <CssBaseline />
    //   {/* <Navbar /> */}
    //   {/* <Home /> */}
    //   {/* <RestaurantDetails/> */}
    //   {/* <Cart /> */}
    //   {/* <Profile /> */}
    //   {/* {<CustomerRoute /> } */}
    // </ThemeProvider>




    <ThemeProvider theme={ darkTheme }>
          <CssBaseline/>
          <Routers/>
      {/* <Navbar/> */}
        </ThemeProvider>
  );
}

export default App;
