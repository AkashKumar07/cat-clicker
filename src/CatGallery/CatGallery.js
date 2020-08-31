import React from 'react';
import Axios from 'axios';
import {Paper} from '@material-ui/core';
import * as classes from './CatGallery.module.css';

const CatGallery = (props) => {

    const incrementClick=(index,clicks, id)=>{
       (() => props.current(index))();
       Axios.patch('https://cat-clicker-api.herokuapp.com/cats/'+ id,{
           clicks
       })
       .then((res)=>{
            (()=> (props.clicks(1)))();
       }).catch((e)=> {
            console.log('error')
       });
       (()=>props.focusCard())();
    }
    return(
        <div className={classes.catGallery}>
            {props.data.map((cat, index)=>{
                return(
                    <Paper key={cat._id} onClick={() => incrementClick(index, cat.clicks+1, cat._id)} className={classes.card}>
                        <h4 className={classes.heading}>{cat.name}</h4>
                        <p className={classes.para}>No of Times Clicked: {cat.clicks}</p>
                        <img className={classes.image} src={cat.image} alt="cat"/>
                        <p style={{
                            margin: '0 0 0 2px',
                            color: '#0066ff',
                            fontSize: '1.2em'
                        }}>Card Link</p>
                    </Paper>
                )
            })}
        </div>
    )
}

export default CatGallery