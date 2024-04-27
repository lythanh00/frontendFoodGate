import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'

export const RestaurantDetails = () => {
  const handleRestaurantStatus=()=>{

  }
  return (
    <div className='lg:px-20 px-5'>
      <div className='py-5 flex justify-center items-center gap-5'>
        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>Indian Fast Food</h1>
        <div>
          <Button color={true?"primary":"error"} className='py-[1rem] px-[2rem]' 
          variant='contained' onClick={handleRestaurantStatus} size ='large'>
            {true?"close":"open"}
          </Button>
        </div>
      </div>  
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<span className="text-gray-300">Restaurant</span>}/>
            <CardContent>
              <div className="space-y-4 text-gray-200">
                  
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>    
    </div>
  )
}
