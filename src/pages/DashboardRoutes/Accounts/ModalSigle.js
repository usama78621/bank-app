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
import { doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { firestore } from '../../../config/Firebase-uitles'
import { useAccountsContext } from '../../../context/AccountsContext';
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
    const { setDocuments, documents, handleClose: colsemainmodal } = useAccountsContext();

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const [withdrawAmount, setWithdrawAmount] = useState("")
    const [des, setDes] = useState("")
    const [depositAmount, setdepositAmount] = useState("")
    const [depositdes, setdepositDes] = useState("")
    const [isLoading, setIsLoading] = useState(false)



    const handlewithdraw = async (e) => {
        e.preventDefault();
        if (withdrawAmount <= single.amount) {

            setIsLoading(true)
            const type = "Debit"
            let transactionId = new Date().getTime()
            transactionId = transactionId.toString()
            let tranctiondata = {
                fullname: single.fullname,
                cnic: single.cnic,
                Accountnumber: single.Accountnumber,
                dateCreated: serverTimestamp(),
                Desciption: des,
                amount: withdrawAmount,
                transactionId,
                userid: single.userid,
                type,
            }
            let amountAfterWithdraw = Number(single.amount) - Number(withdrawAmount);

            // Get a new write batch
            const batch = writeBatch(firestore);
            const accountRef = doc(firestore, "accounts", single.id);
            batch.update(accountRef, { "amount": amountAfterWithdraw });

            const transactionRef = doc(firestore, "transactions", transactionId);
            batch.set(transactionRef, tranctiondata)
            // Commit the batch
            await batch.commit();

            console.log("account updated and transaction added")
            let newDocuments = documents.map((doc) => {
                if (doc.id === single.id)
                    return { ...single, amount: amountAfterWithdraw }
                return doc
            })
            setDocuments(newDocuments)
            setIsLoading(false)
            handleClose()
            setWithdrawAmount("")
            setDes("")
            colsemainmodal()
        } else {
            alert("add valid amount")
        }
    }
    const handledeposit = async (e) => {
        e.preventDefault();
        if (depositAmount < 5000) {
            setIsLoading(true)
            const type = "credit"
            let transactionId = new Date().getTime()
            transactionId = transactionId.toString()
            let tranctiondata = {
                fullname: single.fullname,
                cnic: single.cnic,
                Accountnumber: single.Accountnumber,
                dateCreated: serverTimestamp(),
                Desciption: des,
                amount: depositAmount,
                transactionId,
                userid: single.userid,
                type,
            }
            let amountAfterDeposit = Number(single.amount) + Number(depositAmount);

            // Get a new write batch
            const batch = writeBatch(firestore);
            const accountRef = doc(firestore, "accounts", single.id);
            batch.update(accountRef, { "amount": amountAfterDeposit });

            const transactionRef = doc(firestore, "transactions", transactionId);
            batch.set(transactionRef, tranctiondata)
            // Commit the batch
            await batch.commit();

            console.log("account updated and transaction no")
            let newDocuments = documents.map((doc) => {
                if (doc.id === single.id)
                    return { ...single, amount: amountAfterDeposit }
                return doc
            })
            setDocuments(newDocuments)
            setIsLoading(false)
            handleClose2()
            setdepositAmount("")
            setdepositDes("")
            colsemainmodal()
        } else {
            alert("you enter valid amount")
        }
    }
    return (
        <>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className='fs-6'>Full Name</TableCell>
                        <TableCell className='fs-6'>{single.fullname}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className='fs-6'>Accounts #</TableCell>
                        <TableCell className='fs-6'>{single.Accountnumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className='fs-6'>Type</TableCell>
                        <TableCell className='fs-6'>{single.type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className='fs-6'>Balance</TableCell>
                        <TableCell className='fs-6'>{single.amount}</TableCell>
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
                        aria-describedby="modal-modal-description">
                        <Box sx={style}
                            component="form"
                            autoComplete="off"
                            onSubmit={handlewithdraw}>
                            <p>Withdraw Amount</p>
                            <TextField id="standard-basic"
                                label={`Amount to Withdraw, Max:${single.amount}`}
                                variant="standard"
                                value={withdrawAmount}
                                required
                                type="number"
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                className='w-100 mb-4' />
                            <TextField id="standard-basic"
                                label="Description"
                                value={des}
                                required
                                onChange={(e) => setDes(e.target.value)}
                                variant="standard" className='w-100 ' />
                            <div className='text-end mt-3'>
                                <Button type="submit" variant="contained" disabled={isLoading}>
                                    {!isLoading ?
                                        "Withdraw"
                                        : <div className='spinner-border spinner-border-sm'></div>
                                    }
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                    <Button variant="contained" onClick={handleOpen2} endIcon={<AddCardIcon />}>
                        Deposit
                    </Button>
                    <Modal
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}
                            component="form"
                            autoComplete="off"
                            onSubmit={handledeposit}
                        >
                            <p>Deposit Amount</p>
                            <TextField id="standard-basic"
                                label={`Amount to Withdraw, Max:${5000}`}
                                variant="standard"
                                value={depositAmount}
                                required
                                type="number"
                                onChange={(e) => setdepositAmount(e.target.value)}
                                className='w-100 mb-4' />
                            <TextField id="standard-basic"
                                label="Description"
                                value={depositdes}
                                required
                                onChange={(e) => setdepositDes(e.target.value)}
                                variant="standard" className='w-100 ' />
                            <div className='text-end mt-3'>
                                <Button type="submit" color='error'
                                    variant="contained" disabled={isLoading}>
                                    {!isLoading ?
                                        "Deposit"
                                        : <div className='spinner-border spinner-border-sm'></div>
                                    }
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                </Stack>
            </div>
        </>
    );
}
