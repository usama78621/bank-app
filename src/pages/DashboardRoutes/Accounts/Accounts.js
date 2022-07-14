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
import CloseIcon from '@mui/icons-material/Close';
import { useAccountsContext } from '../../../context/AccountsContext';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};
const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    {
        id: 'Account',
        label: 'Account #',
    },
    { id: 'code', label: 'Branch Code', minWidth: 100 },
    {
        id: 'Type',
        label: 'Type',
    },
    {
        id: 'Balance',
        label: 'Balance',
    },

];


export default function Accounts() {
    const {
        page,
        rowsPerPage,
        isLoading,
        documents,
        open,
        opendelete,
        single,
        handleClose,
        handlecolse2,
        handleOpen,
        handleopen2,
        handleChangePage,
        handleChangeRowsPerPage,
        handleDelete
    } = useAccountsContext()

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
                                                            <Button size="small" variant="contained" color="success" startIcon={<CloseIcon />} onClick={handlecolse2} >No
                                                            </Button>
                                                            <Button size="small"
                                                                onClick={() => handleDelete(row)}
                                                                variant="contained" color="error" startIcon={<DeleteIcon />}>Yes</Button>
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
