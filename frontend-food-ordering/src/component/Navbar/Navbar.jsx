import { Avatar, Badge, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navbar.css';
import Box from '@mui/material/Box';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate=useNavigate()
  return (
    <Box 
    className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'>
      
        <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
            <li className='logo font-semibold text-gray-300 text-2xl'>
                Full Food
            </li>
        </div>
    
      <div className='flex items-center space-x-2 lg:space-x-10'>
        <div className=''>
            <IconButton>
                <SearchIcon sx={{fontSize:"1.5rem"}}/>
            </IconButton>
        </div>

        <div className=''>
            {false?<Avatar sx={{bgcolor:"white", color:pink.A400}}>T</Avatar>:
            <IconButton onClick={()=>navigate("/account/login")}>
              <Person/>
            </IconButton>}
        </div>

        <div className=''>
          <IconButton>
            <Badge color='black' badgeContent={3}>
              <ShoppingCartIcon sx={{fontSize:"1.5rem"}}/>
            </Badge>
                
          </IconButton>
        </div>

      </div>
    </Box>
  )
}

