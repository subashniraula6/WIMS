import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
	PersonAdd,
	Person,
	Email,
	VisibilityOff,
	Work,
	EmojiPeople,
	Event,
} from "@material-ui/icons";
import {addUser} from './Redux/actions/userActions'
import { useDispatch } from 'react-redux';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddUserModal() {
  //modal states
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  //modal functions
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  //user form state
  const [user, setUser] = useState({
      fullName: "",
      email: "",
      password: "",
      designation: "Engineer",
      role: "",
      joinedAt: ""
    })
  const dispatch = useDispatch();
    
  // user form functions
  function handleChange(e){
    const {name, value} = e.target;    
    setUser({...user, [name]: value})
  }
  function handleSubmit(e){
      e.preventDefault();
      console.log('submitted')
      try {
          dispatch(addUser(user));
          setOpen(false)
      } catch (error) {
          console.log(error)
      }
  }
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <>
			<div className="main container bg-light">
				<div className="card-header bg-warning text-white text-center mx-2 my-2">
					<PersonAdd /> Add New User
				</div>
				<form onSubmit={handleSubmit}>
					<div className="container mx-2 my-2">
						<div className="form-group my-2">
							<label>
								<Person />
								Name
							</label>
							<input
								type="text"
								className="form-control"
								placeholder="Full Name"
                                onChange={handleChange}
                                name="fullName"
                                value={user.fullName}
								required
							></input>
						</div>
						<div className="form-group my-2">
							<label>
								<Email />
								Email address
							</label>
							<input
								type="email"
								className="form-control"
								placeholder="name@example.com"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
								required
							></input>
						</div>
						<div className="form-group mt-2">
							<label>
								<VisibilityOff />
								Password
							</label>
							<input
								type="password"
								className="form-control"
								placeholder="Enter password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
								required
							/>
						</div>

						<div className="input-group my-2">
							<div className="input-group-prepend">
								<label className="input-group-text">
									<Work /> Designation
								</label>
							</div>
							<select className="custom-select" id="inputGroupSelect01" name="designation" value={user.designation} onChange={handleChange} required>
                                <option defaultValue="Engineer">Engineer</option>
								<option value="HR">HR</option>
								<option value="Intern">Intern</option>
							</select>
						</div>

						<div className="input-group mt-2">
							<div className="input-group-prepend">
								<label className="input-group-text">
									<EmojiPeople /> Role
								</label>
							</div>
							<select className="custom-select" id="inputGroupSelect01" name="role" value={user.role} onChange={handleChange} required>
                                <option defaultValue="ROLE_USER">User</option>
								<option value="ROLE_ADMIN">Admin</option>
							</select>
						</div>
						<div className="form-group my-2">
							<label>
								<Event />
								Joined At
							</label>
							<input
								type="date"
								className="form-control"
								placeholder="Date"
                                name='joinedAt'
                                value={user.joinedAt}
                                onChange={handleChange}
								required
							></input>
						</div>

						<div className="form-group my-2">
							<button type="submit" className="btn btn-outline-success mt-3 btn-block">
								Add
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
    </div>
  );

  return (
    <div>
      <button className="btn btn-info my-2" onClick={handleOpen}>
        Add user
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
