import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import '../../styles/Address.css';
import { BsTrash3Fill } from 'react-icons/bs'

const Address = () => {

  const [show, setShow] = useState(false);

  let [addresses, setAddresses] = useState(() => {
    return JSON.parse(localStorage.getItem("address-list")) || []
  });
  const [addressValue, setAddressValue] = useState()

  const addressData = (e) => {
    const { name, value } = e.target;
    setAddressValue(prevState => ({ ...prevState, [name]: value }))
  }

  useEffect(() => {
    localStorage.setItem("address-list", JSON.stringify(addresses));
  }, [addresses])

  const handleAddress = (e) => {
    e.preventDefault();
    setAddresses([...addresses, addressValue]);
    setShow(false)
  }

  const handleClear = (street) => {
    const updatedAddress = addresses.length ? addresses.filter(address => address.street !== street) : null;
    setAddresses(updatedAddress);
    localStorage.setItem("address-list", JSON.stringify(updatedAddress));
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className='container'>
        {addresses?.map(address => (
          <div className='address-containers'>
            <div className='address-container'>
              <div className='container' key={address.street}>
                <div className='address-street'>{address.street},</div>
                <div className='address-city'>{address.city},</div>
                <div className='address-state'>{address.state},</div>
                <div className='address-country'>{address.country} - {address.postalCode}</div>
              </div>
            </div>
            <div className='address-delete-container'>
              <BsTrash3Fill className="delete-icon" onClick={() => handleClear(address.street)} />
            </div>
          </div>
        ))}
        <button onClick={handleShow} className='add-address-btn'>Add Address</button>
        <Modal show={show} onHide={handleClose} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Add Home address</Modal.Title>
          </Modal.Header>
          <form className='shadow-lg p-4' onSubmit={handleAddress}>
            <div className='form-group'>
              <label>Address</label>
              <input type='text' className='form-control' name='street' onChange={addressData} />
            </div>
            <div className='form-group'>
              <label>City</label>
              <input type='text' className='form-control' name='city' onChange={addressData} />
            </div>
            <div className='form-group'>
              <label>Phone No</label>
              <input
                type='phone'
                className='form-control'
                name='phone'
                onChange={addressData}
              />
            </div>
            <div className='form-group'>
              <label>Postal Code</label>
              <input
                type='number'
                className='form-control'
                name='postalCode'
                onChange={addressData}
              />
            </div>
            <div className='form-group'>
              <label>Country</label>
              <input
                type='text'
                className='form-control'
                name='country'
                onChange={addressData}
              />
            </div>
            <div className='form-group'>
              <label>State</label>
              <input
                type='text'
                className='form-control'
                name='state'
                onChange={addressData}
              />
            </div>
            <div className='d-grid gap-2 mt-3'>
              <button className='btn btn-primary'
                type='submit'
              >
                Add
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default Address;