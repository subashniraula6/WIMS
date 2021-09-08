import React, { useEffect } from "react";
import {
	Person,
	BusinessCenter,
	DoubleArrow,
	Filter9Plus,
	Photo,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {getInventory} from '../../Redux/actions/inventoryactions'
import { useParams } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";

export default function Inventory() {
	const dispatch = useDispatch();
	const inventoryReducer = useSelector(store => store.inventoryReducer)
	const {isLoading, inventory} = inventoryReducer;
	const params = useParams()
	const id = params.id;
	useEffect(()=> {
		dispatch(getInventory(id))
	}, [])
	if(isLoading) return <Spinner />
	return (
		<>
			<div className="container card bg-light mb-3">
				<div className="card-header bg-warning text-white text-center">
					Device Details
				</div>
				<div className="container  mt-3 mb-3">
					<div className="card mt-3 mb-3">
						<div className="card-body row">
							<div className='col-sm-6'>
								<div className='item my-4'>
									<h5 className="card-title">
										<BusinessCenter />
										Brand
									</h5>
									<h6 className="card-subtitle m-2 text-muted">{inventory && inventory.brand}</h6>
								</div>
								<div className='item my-4'>
									<h5 className="card-title">
										<DoubleArrow />
										Model
									</h5>
									<h6 className="card-subtitle m-2 text-muted">{inventory && inventory.model}</h6>
								</div>
								<div className='item my-4'>
									<h5 className="card-title">
										<DoubleArrow />
										Type
									</h5>
									<h6 className="card-subtitle m-2 text-muted">{inventory && inventory.category}</h6>
								</div>								
							</div>
							<div className='col-sm-6'>
								<div className='item my-4'>
									<h5 className="card-title">
										<Filter9Plus />
										Serial Number
									</h5>
									<h6 className="card-subtitle m-2 text-muted">{inventory && inventory.serialNumber}</h6>
								</div>
								<div className='item my-4'>
									<h6 className="card-subtitle m-2 text-muted">
										<img width="20%" src="https://upload.wikimedia.org/wikipedia/commons/6/61/Rubiks_cube_solved.jpg" alt='image'/>
									</h6>
								</div>																
							</div>
						</div>
					</div>
				</div>
				<h3 className='px-3 mt-2'>Current Owner</h3>
				<hr />

				<div className="container mb-3 rounded">
					<h5 className="text-uppercase my-2">{inventory && inventory.user.fullName}</h5>
					<div className="card mb-3 py-2">
						<div className="card-body row">
							<div className='col-6'>
								<h5 className="card-title">Position</h5>
								<h6 className="card-subtitle mb-2 text-muted">{inventory && inventory.user.designation}</h6>
							</div>
							<div className='col-6'>
								<h5 className="card-title">Email</h5>
								<h6 className="card-subtitle mb-2 text-muted">
									{inventory && inventory.user.email}
								</h6>
							</div>
						</div>					
					</div>
				</div>
			</div>
		</>
	);
}
