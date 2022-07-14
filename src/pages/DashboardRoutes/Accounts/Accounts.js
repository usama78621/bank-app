import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore, } from "../../../config/Firebase-uitles";
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalSigle from './ModalSigle';
import '../../../scss/_accounts.scss'
import Stack from '@mui/material/Stack';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    {
        id: 'Account',
        label: 'Account #',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'code', label: 'Branch Code', minWidth: 100 },
    {
        id: 'Type',
        label: 'Type',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Balance',
        label: 'Balance',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },

];

const collectionName = "Accounts";
const docsCollectionRef = collection(firestore, collectionName)
export default function Accounts() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isLoading, setIsLoading] = React.useState(false)
    const [documents, setDocuments] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [opendelete, setOpendelete] = React.useState(false);
    const [single, setSignle] = React.useState({})

    const handleopen2 = () => {
        setOpendelete(true)
    }
    const handlecolse2 = () => {
        setOpendelete(false)
    }
    const handleOpen = (id) => {
        documents.forEach((doc) => {
            if (doc.id === id) {
                setSignle(doc)
                return
            }
            setOpen(true);
        })
    }
    React.useEffect(() => {
        handleOpen()
    }, [])

    const handleClose = () => setOpen(false);

    const readDocs = async () => {
        setIsLoading(true)
        let array = []
        const querySnapshot = await getDocs(docsCollectionRef);
        querySnapshot.forEach((doc) => {
            array.push({ ...doc.data(), id: doc.id });
        })
        setDocuments(array);
        setIsLoading(false)
    }

    useEffect(() => {
        readDocs();
    }, []);
    const handleDelete = async (row) => {
        await deleteDoc(doc(firestore, collectionName, row.id))
        let array = documents.filter((items) => {
            return row.id !== items.id;
        });
        alert("Delete")
        setDocuments(array)
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (isLoading) {
        return <h1 className='text-center mt-5'>...Loading</h1>
    }
    return (
        <Paper
            sx={{ width: '80%', margin: "50px auto", overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : documents
                        ).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.fullname}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Button onClick={() => handleOpen(row.id)}>{row.Accountnumber}</Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <Box className='stylee'>
                                            <Typography className="d-flex justify-content-between align-items-center" id="modal-modal-title" component="div">
                                                <span className='fs-5'>Account Details</span>
                                                <Button variant="outlined" size='md'
                                                    onClick={handleopen2}
                                                    color="error" startIcon={<DeleteIcon />}>
                                                    Delete
                                                </Button>
                                                <Modal
                                                    open={opendelete}
                                                    onClose={handlecolse2}
                                                >
                                                    <Box sx={style}  >
                                                        <h5>Are you sure you want to delete <br /> your Bank Account?</h5>
                                                        <Stack direction="row" className="float-end" spacing={2}>
                                                            <Button size="small" variant="contained" color="success" >No</Button>
                                                            <Button size="small" variant="contained" color="error" startIcon={<DeleteIcon />}>Yes</Button>
                                                        </Stack>
                                                    </Box>
                                                </Modal>
                                            </Typography>
                                            <ModalSigle single={single} />
                                        </Box>
                                    </Modal>
                                </TableCell>
                                <TableCell >
                                    {row.code}
                                </TableCell>
                                <TableCell >
                                    {row.type}
                                </TableCell>
                                <TableCell>
                                    {row.initial}
                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={documents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper >
    );
}
