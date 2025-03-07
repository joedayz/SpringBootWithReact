import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getContact } from '../api/ContactService';
import { toastError, toastSuccess } from '../api/ToastService';


const ContactDetail = ({ updateContact, updateImage }) => {
          const inputRef = useRef();
          const [contact, setContact] = useState({
                    id: '',
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    title: '',
                    status: '',
                    photoUrl: ''
          });

          const { id } = useParams();

          const fetchContact = async (id) => {
                    try {
                              const { data } = await getContact(id);
                              setContact(data);
                              console.log(data);
                    } catch (error) {
                              console.log(error);
                              toastError(error.message);
                    }
          };

          const selectImage = () => {
                    inputRef.current.click();
          };

          useEffect(() => {
                    fetchContact(id);
          }, []);


          return (
                    <>

                              <Link to={'/contacts'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>

                              <div className='profile'>

                              </div>

                              <form style={{ display: 'none' }}>
                                        <input type='file' ref={inputRef} onChange={(event) => udpatePhoto(event.target.files[0])} name='file' accept='image/*' />
                              </form>


                    </>
          )
}

export default ContactDetail