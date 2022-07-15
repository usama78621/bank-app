import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import AddCardIcon from '@mui/icons-material/AddCard';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { setDoc, doc, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { firestore } from '../../../config/Firebase-uitles'
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

    const collectionName = "transactions";
    const docsCollectionRef = collection(firestore, collectionName);
    let credit = "credit"
    let amountAfterWithdraw = (single.amount) - Number(amount);

    let tranctiondata = {
        fullname: single.fullname,
        cinc: single.cinc,
        Accountnumber: single.Accountnumber,
        dateCreated: serverTimestamp(),
        type: credit,
        Desciption: des,
    }




    const handleClick = async (e) => {
        e.preventDefault();
        const docRef = await addDoc(docsCollectionRef, tranctiondata);
        console.log(docRef);
        setDoc(doc(firestore, "Accounts", single.id), { amount: amountAfterWithdraw }, { merge: true })
            .then(() => {
                setAmount("")
                setDes("")
            }).catch((e) => {
                console.log(e);
            })
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
                        <TableCell className='fs-6'  >{single.amount}</TableCell>
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
                                label={`Amount to Withdraw, Max:${single.amount}`}
                                variant="standard"
                                value={amount}
                                required
                                type="number"
                                onChange={(e) => setAmount(e.target.value)}
                                className='w-100 mb-4' />
                            <TextField id="standard-basic"
                                label="Description"
                                value={des}
                                required
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
