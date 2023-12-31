import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./App.css";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Login() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate()

  async function loginAcc() {
    const payload = new FormData();
    payload.append("username", username);
    payload.append("password", password);
    const res = await fetch(
      process.env.REACT_APP_API_URL + "login",
      {
        method: "POST",
        body: payload,
      }
    );
    const data = await res.json();
    if (data.message == "Error") return setErrMessage(data["error-message"]);
    else if (data.message == "Success") {
        setErrMessage()
        Cookies.set('username', data.result[1], {expires: 30})
        console.log(data)
    }
  }
  function getCookie(){
    const cookie = Cookies.get()
    if(cookie.username) return navigate('/kelas')
  }

  useEffect(() => {
    getCookie()
  })


  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: "15px",
        padding: "8px",
        backgroundColor: "rgb(192 192 193 / 90%)",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 450, paddingY: "9em", paddingX: "5em" }}
        image="src\assets\react.svg "
        alt="ReactJS Logo"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: "15px",
          width: 320,
          alignItems: "center",
          textAlign: "center",
          padding: "1em",
          maxWidth: "400px"
        }}
      >
        <CardContent sx={{ flex: "1 0 auto", paddingY: "4em" }}>
          <Typography component="div" variant="h5">
            Welcome!
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Login to access the application
          </Typography>

          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            sx={{ marginY: "1em", width: "15em", input: { color: "black" } }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            type={showPassword ? "text" : "password"}
            sx={{ marginY: "1em", width: "15em", input: { color: "black" } }}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            sx={{ color: "red", fontSize: 14, alignSelf: "flex-start" }}
          >
            {errMessage}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "RGBA(11,12,19,0.91)",
              },
              width: "17.5em",
              marginTop: "1.5em",
            }}
            onClick={() => loginAcc()}
          >
            Login
          </Button>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Link
            component="button"
            sx={{ fontSize: "12px", color: "RGBA(10,10,13,0.91)" }}
            underline="false"
            onClick={() => navigate('/register')}
          >
            Create an account
          </Link>
        </Box>
      </Box>
    </Card>
  );
}

export default Login;
