import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../../../scss/_accounts.scss'
import { useAccountsContext } from '../../../context/AccountsContext';
import Moment from 'moment'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: 10,
};

const columns = [
    {
        id: 'Transaction ID',
        label: 'Transaction ID',
    },
    {
        id: 'Date',
        label: 'Date',
    },
    {
        id: 'Account #',
        label: 'Account #'
    },
    {
        id: 'Type',
        label: 'Type',
    },
    {
        id: 'Balance',
        label: 'Balance',
    },

];
const Transactions = () => {
    const {
        page,
        rowsPerPage,
        transdocuments,
        handleChangePage,
        handleChangeRowsPerPage,
        isLoading,
    } = useAccountsContext()
    const [open, setOpen] = React.useState(false);
    const [singletranscation, setSingletranscation] = React.useState({})
    const handleClick = (row) => {
        transdocuments.forEach((doc) => {
            if (row.id === doc.id) {
                setSingletranscation(doc)
                setOpen(true)
                return
            }
        })
    }
    const handleClose = () => setOpen(false);
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
                            ? transdocuments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : transdocuments
                        ).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell >
                                    <Button onClick={() => handleClick(row)}
                                    >{row.transactionId}  </Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}>
                                        <Box sx={style}>
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell className='fs-6'>Full Name</TableCell>
                                                        <TableCell className='fs-6'>{singletranscation.fullname}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className='fs-6'>Accounts #</TableCell>
                                                        <TableCell className='fs-6'>{singletranscation.Accountnumber}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className='fs-6'>Type</TableCell>
                                                        <TableCell className='fs-6'>{singletranscation.type}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className='fs-6'>Balance</TableCell>
                                                        <TableCell className='fs-6'>{singletranscation.amount}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className='fs-6'>Account Des</TableCell>
                                                        <TableCell className='fs-6'>{singletranscation.Desciption}</TableCell>
                                                    </TableRow><TableRow>
                                                        <TableCell className='fs-6'>Transaction Date</TableCell>
                                                        <TableCell className='fs-6'>{Moment(row.dateCreated.toDate().toString()).format('L')}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Modal>
                                </TableCell>
                                <TableCell>
                                    {Moment(row.dateCreated.toDate().toString()).format('L')}
                                </TableCell>
                                <TableCell >
                                    {row.Accountnumber}
                                </TableCell>
                                <TableCell>
                                    {row.type}
                                </TableCell>
                                <TableCell>
                                    {row.amount}
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={transdocuments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

    )
}

export default Transactions