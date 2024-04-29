
import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import CreateIngredientForm from './CreateIngredientForm'

export const CreateIngredientCategoryForm = () => {
    const [formData,setFormData] =useState({
        name:"",
    })
    const handleSubmit=()=>{
        console.log(formData)
    }
    const handleInputChange =(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,[name]:value
        })
    }
  return (
    <div className='p-5'>
        <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient Category</h1>
        <form className='space-y-5' onSubmit={handleSubmit}></form>
        <TextField
                fullWidth
                id='name'
                name="name"
                label="category"
                variant='outlined'
                onChange={handleInputChange}
                value={formData.name}
              />
        <Button variant="contained" type="submit">
            Create Category
        </Button>
    </div>
  )
}
export default CreateIngredientCategoryForm