import { Outlet } from 'react-router-dom';
import Header from './Header';
function App() {
  return (
    <div className="App flex">
      <div className='bg-purple-700 w-[41px] h-screen flex flex-wrap hover:w-[200px]  duration-300 '>
      <Header/>
      </div>
      <div className='bg-gray-200 w-screen h-screen'>
      <Outlet/>
      </div>
    </div>
  );
}

export default App;
