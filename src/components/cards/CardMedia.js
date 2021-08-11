/* eslint-disable */

import React from 'react'
import {makeStyles} from '@material-ui/core'
import {
    Card, 
    CardContent,
    CardActions,
    Typography,
    Button
} from '@material-ui/core'
import {
    DeleteForeverRounded,
    EditRounded
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
        display: 'block',
        width: '100%',
    },
    details: {
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        width: '100%',
    },
    map: {
        width: '100%',
        borderRadius: '.5rem',
    },
    name: {
        fontSize: '1.75rem',
        fontWeight: 700,
        color: theme.palette.primary.main,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'clip',
        textTransform: "uppercase"
    },
    phone: {
        fontStyle: "italic",
    }
}))

export default function CardMediaComponent({name, address, phone, map}) {
    const classes = useStyles();
    
    return (
      <Card className={classes.root}>
        <div>
          <iframe
            title="map"
            src={map}
            className={classes.map}
            frameBorder="0"
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5" className={classes.name}>
                {name}
              </Typography>
              <Typography variant="subtitle1" className={classes.address}>
                {address}
              </Typography>
              <Typography variant="subtitle1" className={classes.phone}>
                {phone}
              </Typography>
            </CardContent>
          </div>
        </div>
        <CardActions>
            <Button
                variant="contained"
                size="medium"
                color="primary"
                startIcon={<EditRounded />}
            >
                Edit
            </Button>
            <Button
                varient="outlined"
                size="medium"
                color="secondary"
                startIcon={<DeleteForeverRounded />}
            >
                Delete
            </Button>
        </CardActions>
      </Card>
    );
}