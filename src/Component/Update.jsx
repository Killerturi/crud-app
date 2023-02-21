import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { getuser, updateUser } from "../Api/Api";

const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 27%",
    "&>*": {
      marginTop: 20,
    },
  },
});

const Update = () => {
  const { id } = useParams();

  const classes = useStyles();

  const history = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { name, email, phone, address } = user;

  const textHandlde = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const clickHandle = async () => {
    await updateUser(id, user);
    history("/user-list");
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getuser(id);
    console.log(res.data);
    setUser(res.data);
  };

  return (
    <>
      <div>
        <Typography>
          <h2>UpdateForm</h2>
        </Typography>
        <FormGroup className={classes.container}>
          <FormControl>
            <InputLabel htmlFor="input">Name:</InputLabel>
            <Input name="name" onChange={(e) => textHandlde(e)} value={name} />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="input">Email:</InputLabel>
            <Input
              name="email"
              value={email}
              onChange={(e) => textHandlde(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="input">phone:</InputLabel>
            <Input
              name="phone"
              value={phone}
              onChange={(e) => textHandlde(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="input">Address:</InputLabel>
            <Input
              name="address"
              value={address}
              onChange={(e) => textHandlde(e)}
            />
          </FormControl>
          <FormControl>
            <Button variant="contained" onClick={() => clickHandle()}>
              Update
            </Button>
          </FormControl>
        </FormGroup>
      </div>
    </>
  );
};

export default Update;
