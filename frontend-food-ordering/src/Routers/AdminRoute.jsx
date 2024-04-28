import React from 'react'
import {Route,Routes} from 'react-router-dom'
import CreateRestaurantForm from '../../../frontend-food-ordering/src/AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import { Admin } from '../../../frontend-food-ordering/src/AdminComponent/Admin/Admin'

export const AdminRoute = () => {
  return (
    <div>
        <Routes>
            <Route path ='/*' element={true?<CreateRestaurantForm/>:<Admin/>}>

            </Route>
        </Routes>
    </div>
  )
}
