import { useEffect,useRef, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { getContacts } from './api/ContactService';
import Header from './components/Header'
import { ToastContainer } from 'react-toastify';
import ContactList from './components/ContactList'

function App() {
  const modalRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <>
      <Header toggleModal={toggleModal} nbOfContacts={data.totalElements}/>
      <main className='main'>
        <div className='container'>
        <Routes>
            <Route path='/' element={<Navigate to={'/contacts'} />} />
            <Route path="/contacts" element={<ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts} />} />
            {/* <Route path="/contacts/:id" element={<ContactDetail updateContact={updateContact} updateImage={updateImage} />} />  */}
          </Routes>
        </div>

      </main>

      {/* Modal */}
      <ToastContainer />
    </>
  )
}

export default App
