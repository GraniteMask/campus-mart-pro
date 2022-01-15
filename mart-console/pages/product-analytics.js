import React, { useReducer, useRef, useState } from 'react'
import { Button, List, ListItem, TextField, Typography, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, ListItemText, Card, Grid, CircularProgress, CardContent, CardActions} from '@material-ui/core'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { Store } from '../utils/Store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from '../components/Layout'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import Cookies from 'js-cookie'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function reducer(state, action){
    switch(action.type){
        case "FETCH_REQUEST":
            return {...state, loading: true, error:''}
        case 'FETCH_SUCCESS':
            return {...state, loading: false, productData: action.payload, error:''}
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload}

        default:
            state
    }
}

function DataAnalytics() {

    const classes = useStyles()
    const [{loading, error, productData}, dispatch] = useReducer(reducer, {loading: true, productData:{}, error:''}) 
    

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                dispatch({type: 'FETCH_REQUEST'})
                const {data} = await axios.get('/api/data-analytics/productSales')
                // console.log(data)
                dispatch({type:'FETCH_SUCCESS', payload:data})
            }catch(err){
                console.log(err)
                // dispatch({type:'FETCH_FAIL', payload: err})
            }
        }
        fetchData()
       
        
    },[])


     console.log(productData)
    


    

    return (
        <Layout title='Data Analytics Dashboard'>
             <Grid container spacing={1}>
                <Grid item md={3} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <NextLink  href="/product-analytics" passHref>
                                <ListItem selected button component="a">
                                    <ListItemText primary="Product Analytics"></ListItemText>
                                </ListItem>
                            </NextLink>
                            <NextLink href="/student-analytics" passHref>
                                <ListItem button component="a">
                                    <ListItemText primary="Student Analytics"></ListItemText>
                                </ListItem>
                            </NextLink>
                        </List>
                    </Card>
                </Grid>
                <Grid item md={9} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography variant="h1">Product Analysis</Typography>
                            </ListItem>
                            <ListItem>
                            {loading ? (<CircularProgress />)
                            :
                            error ? (<Typography className={classes.error}>{error}</Typography>)
                            :
                            (
                                <Grid container spacing={5}>
                                    <Grid item md={4}>
                                        <Card raised style={{background: 'rgba(0, 0, 0, 0.1) no-repeat scroll 16px 16px'}}>
                                            <CardContent >
                                                <Typography variant="h1" color= "primary">
                                                    {productData.productsCount}
                                                </Typography>
                                                <Typography>PRODUCTS ONLINE</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <NextLink href="/admin/orders" passHref>
                                                    <Button size="small" color="secondary" variant='contained'>
                                                        View products
                                                    </Button>
                                                </NextLink>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            )}
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
            
               
           

            
        </Layout>
    )
}

export default dynamic(()=> Promise.resolve(DataAnalytics),{ssr:false})