// OrderTable.jsx
import React from 'react';
import { Box, Card, CardHeader, Paper, TableRow, TableBody, TableHead, TableCell, TableContainer, Table } from '@mui/material';

const orders = [1,1,1,1,1,1,1];
    // Add more orders as needed

export default function OrderTable({ filterValue }) {
    const filteredOrders = filterValue === "ALL" ? orders : orders.filter(order => order.status === filterValue);

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    title="All Orders"
                    sx={{ pt: 2, alignItems: "center", justifyContent: "space-between" }}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell align="right">image</TableCell>
                                <TableCell align="right">Customer</TableCell>
                                <TableCell align="right">price</TableCell>
                                <TableCell align="right">name</TableCell>
                                <TableCell align="right">ingredients</TableCell>
                                <TableCell align="right">status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {1}
                                    </TableCell>
                                    <TableCell align="right">{"image"}</TableCell>
                                    <TableCell align="right">{"minhcuongdo01@gmail.com"}</TableCell>
                                    
                                    <TableCell align="right">{"price"}</TableCell>
                                    <TableCell align="right">{"pizza"}</TableCell>
                                    <TableCell align="right">{"ingredients"}</TableCell>
                                    <TableCell align="right">{"completed"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
}
