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
import { Navigate, useNavigate } from "react-router-dom";
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Kelas() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [classname, setClassname] = useState("");
  const [cookie, setCookies] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [openLoading, setOpenLoading] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()

  async function postKelas() {
    setOpenLoading(true)
    const payload = new FormData();
    payload.append("classname", classname);
    payload.append("username", cookie)

    const res = await fetch(
      process.env.REACT_APP_API_URL + "classes/add",
      {
        body: payload,
        method: "POST",
      }
    );
    const data = await res.json();
    setOpenLoading(false)
    if (data.message === "Error") {
      return setErrMessage(data['error-message'])
    }
    setErrMessage()
    handleClose();
    fetchUser();
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function fetchUser() {
    const payload = new FormData();
    payload.append("username", cookie)
    const res = await fetch(process.env.REACT_APP_API_URL + "classes", {
      method: "POST",
      body: payload
    });
    const userData = await res.json();
    setOpenLoading(false)
    console.log(userData)
    if (res.status === 200) setData(userData.result);
  }
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
    function getCookie(){
    const cookie = Cookies.get()
    if(!cookie.username) return navigate('/')
    setCookies(cookie.username)
  }
  useEffect(() => {
      getCookie()
      fetchUser();
      

  }, [cookie]);

  return (
    <>
      <CustomAppBar position="Daftar Kelas">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            width: "65vw",
          }}
        >
          <Container
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleOpen}
              style={{ alignSelf: "flex-end", marginBottom: 15 }}
            >
              Tambah Kelas
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
                  Tambah Kelas
                </Typography>
                <TextField
                  id="standard-basic"
                  label="Nama Kelas"
                  variant="standard"
                  sx={{ marginY: "1em", width: "15em", color: "grey" }}
                  onChange={(e) => setClassname(e.target.value)}
                />
                <Typography sx={{color: '#ab4f4f'}}>
                  {errMessage}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "RGBA(255,255,255,0.91)",
                    color: 'black',
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: "RGBA(255,255,255,0.61)",
                    },
                    width: "17.5em",
                    marginTop: "1.5em",
                  }}
                  onClick={() => postKelas()}
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
                  <StyledTableCell>Nama Kelas</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : data
                ).map((row) => (
                  <StyledTableRow hover role="button" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/kelas/${row[0]}`)} key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row[1]}
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
      </CustomAppBar>
    </>
  );
}

export default Kelas;
