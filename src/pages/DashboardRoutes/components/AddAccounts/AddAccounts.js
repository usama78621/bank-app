import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ContactMailIcon from '@mui/icons-material/ContactMail'
import AccountCircle from '@mui/icons-material/AccountCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { useGobalContext } from '../../../../context/UserContext';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../../../config/Firebase-uitles";


export default function AddAccounts() {
    const { user } = useGobalContext()
    const [isLoading, setIsLoading] = React.useState(false)
    const [state, setState] = React.useState({
        fullname: "",
        cnic: "",
        code: "",
        Accountnumber: "",
        type: "",
        amount: "",
    })

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const handleClcik = async (e) => {
        e.preventDefault();

        let { cnic, code, Accountnumber, type, amount } = state
        cnic = cnic.replace("-", "").replace(" ", "");
        if (cnic.length !== 13) {
            return toast.error('Your CNIC Number ' + cnic + ' is not Valid', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        if (code.length !== 2) {
            return toast.error('You entered an invalid Branch code ' + code + ' Please enter a valid Branch code', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        if (Accountnumber.length !== 9) {
            return toast.error('You entered an invalid Account Number ' + Accountnumber + ' Please enter a valid Account Number', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        if (amount < 500) {
            return toast.error('Amount is less then Rupees 500.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        if (type === "") {
            return toast.error('select type firest', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        let formData = {
            fullname: state.fullname,
            cnic,
            code,
            Accountnumber,
            type,
            amount,
            userid: user.uid,
            dateCreated: serverTimestamp(),
            Desciption: "Initial Deposit"

        }
        setIsLoading(true)
        const collectionName = "accounts";
        const docsCollectionRef = collection(firestore, collectionName);
        try {
            const docRef = await addDoc(docsCollectionRef, formData)
            console.log("ID:", docRef.id);
            setState({
                fullname: "",
                cnic: "",
                code: "",
                Accountnumber: "",
                type: "",
                amount: "",
                Desciption: ""
            })
            toast.success('Accounts ADD Successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } catch (error) {
            toast.error(error, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        setIsLoading(false)
    }

    return (
        <div className='mt-5'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-9 mx-auto">
                        <div className="card shadow">
                            <div className='bg-primary text-white text-center py-3'>
                                <h4 >Enter Account Details Below </h4>
                                <p className=' mb-0' style={{
                                    color: "#83c5be"
                                }}>All fields are required*</p>
                            </div>
                            <form onSubmit={handleClcik}>
                                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5, w: 10 }} />
                                        <TextField id="input-with-sx"
                                            label="Your Name" variant="standard"
                                            className='w-50 me-5'
                                            name="fullname"
                                            value={state.fullname}
                                            onChange={handleChange}
                                        />
                                        <ContactMailIcon sx={{
                                            color: 'action.active',
                                            mr: 1, my: 0.5, w: 10
                                        }} />
                                        <TextField id="input-with-sx"
                                            label="CNIC Number" variant="standard"
                                            className='w-50'
                                            name="cnic"
                                            value={state.cnic}
                                            onChange={handleChange}
                                            type='number' />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="mt-5">
                                        <CurrencyExchangeIcon
                                            sx={{ color: 'action.active', mr: 1, my: 0.5, w: 10 }} />
                                        <TextField id="input-with-sx"
                                            label="Branch Code (1 - 99)"
                                            variant="standard"
                                            className='w-50  me-5'
                                            name="code"
                                            value={state.code}
                                            onChange={handleChange}
                                            type='number' />
                                        <AccountCircle
                                            sx={{ color: 'action.active', mr: 1, my: 0.5, w: 10 }} />
                                        <TextField id="input-with-sx"
                                            label="Account Number (Length should be 9)"
                                            variant="standard"
                                            className='w-50'
                                            name="Accountnumber"
                                            value={state.Accountnumber}
                                            onChange={handleChange}
                                            type='number' />
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                    }} className="mt-5">
                                        <PaymentIcon sx={{
                                            color: 'action.active',
                                            mr: 1, my: 0.5, w: 10
                                        }} />
                                        <FormControl sx={{ minWidth: 120 }}
                                            className='w-50 me-5'>
                                            <InputLabel id="demo-simple-select-filled-label">Choose Account Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                name="type"
                                                value={state.type}
                                                onChange={handleChange}
                                            >

                                                <MenuItem value='saving'>Saving</MenuItem>
                                                <MenuItem value='current'>Current</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <PaymentIcon
                                            sx={{ color: 'action.active', mr: 1, my: 0.5, w: 10 }} />
                                        <TextField id="input-with-sx"
                                            type='number'
                                            label="Initial Deposit (Minimum 500 Rs.)"
                                            variant="standard"
                                            name="amount"
                                            value={state.amount}
                                            onChange={handleChange}
                                            className='w-50' />
                                    </Box>
                                </Box>
                                <div className='text-end p-5'>
                                    <Button type='submit' variant="contained">
                                        {!isLoading ?
                                            "Add Account"
                                            : <div class="spinner-grow text-dark" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        }
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}