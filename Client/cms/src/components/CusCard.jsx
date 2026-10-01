import { Card, CardContent, Stack, Typography } from "@mui/material";



 const CusCard = (({ title, value, metric }) => {
    return (
      <Card>
          <CardContent>
            <Stack direction="row" sx={{gap:1}}>
                <Typography variant="h5"> {title} </Typography>
                <Typography gutterBottom color="primary">{metric}</Typography>
            </Stack>
                <Typography variant="h5"  gutterBottom>{value}</Typography>
          </CardContent>

      </Card>
    );
})

export default CusCard;


