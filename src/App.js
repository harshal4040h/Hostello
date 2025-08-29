import { Outlet } from 'react-router-dom';
import Header from './Header';
function App() {
  return (
    <div className="App flex">
      <div className=' w-[41px] h-screen flex flex-wrap hover:w-[170px] duration-300 '>
        <Header />
      </div> 
      <div className='bg-gray-200 w-screen h-screen overflow-scroll'>
        <div className=''>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
