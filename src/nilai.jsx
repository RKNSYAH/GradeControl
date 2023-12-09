import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CustomAppBar from "./AppBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Fade,
  IconButton,
  Modal,
  TableFooter,
  TablePagination,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import AverageGrade from "./AverageGrade";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#151515",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#272727",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "inherit",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

function Nilai() {
    const [data, setData] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [cookie, setCookies] = useState("");
  const [nis, setNis] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [mode, setMode] = useState("");
  const [bobot, setBobot] = useState(0);
    const handleOpen = (type) => {
        setOpen(true);
        setMode(type);
      };
      const handleClose = () => setOpen(false);
    function getCookie(){
        const cookie = Cookies.get()
        if(!cookie.username) return navigate('/')
        setCookies(cookie.username)
      }
      const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
    const { idKelas } = useParams();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  async function fetchUser() {
    setOpenLoading(true);
    const payload = new FormData();
    payload.append("username", cookie);

    const res = await fetch(
      process.env.REACT_APP_API_URL + `classes/${idKelas}`,
      {
        body: payload,
        method: "POST",
      }
    );
    const userData = await res.json();
    setOpenLoading(false);
    if (res.status === 200) setData(userData.result.students);
    setDataKelas(userData.result.class_data);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
      useEffect(() => {
        getCookie()
      }, []);
      const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "#474747",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      };
      
    return(
        <>
        <CustomAppBar kelasId={idKelas} mode="Kelas" position="Nilai"/>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            width: "60vw",
          }}
        >
          <Container
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <AverageGrade nilai={61} />
            <button
              onClick={() => handleOpen("Siswa")}
              style={{
                alignSelf: "flex-end",
                marginBottom: 15,
                marginRight: 5,
              }}
            >
              Tambah Siswa
            </button>
            <button
              onClick={() => handleOpen("Mapel")}
              style={{ alignSelf: "flex-end", marginBottom: 15 }}
            >
              Tambah Mapel
            </button>
          </Container>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Tambah {mode}
                    </Typography>
                {mode == "Siswa" ? (
                  <>
                    <TextField
                      id="standard-basic"
                      label="NIS"
                      variant="standard"
                      type="number"
                      required
                      sx={{
                        marginY: "1em",
                        width: "15em",
                        color: "grey",
                        input: {
                          "&[type=number]": {
                            "-moz-appearance": "textfield",
                          },
                          "&::-webkit-outer-spin-button": {
                            "-webkit-appearance": "none",
                            margin: 0,
                          },
                          "&::-webkit-inner-spin-button": {
                            "-webkit-appearance": "none",
                            margin: 0,
                          },
                        },
                      }}
                      onChange={(e) => {
                        let maxNum = 12;
                        if (e.target.value.length > maxNum) {
                          e.target.value = e.target.value.slice(0, maxNum);
                        }
                        setNis(e.target.value);
                      }}
                    />
                    <TextField
                      id="standard-basic"
                      label="Nama"
                      variant="standard"
                      required
                      sx={{ marginY: "1em", width: "15em" }}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                      id="standard-basic"
                      label="Alamat"
                      variant="standard"
                      sx={{ marginY: "1em", width: "15em" }}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                      id="standard-basic"
                      label="Tgl Lahir"
                      variant="standard"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      sx={{ marginY: "1em", width: "15em" }}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </>
                ) : <>
                <TextField
                      id="standard-basic"
                      label="Nama"
                      variant="standard"
                      required
                      sx={{ marginY: "1em", width: "15em" }}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                      id="standard-basic"
                      label="Bobot"
                      variant="standard"
                      type="number"
                      required
                      inputProps={{max: 100}}
                      sx={{
                        marginY: "1em",
                        width: "15em",
                        color: "grey",
                        input: {
                          "&[type=number]": {
                            "-moz-appearance": "textfield",
                          },
                          "&::-webkit-outer-spin-button": {
                            "-webkit-appearance": "none",
                            margin: 0,
                          },
                          "&::-webkit-inner-spin-button": {
                            "-webkit-appearance": "none",
                            margin: 0,
                          },
                        },
                      }}
                      onChange={(e) => {
                        let maxNum = 3;
                        if (e.target.value.length > maxNum) {
                          e.target.value = e.target.value.slice(0, maxNum);
                        }
                        setBobot(e.target.value);
                      }}
                    />
                </>}

                <Typography sx={{ color: "#ab4f4f" }}>{errMessage}</Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "RGBA(255,255,255,0.91)",
                    color: "black",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: "RGBA(255,255,255,0.61)",
                    },
                    width: "17.5em",
                    marginTop: "1.5em",
                  }}
                  onClick={() => postSiswa()}
                >
                  Kirim
                </Button>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 100,
                  }}
                  open={openLoading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Box>
            </Fade>
          </Modal>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 100,
            }}
            open={openLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>NIS</StyledTableCell>
                  <StyledTableCell align="left">Nama Lengkap</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : data
                ).map((row, index) => (
                  <StyledTableRow
                    hover
                    role="button"
                    sx={{ cursor: "pointer" }}
                    onClick={() => console.log("tes")}
                    key={index}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row[0]}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row[1]}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        sx={{
                          backgroundColor: "#ab4f4f",
                          color: "white",
                          marginRight: 2,
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        sx={{ backgroundColor: "#4f805e", color: "white" }}
                      >
                        Edit
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 39 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={4}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
        </>
    )
}

export default Nilai