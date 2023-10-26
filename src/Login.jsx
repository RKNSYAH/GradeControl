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

function Login() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


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
        sx={{ width: 350, paddingY: "9em", paddingX: "5em" }}
        image="src\assets\react.svg"
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
            sx={{ marginY: "1em", width: "15em" }}
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            type={showPassword ? "text" : "password"}
            sx={{ marginY: "1em", width: "15em" }}
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
          <FormGroup
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{ "& .MuiSvgIcon-root": { fontSize: "20px" } }}
                />
              }
              label={
                <Typography sx={{ fontSize: "12px" }} color="textSecondary">
                  Remember me
                </Typography>
              }
            />
            <Link
              component="button"
              sx={{ fontSize: "12px", color: "RGBA(10,10,13,0.91)" }}
              underline="false"
            >
              Forgot Password?
            </Link>
          </FormGroup>

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
          >
            Login
          </Button>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Link
            component="button"
            sx={{ fontSize: "12px", color: "RGBA(10,10,13,0.91)" }}
            underline="false"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Create an account
          </Link>
        </Box>
      </Box>
    </Card>
  );
}

export default Login;
