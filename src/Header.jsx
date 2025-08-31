import React, { useEffect, useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost/hostello_php/check_session.php", {
      credentials: "include" //  PHP session 
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) setUser(data.user);
        else setUser(null);

      });
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost/hostello_php/logout.php", {
      method: "POST",
      credentials: "include"// log-out 

    });
    setUser(null);
    window.location.href = "/login";

  };

  return (
    <div className=' rounded-r-xl bg-gray-900 w-screen'>

      <div className='flex mt-4 hover:cursor-pointer'>
        <div className=''>
          <svg className='w-9 fill-gray-400 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"> <path d="M296.5 69.2C311.4 62.3 328.6 62.3 343.5 69.2L562.1 170.2C570.6 174.1 576 182.6 576 192C576 201.4 570.6 209.9 562.1 213.8L343.5 314.8C328.6 321.7 311.4 321.7 296.5 314.8L77.9 213.8C69.4 209.8 64 201.3 64 192C64 182.7 69.4 174.1 77.9 170.2L296.5 69.2zM112.1 282.4L276.4 358.3C304.1 371.1 336 371.1 363.7 358.3L528 282.4L562.1 298.2C570.6 302.1 576 310.6 576 320C576 329.4 570.6 337.9 562.1 341.8L343.5 442.8C328.6 449.7 311.4 449.7 296.5 442.8L77.9 341.8C69.4 337.8 64 329.3 64 320C64 310.7 69.4 302.1 77.9 298.2L112 282.4zM77.9 426.2L112 410.4L276.3 486.3C304 499.1 335.9 499.1 363.6 486.3L527.9 410.4L562 426.2C570.5 430.1 575.9 438.6 575.9 448C575.9 457.4 570.5 465.9 562 469.8L343.4 570.8C328.5 577.7 311.3 577.7 296.4 570.8L77.9 469.8C69.4 465.8 64 457.3 64 448C64 438.7 69.4 430.1 77.9 426.2z" /></svg>
        </div>
        <div>
          <h1 className='text-gray-400 text-xl font-bold ml-2 '>Hostello</h1>
        </div>
      </div>
      {user && user.role === "user" && (
        <div className='flex mt-10 hover:cursor-pointer hover:border-l-[3px] border-white  hover:text-white hover:bg-gray-700 hover:rounded-lg'>
          <div>
            <svg className='w-9  fill-gray-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" /></svg>
          </div>
          <div>
            <h1 className='text-gray-400 text-xl font-bold ml-2 ' ><Link to={"/home"}>Home</Link></h1>
          </div>
        </div>
      )
      }

      {!user && (<div className='flex mt-7 hover:border-l-[3px] border-white  hover:text-white hover:bg-gray-700 hover:rounded-lg'>
        <div>
          <svg className='w-9 fill-gray-400 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" /></svg>
        </div>
        <div>
          <h1 className='text-gray-400 text-xl font-bold ml-2'><Link to={"/studentregistration"}>Student Registration</Link></h1>
        </div>
      </div>
      )}
      {!user && (
        <div className='flex mt-7 hover:border-l-[3px] border-white  hover:text-white hover:bg-gray-700 hover:rounded-lg'>
          <div>
            <svg className='w-9 fill-gray-400 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" /></svg>
          </div>
          <div>
            <h1 className='text-gray-400 text-xl font-bold ml-2'><Link to={"/login"}>Log in</Link></h1>
          </div>
        </div>)
      }

      {user && user.role === "user" && (

        <>
          <div className='flex mt-7 hover:border-l-[3px] border-white  hover:text-white hover:bg-gray-700 hover:rounded-lg'>
            <div>
              <svg className='w-9 fill-gray-400 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M80 88C80 74.7 90.7 64 104 64L536 64C549.3 64 560 74.7 560 88C560 101.3 549.3 112 536 112L528 112L528 528L536 528C549.3 528 560 538.7 560 552C560 565.3 549.3 576 536 576L104 576C90.7 576 80 565.3 80 552C80 538.7 90.7 528 104 528L112 528L112 112L104 112C90.7 112 80 101.3 80 88zM288 176L288 208C288 216.8 295.2 224 304 224L336 224C344.8 224 352 216.8 352 208L352 176C352 167.2 344.8 160 336 160L304 160C295.2 160 288 167.2 288 176zM192 160C183.2 160 176 167.2 176 176L176 208C176 216.8 183.2 224 192 224L224 224C232.8 224 240 216.8 240 208L240 176C240 167.2 232.8 160 224 160L192 160zM288 272L288 304C288 312.8 295.2 320 304 320L336 320C344.8 320 352 312.8 352 304L352 272C352 263.2 344.8 256 336 256L304 256C295.2 256 288 263.2 288 272zM416 160C407.2 160 400 167.2 400 176L400 208C400 216.8 407.2 224 416 224L448 224C456.8 224 464 216.8 464 208L464 176C464 167.2 456.8 160 448 160L416 160zM176 272L176 304C176 312.8 183.2 320 192 320L224 320C232.8 320 240 312.8 240 304L240 272C240 263.2 232.8 256 224 256L192 256C183.2 256 176 263.2 176 272zM416 256C407.2 256 400 263.2 400 272L400 304C400 312.8 407.2 320 416 320L448 320C456.8 320 464 312.8 464 304L464 272C464 263.2 456.8 256 448 256L416 256zM352 448L395.8 448C405.7 448 413.3 439 409.8 429.8C396 393.7 361 368 320.1 368C279.2 368 244.2 393.7 230.4 429.8C226.9 439 234.5 448 244.4 448L288.2 448L288.2 528L352.2 528L352.2 448z" /></svg>
            </div>
            <div>
              <h1 className='text-gray-400 text-xl font-bold ml-2 '><Link to={"/bookhostel"}>Book Hostel</Link></h1>
            </div>
          </div>

          <div className='flex mt-7 hover:border-l-[3px] border-white  hover:text-white hover:bg-gray-700 hover:rounded-lg'>
            <div>
              <svg className='w-9  fill-gray-400 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" /></svg>
            </div>
            <div>
              <h1 className='text-gray-400 text-xl font-bold ml-2'><Link to={"/user"}>user</Link></h1>
            </div>
          </div>
        </>
      )}
      {user && (
        <>
          <div className='flex absolute bottom-0 mb-8' onClick={handleLogout}>
            <div className=''>
              <svg className='w-9  fill-gray-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z" /></svg>
            </div>
            <div>
              <h1 className='text-gray-400 text-xl font-bold ml-2 hover:cursor-pointer'></h1>
            </div>

          </div>
        </>
      )}
      {user && user.role === "admin" && (
        <div className='flex mt-7 hover:border-l-[3px] border-white hover:text-white hover:bg-gray-700 hover:rounded-lg'>
          <div>
            <svg className='w-9  fill-gray-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 312C253.7 312 200 258.3 200 192C200 125.7 253.7 72 320 72C386.3 72 440 125.7 440 192C440 258.3 386.3 312 320 312zM289.5 368L350.5 368C360.2 368 368 375.8 368 385.5C368 389.7 366.5 393.7 363.8 396.9L336.4 428.9L367.4 544L368 544L402.6 405.5C404.8 396.8 413.7 391.5 422.1 394.7C484 418.3 528 478.3 528 548.5C528 563.6 515.7 575.9 500.6 575.9L139.4 576C124.3 576 112 563.7 112 548.6C112 478.4 156 418.4 217.9 394.8C226.3 391.6 235.2 396.9 237.4 405.6L272 544.1L272.6 544.1L303.6 429L276.2 397C273.5 393.8 272 389.8 272 385.6C272 375.9 279.8 368.1 289.5 368.1z" /></svg>
          </div>
          <div>
            <h1 className='text-gray-400 text-xl font-bold ml-2 '>
              <Link to={"/admin-dashboard"}>Admin Dashboard</Link>
            </h1>
          </div>
        </div>
      )}
      {user && user.role === "admin" && (
        <div className='flex mt-7 hover:border-l-[3px] border-white hover:text-white hover:bg-gray-700 hover:rounded-lg'>
          <div>
           <svg className='w-9  fill-gray-400'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M128 128C128 92.7 156.7 64 192 64L448 64C483.3 64 512 92.7 512 128L512 512C529.7 512 544 526.3 544 544C544 561.7 529.7 576 512 576L128 576C110.3 576 96 561.7 96 544C96 526.3 110.3 512 128 512L128 128zM416 352C433.7 352 448 337.7 448 320C448 302.3 433.7 288 416 288C398.3 288 384 302.3 384 320C384 337.7 398.3 352 416 352z"/></svg>
          </div>
          <div>
            <h1 className='text-gray-400 text-xl font-bold ml-2 '>
              <Link to={"/manage-rooms"}>Manage Rooms</Link>
            </h1>
          </div>
        </div>
      )} {user && user.role === "admin" && (
        <div className='flex mt-7 hover:border-l-[3px] border-white hover:text-white hover:bg-gray-700 hover:rounded-lg'>
          <div>
            <svg className='w-9  fill-gray-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M256 192C256 156.7 284.7 128 320 128C355.3 128 384 156.7 384 192C384 227.3 355.3 256 320 256C284.7 256 256 227.3 256 192zM208 400C208 338.1 258.1 288 320 288C381.9 288 432 338.1 432 400L432 408C432 421.3 421.3 432 408 432L232 432C218.7 432 208 421.3 208 408L208 400zM424 208C424 177.1 449.1 152 480 152C510.9 152 536 177.1 536 208C536 238.9 510.9 264 480 264C449.1 264 424 238.9 424 208zM451.2 308.4C460.3 305.5 470 304 480 304C533 304 576 347 576 400L576 410.7C576 422.5 566.4 432 554.7 432L475.9 432C478.6 424.5 480 416.4 480 408L480 400C480 365.9 469.4 334.3 451.2 308.4zM188.8 308.4C170.6 334.4 160 365.9 160 400L160 408C160 416.4 161.4 424.5 164.1 432L85.3 432C73.6 432 64 422.4 64 410.7L64 400C64 347 107 304 160 304C170 304 179.7 305.5 188.8 308.4zM104 208C104 177.1 129.1 152 160 152C190.9 152 216 177.1 216 208C216 238.9 190.9 264 160 264C129.1 264 104 238.9 104 208zM32 504C32 490.7 42.7 480 56 480L584 480C597.3 480 608 490.7 608 504C608 517.3 597.3 528 584 528L56 528C42.7 528 32 517.3 32 504z" /></svg>
          </div>
          <div>
            <h1 className='text-gray-400 text-xl font-bold ml-2 '>
              <Link to={"/manage-student"}>Manage Student</Link>
            </h1>
          </div>
        </div>
      )}{user &&
        (
          <div className='flex mt-7 hover:border-l-[3px] border-white hover:text-white hover:bg-gray-700 hover:rounded-lg'>
            <div>
              <svg    className='w-9 fill-gray-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/></svg>
            </div>
            <div>
              <h1 className='text-gray-400 text-xl font-bold ml-2 '>
                <Link to={"/contactus"}>ContactUs</Link>
              </h1>
            </div>
          </div>
        )
      }{user && (
        <div className='flex mt-7 hover:border-l-[3px] border-white hover:text-white hover:bg-gray-700 hover:rounded-lg'>
          <div>
            <svg
              className='w-9 fill-gray-400'
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM224 256C224 238.3 238.3 224 256 224L320 224C337.7 224 352 238.3 352 256L352 512L384 512C401.7 512 416 526.3 416 544C416 561.7 401.7 576 384 576L256 576C238.3 576 224 561.7 224 544C224 526.3 238.3 512 256 512L288 512L288 288L256 288C238.3 288 224 273.7 224 256z" />
            </svg>
          </div>
          <div>
            <h1 className='text-gray-400 text-xl font-bold ml-2'>
              <Link to={"/aboutus"}>About Us</Link>
            </h1>
          </div>
        </div>
      )}

    </div>
  )
}   
