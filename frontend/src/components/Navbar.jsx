
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'



const Navbar = () => {

    const [visible, setVisible] = useState(false)
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        navigate('/login')
    }


    return (
        <div className='flex items-center justify-between font-medium'>
            <Link to='/'> <img src={assets.logo} className='w-28' alt="" /></Link>

            <ul className='hidden gap-5 text-sm text-gray-700 sm:flex '>

                <NavLink className='flex flex-col items-center gap-1 ' to='/'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700  hidden' />
                </NavLink >

                <NavLink className='flex flex-col items-center gap-1 ' to='/collection'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700  hidden' />
                </NavLink >
                <NavLink className='flex flex-col items-center gap-1 ' to='/about'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700  hidden' />
                </NavLink >
                <NavLink className='flex flex-col items-center gap-1 ' to='/contact'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700  hidden' />
                </NavLink >


            </ul>

            <div className='flex items-center gap-6 '>
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="" className='w-5 cursor-pointer ' />

                <div className='relative group'>
                    {/* <Link to='/Login'> */}
                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt="" className='w-5 cursor-pointer ' />
                    {/* drop down menu  */}
                    {token && 
                    <div className='absolute right-0 hidden pt-4 group-hover:block dropdown-menu'>
                    <div className='flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <NavLink className='cursor-pointer hover:text-black' to='/orders'>My Orders</NavLink >
                        {/* <p className='cursor-pointer hover:text-black'  >My Orders</p> */}

                        <NavLink onClick={logout} className='cursor-pointer hover:text-black' to='/login'>Logout</NavLink >
                    </div>
                </div>
                    }
                    



                </div>

                <Link to='/cart' className='relative ' >
                    <img src={assets.cart_icon} alt="" className='w-5 cursor-pointer ' />
                    <p className=' absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />

            </div>

            {/* Sidebar menu for small screen */}

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white  transition-all ${visible ? 'w-full' : 'w-0'} `}>
                <div className='flex flex-col text-gray-600'>

                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180 ' alt="" />
                        <p>Close</p>

                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink >
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink >

                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink >

                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink >



                </div>


            </div>

        </div>

    )
}

export default Navbar