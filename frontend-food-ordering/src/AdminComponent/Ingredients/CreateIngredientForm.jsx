
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'

export const CreateIngredientForm = () => {
    const [formData,setFormData] =useState({
        name:"",
        ingredientCategoryId:""})
    const handleSubmit=()=>{
        const data={
            name:formData.categoryName,
            restaurantId:{
                id:1,
            },
        };
        console.log(data)
    }
    const handleInputChange =(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,[name]:value
        })
    }
  return (
    <div className='p-5'>
        <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient</h1>
        <form className='space-y-5' onSubmit={handleSubmit}></form>
        <TextField
                fullWidth
                id='categoryName'
                name="categoryName"
                label="Cuisine Type"
                variant='outlined'
                onChange={handleInputChange}
                value={FormData.categoryName}
              />
        
        <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.ingredientCategoryId}
                    label="Category"
                    onChange={handleInputChange}
                    name="ingredientCategoryId"
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        <Button variant="contained" type="submit">
            Create Category
        </Button>
    </div>
  )
}
export default CreateIngredientForm;