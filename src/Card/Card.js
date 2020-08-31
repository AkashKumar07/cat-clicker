import React from 'react';
import Axios from 'axios';
import Loader from 'react-loader-spinner';
import {Paper} from '@material-ui/core'
import * as classes from './Card.module.css';


const Card = (props) => {
    const current = props.current;
    const [cat, setCat] = React.useState({})
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        Axios.get('https://cat-clicker-api.herokuapp.com/cats/'+ current)
        .then((res)=>{
            setCat(res.data);
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[current, props.clk])

    const incrementClick=(clicks, id)=>{
        const newClicks = clicks + 1;
        Axios.patch('https://cat-clicker-api.herokuapp.com/cats/'+ id,{
           clicks : newClicks
       })
       .then((res)=>{
            (() => props.clicks())()
       }).catch((e)=> {
            console.log('error')
       })
    }

    return(
        <React.Fragment>
            <Paper onClick={() =>incrementClick(cat.clicks, cat._id)} className={classes.catCard}>
                {loading? <div className={classes.loading}><Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs
                
                    /></div>:
                <React.Fragment>
                <h2 className={classes.heading}>{cat.name}</h2>
                <p className={classes.para}>No of Times Clicked: {cat.clicks}</p>
                <img className={classes.image} src={cat.image} alt="cat"/>
                {cat.clicks>=0 && cat.clicks <= 5 ? <p className={classes.para}>Infant</p>: null}
                {cat.clicks>=6 && cat.clicks <=12? <p className={classes.para}>Child</p>:null}
                {cat.clicks>=13 && cat.clicks <= 25? <p className={classes.para}>Young</p>: null}
                {cat.clicks>=26 && cat.clicks <=40? <p className={classes.para}>Middle-age</p>: null}
                {cat.clicks>=41 && cat.clicks <=60? <p className={classes.para}>Old</p> : null}
                {cat.clicks>60 ? <p className={classes.para}>Very Old</p> : null}
                </React.Fragment>}
            </Paper>
        </React.Fragment>
    )
}

export default Card;