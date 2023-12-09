import { useState } from "react";
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

function Register() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

  async function registerAcc() {
    if (!username || !password)
      return setErrMessage("Please enter a username and password");
    const payload = new FormData();
    payload.append("username", username);
    payload.append("password", password);
    payload.append("fullname", fullname);
    const res = await fetch(
        process.env.REACT_APP_API_URL + "register",
      {
        method: "POST",
        body: payload,
      }
    );
    const data = await res.json();
    if (data.message == "Error") return setErrMessage(data["error-message"]);
    else if (data.message == "Success") {
        setErrMessage()
        navigate('/')
    }
  }

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
          maxWidth: "400px",
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
            Register a new account
          </Typography>

          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            required
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
            required
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
          <TextField
            id="standard-basic"
            label="Full Name"
            variant="standard"
            sx={{ marginY: "1em", width: "15em", input: { color: "black" } }}
            onChange={(e) => setFullname(e.target.value)}
          />
          <Typography
            sx={{ color: "red", fontSize: 14, alignSelf: "flex-start" }}
          >
            {errMessage}
          </Typography>
          <Typography
            sx={{ color: "red", fontSize: 14, alignSelf: "flex-start" }}
          >
            *Required
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
            onClick={() => registerAcc()}
          >
            Register
          </Button>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Link
            component="button"
            sx={{ fontSize: "12px", color: "RGBA(10,10,13,0.91)" }}
            underline="false"
            onClick={() => navigate("/")}
          >
            Login to your account
          </Link>
        </Box>
      </Box>
    </Card>
  );
}

export default Register;
