import React,{useEffect, useState, useRef} from 'react';
import Loader from 'react-loader-spinner';
import Axios from 'axios';
import * as classes from './App.module.css';
import List from './List/List';
import Card from './Card/Card';
import CatGallery from './CatGallery/CatGallery';
import EditFormButton from './EditFormButton/EditFormButton';

function App() {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState({});
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0)
  const [clicks, setClicks] = useState(0);
  const [addedNew, setAddedNew] = useState(false);

  useEffect(() => {
    setLoading(true);
    Axios.get('https://cat-clicker-api.herokuapp.com/cats')
    .then((res)=> {
      setData(res.data);
      setCurrent(res.data[0]._id)
      setLoading(false)
    }).catch((e)=>{
      console.log(e);
    })
  },[])

  const cardDiv = useRef('card')

  useEffect(()=>{
    Axios.get('https://cat-clicker-api.herokuapp.com/cats')
    .then(async (res)=> {
      await setData(res.data);
      if(addedNew){
        await setIndex(res.data.length - 1);
        await setAddedNew(false);
      }
    }).catch((e)=>{
      console.log(e);
    })
  },[clicks, addedNew])

  const handleClicks = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
  }

  const handleCurrent = (index)=>{
    setCurrent(data[index]._id);
    setIndex(index)
  }

  const handleAddedNew = () => {
    setAddedNew(true);
  }

  const focusCard = () => {
    if(cardDiv.current){
      cardDiv.current.scrollIntoView({ 
         behavior: "smooth", 
         block: "start"
      })
  }
  }

  const handleSetCurrent = (id) => {
    setCurrent(id);
  }

  return (
    <div className={classes.App}>
      {loading? <div className={classes.loading}><Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={3000} //3 secs
      /></div>:(
      <React.Fragment>
      <h2>Cat Clicker App</h2>
      <div className={classes.mainup}>
        <div className={classes.divSpace}>
          <List data = {data} current={handleCurrent} index = {index}/>
        </div>
        <div ref={cardDiv} className={classes.divSpace} >
          <Card clk={clicks} current={current} clicks={handleClicks}/>
        </div>
        <div className={classes.divSpace}>
          <EditFormButton setCurrent={handleSetCurrent} added={handleAddedNew} current={current} clk={clicks} clicks={handleClicks}/>
        </div>
      </div>
      <div className={classes.maindown}>
        <h2>Cats Image Gallery</h2>
        <CatGallery focusCard={focusCard} clicks={handleClicks} current={handleCurrent} data={data} />
      </div>
      </React.Fragment>)}
    </div>
  );
}

export default App;
