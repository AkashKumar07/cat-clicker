import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import {Button, Paper, TextField} from '@material-ui/core';
import * as classes from './EditFormButton.module.css';

const EditFormButton = (props) => {
    const current = props.current;
    const [data, setData] = useState({});
    const [form, setForm] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [clicks, setClicks] = useState('');
    const [changed, setChanged] = useState(false);

    useEffect(()=>{
        Axios.get('https://cat-clicker-api.herokuapp.com/cats/'+ current)
        .then((res)=>{
            setData(res.data);
            setName(res.data.name);
            setImage(res.data.image);
            setClicks(res.data.clicks);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[current, props.clk])

    const toggleForm = () => {
        setForm(!form);
    }

    const handleNameChange = (e) => {
        setChanged(true);
        setName(e.target.value);
    }

    const handleImageChange = (e) => {
        setChanged(true);
        setImage(e.target.value);
    }

    const handleClicksChange = (e) => {
        setChanged(true);
        setClicks(e.target.value);
    }

    const handleUndo = () => {
        setChanged(false);
        setName(data.name);
        setImage(data.image);
        setClicks(data.clicks);
    }

    const handleSave = () => {
        if(name !== data.name && changed){
            Axios.post('https://cat-clicker-api.herokuapp.com/cats',{
                name,
                image,
                clicks
            }).then(async(res)=>{
                await (()=> props.setCurrent(res.data._id))()
                await (() => props.added())();
               await (()=>props.clicks())();
            }).catch((e)=> {
                console.log(e);
            })
        }else if(changed && (image !== data.image || clicks !== data.clicks)){
            Axios.patch('https://cat-clicker-api.herokuapp.com/cats/'+current, {
                image,
                clicks
            }).then((res)=> {
                console.log(res.data);
                (()=>props.clicks())();
            }).catch((e)=>{
                console.log(e);
            })
        }
    }

    return(
        <React.Fragment>
            <div className={classes.editform}>
            <div style={{width: '100%', alignItems: 'left'}}>
            <Button style={{marginLeft: '20px'}} onClick={toggleForm} variant="contained" color="primary">
                Open Form
            </Button>
            </div>
            {form ? <Paper  className={classes.root}>
            <form className={classes.form} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Name" value={name} onChange={handleNameChange}/>
            <TextField id="standard-basic" label="Image Url" value={image} onChange={handleImageChange}/>
            <TextField id="standard-basic" label="Clicks" value={clicks} onChange={handleClicksChange} />
            <div className={classes.buttonDiv}>
            <Button onClick={handleSave} style={{color: 'white', backgroundColor: 'green', marginRight: '5px'}} variant="contained" >
                Save
            </Button>
            <Button onClick={handleUndo} style={{color: 'white', backgroundColor: 'red'}} variant="contained" >
                Undo
            </Button>
            </div>
            </form>
            </Paper> : null}
            </div>
        </React.Fragment>
    )
}

export default EditFormButton;