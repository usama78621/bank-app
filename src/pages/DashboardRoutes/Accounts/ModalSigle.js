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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import AddCardIcon from '@mui/icons-material/AddCard';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { setDoc } from 'firebase/firestore';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
    pb: 6,
};


export default function ModalSigle({ single }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [amount, setAmount] = useState("")
    const [des, setDes] = useState("")

    const handleClick = (e) => {
        e.preventDefault()
        console.log(amount);
        console.log(des);

        let amountAfterWithdraw = single.initial - amount
        console.log(amountAfterWithdraw);
        // let data = {}
        // date.dateCreated = serverTimeStamp();
        // data.createdBy = {
        //     email: "user.email",
        //     fullName: "user.fullName",
        //     uid: "user.uid"
        // }

        // setDoc(doc(firstore, "Accounts", single.id), { initial: amountAfterWithdraw })
        //     .then(())
    }

    return (
        <>
            <Table>
                <TableBody>
                    <TableRow
                    >
                        <TableCell className='fs-6'>
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
                    <Button variant="outlined" onClick={handleOpen} startIcon={<SendIcon />}>
                        Withdraw
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}
                            component="form"
                            noValidate
                            autoComplete="off"
                            onSubmit={handleClick}
                        >
                            <p>Withdraw Amount</p>
                            <TextField id="standard-basic"
                                label={`Amount to Withdraw, Max:${single.initial}`}
                                variant="standard"
                                value={amount}
                                type="number"
                                onChange={(e) => setAmount(e.target.value)}
                                className='w-100 mb-4' />
                            <TextField id="standard-basic"
                                label="Description"
                                value={des}
                                onChange={(e) => setDes(e.target.value)}
                                variant="standard" className='w-100 ' />
                            <div className='text-end mt-3'>
                                <Button type="submit" variant="contained">Withdraw</Button>
                            </div>
                        </Box>
                    </Modal>
                    <Button variant="contained" endIcon={<AddCardIcon />}>
                        Deposit
                    </Button>
                </Stack>
            </div>
        </>
    );
}
