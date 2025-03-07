import { useState } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { getContacts } from './api/ContactService';
import Header from './components/Header'
import { ToastContainer } from 'react-toastify';

function App() {
  
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

  return (
    <>
      <Header toggleModal={toggleModal} nbOfContacts={data.totalElements}/>
      <main>

      </main>

      {/* Modal */}
      <ToastContainer />
    </>
  )
}

export default App
