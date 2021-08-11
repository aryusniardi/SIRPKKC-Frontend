/* eslint-disable */
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core';

const GraphDiagnosa = ({ diagnosa, props }) => {
  return (
    <Card
      sx={{ height: '100%' }}
      {...props}
      style={{
        display: 'block',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CardHeader title="Diagnosa Tertinggi" />
      <CardContent style={{
          height: 'calc(100% - 86px)'
      }}>
        <Box>
          <List>
            {diagnosa.slice(0, 5).map((diagnosa, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Typography variant="h4" color="Highlight" fontWeight={700} fontSize="1.4rem">
                    {index + 1}.
                  </Typography>
                </ListItemAvatar>
                <ListItemText style={{textTransform:"capitalize"}} primary={diagnosa._id} secondary={`Jumlah Penderita: ${diagnosa.count}`}/>
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GraphDiagnosa;
