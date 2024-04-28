import { AddPhotoAlternate } from '@mui/icons-material';
import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from '../Util/UploadtoCloudaniry';

const initialValues = {
  Name: "",
  Description: "",
  CuisineType: "",
  StreetAddress: "",
  City: "",
  StateProvince: "",
  PostalCode: "",
  Country: "",
  Email: "",
  Mobile: "",
  Twitter: "",
  Instagram: "",
  OpeningHours: "Mon-Sun : 9:00 AM - 12:00 PM",
  images: []
};

const CreateMenuForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data={
        Name: values.Name,
        Description: values.Description,
        CuisineType: values.CuisineType,
        Address: {
          StreetAddress: values.StreetAddress,
          City: values.City,
          StateProvince: values.StateProvince,
          PostalCode: values.PostalCode,
          Country: values.Country
        },
        contactInformation: {
          Email: values.Email,
          Mobile: values.Mobile,
          Twitter: values.Twitter,
          Instagram: values.Instagram,
        },
        OpeningHours: values.OpeningHours,
        images: values.images,
      }
      console.log("data ---", data);
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    console.log("image ---",image)
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className='py-10 lg:flex item-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2xl text-center'>
          Add New Restaurant
        </h1>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <Grid container spacing={2}>
            <Grid className='flex flex-wrap gap-5' item xs={12}>
              <input
                accept='image/*'
                id='fileInput'
                style={{ display: "none" }}
                onChange={handleImageChange}
                type="file"
              />
              <label className='relative' htmlFor="fileInput">
                <span className='w-24 h-24 cursor-pointer flex item-center justify-center 
              p-3 border rounded-md border-gray-600'>
                  <AddPhotoAlternate className='text-white'/>
                </span>
                {uploadImage && (
                  <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                    <CircularProgress/>
                  </div>
                )}
              </label>
              <div className='flex flex-wrap gap-2'>
                {formik.values.images.map((image, index) => (
                  <div className='relative' >
                    <img
                      className='w-24 h-24 object-cover'
                      key={index}
                      src={image}
                      alt=""
                    />
                    <IconButton
                      size='small'
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        outline: "none"
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='Name'
                name="Name"
                label="Name"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.Name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='Description'
                name="Description"
                label="Description"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.Description}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id='CuisineType'
                name="CuisineType"
                label="Cuisine Type"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.CuisineType}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id='OpeningHours'
                name="OpeningHours"
                label="Opening Hours"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.OpeningHours}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='StreetAddress'
                name="StreetAddress"
                label="Street Address"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.StreetAddress}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='City'
                name="City"
                label="City"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.City}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id='StateProvince'
                name="StateProvince"
                label="State"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.StateProvince}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id='PostalCode'
                name="PostalCode"
                label="Postal Code"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.PostalCode}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id='Country'
                name="Country"
                label="Country"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.Country}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id='Email'
                name="Email"
                label="Email"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.Email}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id='Mobile'
                name="Mobile"
                label="Mobile"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.Mobile}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id='Instagram'
                name="Instagram"
                label="Instagram"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.Instagram}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id='Twitter'
                name="Twitter"
                label="Twitter"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.Twitter}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Create Restaurant
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateMenuForm;
