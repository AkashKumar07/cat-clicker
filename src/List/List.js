import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    "& .Mui-selected":{
        background : '#0099ff',
        color: 'white',
        "&:hover":{
            backgroundColor: '#0099ff'
        }
    },
    border : '1px solid #4a4a4a',
    "& .MuiList-root":{
        padding: 0
    }
  },
  number: {
      borderRadius: '30px',
      "& p": {
          margin: '0 10px',
          color: 'white',
          fontSize: '1.3em',
      },
        backgroundColor: '#a6a297',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center'
  },
  listItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      "& p": {
          margin: '0 10px'
      }
  },
}));

export default function SelectedListItem(props) {
  const classes = useStyles();

  const handleListItemClick = (index) => {
    (() => props.current(index))();
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
          <Divider />
          {props.data.map((data, index)=> {
            // console.log(index);
              return(
                <React.Fragment key={data._id}>
                <ListItem
                key={data._id}
                button
                selected={props.index === index}
                onClick={() => 
                  handleListItemClick(index)}
                >
                <div className={classes.listItem}>
                <p><b>{data.name}</b></p>
                <div className={classes.number}>
                <p>{data.clicks}</p>
                </div>
                </div>
                </ListItem>
                <Divider />
                </React.Fragment>
              )
          })}
        
      </List>
    </div>
  );
}
