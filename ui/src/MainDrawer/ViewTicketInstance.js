import React, { Fragment, useState, useEffect } from "react";
import API from '../API_Interface/API_Interface';
import {
  Box,
  Typography,
  MenuItem,
  Button,
  Grid,
  Paper
} from "@mui/material";
import Stack from '@mui/joy/Stack';

const Fields = (props) => {

  console.log("this is the ticket: " + JSON.stringify(props.ticket));

  const assertRole = () => {
    if (props.role === "admin" || props.role === "employee") {
      return true;
    }
    return false;
  }


  const [fields, setFields] = useState([]);
  const [reveal, setReveal] = useState(assertRole());
  // const[ticketID, setTicketID] = useState([props.ticket.ticketID]);

  const title = props.ticket.title;
  const info = props.ticket.info;
  const ticketID = props.ticket.ticketID;
  const isoString = props.ticket.dateCreated;
  const date = new Date(isoString).toLocaleDateString();
  const status = props.ticket.status;
  const role = props.role;

  console.log("fields: " + JSON.stringify(fields));
  console.log("ticketID: " + JSON.stringify(ticketID));
  console.log("role: " + role);

  // const changeReveal = (role) => {
  //   if(role === "admin" || role === "employee"){
  //     setReveal(true);
  //   }
  // }

  // changeReveal(role);


  useEffect(() => {
    const api = new API();

    async function getFields() {
      const routesJSONString = await api.getTicketByID(props.ticket.ticketID);
      console.log(`Ticket by ticket ID: ${props.ticket.ticketID}, ${JSON.stringify(routesJSONString)}`);

      setFields(routesJSONString.data.map((ticket) => ({
        field: ticket.field,
        tag: ticket.tag,
      })));

    }

    getFields();
  }, [ticketID]);


  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setSelectedTags(fields);
    console.log("selectedTags ", selectedTags);

  }, [fields]);


  const handleResolve = async () => {
    const api = new API();
    const response = await api.compleTicket(ticketID);
    console.log("response: " + JSON.stringify(response));
    window.location.reload();
  };

  //sx={{color:"secondary.main"}}

  return (
   <Fragment>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" sx={{ color: "text.primary" }}>
          {title}
        </Typography>
        <Box sx={{ }} >
          <Typography variant="h5" sx={{ color: "text.primary" }}>
            Status: {status}
          </Typography>
        {/* <CircleOutlinedIcon sx={{ color: "secondary.main" }}/> */}
        </Box>
        <Typography variant="h5" sx={{ color: "text.primary" }}>
          Date Created: {date}
        </Typography>
      </Grid>
      <Grid item xs={6} >
        <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1}}>
          {info}
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={1} direction="row">
          <Stack direction="column">
            {fields.map((field, index) => (
              <Box
                key={field.tag}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  my: 1,
                  p: 1,
                  border: "2px solid",
                  borderColor: "secondary.main"
                }}
              >
                <Typography sx={{ mr: 1, color: "text.primary" }}>
                  {field.field + ": " }
                </Typography>
              </Box>
            ))}
          </Stack>

          <Stack direction="column">
            {fields.map((field, index) => (
              <Box
                key={field.tag}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  my: 1,
                  p: 1,
                  border: "2px solid",
                  borderColor: "secondary.main"
                }}
              >
                <Typography sx={{ mr: 1, color: "text.primary" }}>
                  {field.tag}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Button sx= {{display: reveal ? 'inline' : 'none' }} variant="contained" color="secondary" onClick={handleResolve}>
          Resolve
        </Button>
        </Grid>
    </Grid>
  </Fragment>




  );
};

export default Fields;