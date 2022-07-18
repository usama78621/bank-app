import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useAccountsContext } from '../../../context/AccountsContext'
const Dashboard = () => {
    let Navigate = useNavigate()
    const { documents, transdocuments } = useAccountsContext()
    return (
        <div className='container'>
            <h1>Dashboard</h1>
            <Container>
                <Grid container spacing={4} >
                    <Grid item xs={12} md={6} lg={6}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" className='text-center' gutterBottom>
                                    <i className="fa-solid fa-user-large fs-3 me-3"></i>
                                    <span className='fs-3'>Accounts</span>
                                </Typography>
                                <hr />
                                <Typography variant="h5" className='text-center' component="div" color="text.secondary" sx={{ '& button': { m: 1 } }} >
                                    <Button size="medium" onClick={() => Navigate('/dashboard/create')} variant="contained" color="success">Add New Accounts</Button>
                                    <Button variant="contained" size="medium" onClick={() => Navigate('/dashboard/accounts')} color="primary">View All Accounts</Button>
                                </Typography>
                                <hr />
                                <Typography variant="body2" className='text-center fs-2'>
                                    Accounts
                                    <br />
                                    {documents.length}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" className='text-center' gutterBottom>
                                    <i class="fa-solid fa-address-card fs-3 me-3"></i>
                                    <span className='fs-3'>Transactions
                                    </span>
                                </Typography>
                                <hr />
                                <Typography variant="h5" className='text-center' component="div" color="text.secondary" sx={{ '& button': { m: 1 } }} >
                                    <Button size="medium"
                                        variant="contained" onClick={() => Navigate('/dashboard/transcations')} color="success">View all Transactions</Button>
                                </Typography>
                                <hr />
                                <Typography variant="body2" className='text-center fs-2'>
                                    Transactions
                                    <br />
                                    {transdocuments.length}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Dashboard