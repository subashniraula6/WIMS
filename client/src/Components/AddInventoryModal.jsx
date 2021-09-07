import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
	Store,
	Person,
	BusinessCenter,
	CropOriginal,
	DoubleArrow,
	Filter,
	Filter9Plus,
	People,
	Note,
} from "@material-ui/icons";
import {addInventory} from './Redux/actions/inventoryactions'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './Redux/actions/userActions'
import BuildIcon from '@material-ui/icons/Build';

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

export default function AddinventoryModal() {
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
  const [inventory, setInventory] = useState({
      name: "",
      brand: "",
      model: "",
      category: "Devices",
      userEmail: "",
      serialNumber: "",
      servicingDuration: 6,
      description: ""
    })
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchUsers());
  }, [])
    
  // user form functions
  function handleChange(e){
    const {name, value} = e.target;   
    setInventory({...inventory, [name]: value})
  }
  function handleSubmit(e){
      e.preventDefault();
      console.log('submitted')
      try {
          const user = document.getElementById('user').value
          const newInventory = {...inventory, userEmail: user}
          dispatch(addInventory(newInventory));
          setOpen(false)
      } catch (error) {
          console.log(error)
      }
  }
  const users = useSelector(store => store.userReducer.users);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <>
      <div className="main container bg-light">
				<div className="card-header bg-warning text-white text-center mx-2 my-2">
					<Store /> Add New Inventories
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
								placeholder="Inventory Name"
                                name='name'
                                value={inventory.value}
                                onChange={handleChange}
                                required
							></input>
						</div>
						<div className="form-group my-2">
							<label>
								<BusinessCenter />
								Brand
							</label>
							<input
								type="text"
								className="form-control"
								placeholder="Brand Name"
                                name='brand'
                                value={inventory.brand}
                                onChange={handleChange}
							></input>
						</div>
						<div className="form-group my-2">
							<label>
								<CropOriginal />
								Model
							</label>
							<input
								type="text"
								className="form-control"
								placeholder="Model Name"
                                name="model"
                                value={inventory.model}
                                onChange={handleChange}
							></input>
						</div>
						<div className="input-group my-2">
							<div className="input-group-prepend">
								<label className="input-group-text">
                                    <Filter />
    								Category
								</label>
							</div>
							<select className="custom-select" id="device" name="category" value={inventory.category} onChange={handleChange} required>
                                <option value="Devices">Devices</option>
								<option defaultChecked="Furniture">Furniture</option>
							</select>
						</div>
						<div className="form-group my-2">
							<label>
								<Filter9Plus />
								Serial Number
							</label>
							<input
								type="text"
								className="form-control"
								placeholder="Serial Number"
                                name='serialNumber'
                                value={inventory.serialNumber}
                                onChange={handleChange}
                                required
							></input>
						</div>
						<div className="input-group my-2">
							<div className="input-group-prepend">
								<label className="input-group-text">
									<People />
									Allocate To:
								</label>
							</div>
							<select className="custom-select" id="user">
                                {
                                    users.length && users.map(user => {
                                        return <option key={user.id} value={user.email}>{user.fullName}</option>
                                    })
                                }
							</select>
						</div>
                        <div className="input-group my-2">
							<div className="input-group-prepend">
								<label className="input-group-text">
                                    <BuildIcon />
    								Servicing Duration
								</label>
							</div>
							<select className="custom-select" name="servicingDuration" value={inventory.servicingDuration} onChange={handleChange} required>
                                <option value={6}>6 months</option>
                                <option value={9}>9 months</option>
								<option value={12}>12 months</option>
							</select>
						</div>
						<div className="form-group my-3">
							<label>
								<Note />
								Description
							</label>
							<textarea className="form-control" rows="3" name='description' value={inventory.description} onChange={handleChange}></textarea>
							<button type="submit" className="btn btn-outline-success mt-3">
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
      <button className="btn btn-info mt-2" onClick={handleOpen}>
        Add inventory
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
