// MenuTable.jsx
import React from 'react';
import { Box, Card, CardHeader, Paper, TableRow, TableBody, TableHead, TableCell, TableContainer, Table, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon
const orders = [1, 1, 1, 1, 1, 1, 1];

export default function MenuTable() {
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title="Menu"
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">image</TableCell>
                <TableCell align="right">title</TableCell>
                <TableCell align="right">ingredients</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">Avaibilty</TableCell> {/* Corrected typo */}
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
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
                  <TableCell align="right">
                    <IconButton>
                      <DeleteIcon /> {/* Render Delete icon */}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
