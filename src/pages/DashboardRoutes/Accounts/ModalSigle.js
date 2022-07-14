import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import AddCardIcon from '@mui/icons-material/AddCard';


export default function ModalSigle({ single }) {
    return (
        <>
            <Table>
                <TableBody>
                    <TableRow
                    >
                        <TableCell className='fs-6'  >
                            Full Name
                        </TableCell>
                        <TableCell className='fs-6'  >{single.fullname}</TableCell>
                    </TableRow>
                    <TableRow
                    >
                        <TableCell className='fs-6'  >
                            Accounts #
                        </TableCell>
                        <TableCell className='fs-6' >{single.Accountnumber}</TableCell>
                    </TableRow>
                    <TableRow
                    >
                        <TableCell className='fs-6' >
                            Type
                        </TableCell>
                        <TableCell className='fs-6' >{single.type}</TableCell>
                    </TableRow> <TableRow
                    >
                        <TableCell className='fs-6' >
                            Balance
                        </TableCell>
                        <TableCell className='fs-6'  >{single.initial}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className='float-end mt-3'>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<AddCardIcon />}>
                        Deposit
                    </Button>
                    <Button variant="contained" endIcon={<SendIcon />}>
                        Withdraw
                    </Button>
                </Stack>
            </div>
        </>
    );
}
