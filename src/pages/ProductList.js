/* eslint-disable */

import react, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core'
import RumahsakitCard from '../components/rumahsakit/RumahsakitCard'
import RumahsakitListToolbar from '../components/rumahsakit/RumahsakitListToolbar';
import products from 'src/__mocks__/products'
import Loader from '../components/loader/loader'
import { getAllRumahsakit } from 'src/data/rumahsakit'

const renderLoader = () => <Loader />

const ProductList = () => {
  const [rumahsakit, setRumahsakit] = useState()

  useEffect(() => {
    (async() => {
      const rs = await getAllRumahsakit()
      
      setRumahsakit(rs)
    })()
  }, [])


  if (!(rumahsakit && rumahsakit.rumahsakit)) {
    return renderLoader
  }
  return (
    <>
      <Helmet>
        <title>Daftar Rumahsakit | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <RumahsakitListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {rumahsakit.rumahsakit.map((rs) => (
                <Grid
                  item
                  key={rs._id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <RumahsakitCard rs={rs} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination
              color="primary"
              count={3}
              size="small"
            />
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default ProductList;
