import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import aliflogo from 'assets/image/aliflogo.svg'
import { Avatar, Badge, Box, Button, ClickAwayListener, Grow, IconButton, ListItemIcon, Menu, MenuItem, MenuList, Paper, Popper, Tooltip } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux';
import { Logout } from '@mui/icons-material';
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [rmv, setRmv] = useState(true)
    const user = useSelector(state => state.reducer.user)
    const navLink1 = "font-semibold tracking-wide text-white  transition-colors duration-200 font-sans text-xl nav-link-alif nav-link-ltr-alif hover:text-white"
    const navLink2 = "font-semibold tracking-wide text-white  transition-colors duration-200 font-sans text-xl   hover:text-white hover:underline"
    const [navbarColor, setNavbarColor] = useState('text-white8 bg-black8 fixed w-full top-0');
    const cart = useSelector(state => state.reducer.cart);
    const count = cart?.items?.reduce((accumulator, current) => accumulator + current.quantity, 0);
    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            //   setScrollPosition(position);

            // Change the navbar color based on the scroll position
            if (position > 100) {
                setRmv(false)
                setNavbarColor('text-white8 bg-black fixed w-full top-0 z-10');
            } else {
                setRmv(true)
                setNavbarColor('text-white8 bg-black8 fixed w-full top-0 z-10');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className='containe z-50'>
            <div className={navbarColor}>
                <div className='flex justify-center bg-black8 py-1 z-100 items-center'>
                    <div >
                        <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.0489 10.5681L21.2364 4.00563C21.1643 3.83695 21.0441 3.69319 20.891 3.59219C20.7378 3.49119 20.5584 3.4374 20.3749 3.4375H17.5624V1.5625C17.5624 1.31386 17.4636 1.0754 17.2878 0.899588C17.112 0.723772 16.8735 0.625 16.6249 0.625H1.62489V2.5H15.6874V14.2712C15.2602 14.5193 14.8863 14.8495 14.5874 15.2427C14.2884 15.636 14.0703 16.0845 13.9455 16.5625H8.05426C7.82608 15.6788 7.28342 14.9086 6.528 14.3963C5.77259 13.884 4.85627 13.6649 3.95082 13.7799C3.04537 13.8949 2.21295 14.3362 1.60958 15.021C1.00622 15.7059 0.67334 16.5873 0.67334 17.5C0.67334 18.4127 1.00622 19.2941 1.60958 19.979C2.21295 20.6638 3.04537 21.1051 3.95082 21.2201C4.85627 21.3351 5.77259 21.116 6.528 20.6037C7.28342 20.0914 7.82608 19.3212 8.05426 18.4375H13.9455C14.1495 19.2421 14.6159 19.9557 15.2709 20.4655C15.926 20.9752 16.7323 21.252 17.5624 21.252C18.3924 21.252 19.1988 20.9752 19.8538 20.4655C20.5089 19.9557 20.9753 19.2421 21.1793 18.4375H23.1874C23.436 18.4375 23.6745 18.3387 23.8503 18.1629C24.0261 17.9871 24.1249 17.7486 24.1249 17.5V10.9375C24.1249 10.8105 24.0991 10.6848 24.0489 10.5681ZM4.43739 19.375C4.06655 19.375 3.70403 19.265 3.39569 19.059C3.08735 18.853 2.84703 18.5601 2.70511 18.2175C2.5632 17.8749 2.52607 17.4979 2.59841 17.1342C2.67076 16.7705 2.84934 16.4364 3.11156 16.1742C3.37378 15.912 3.70788 15.7334 4.07159 15.661C4.43531 15.5887 4.81231 15.6258 5.15492 15.7677C5.49753 15.9096 5.79036 16.15 5.99639 16.4583C6.20242 16.7666 6.31239 17.1292 6.31239 17.5C6.31189 17.9971 6.11419 18.4738 5.76266 18.8253C5.41114 19.1768 4.93451 19.3745 4.43739 19.375ZM17.5624 5.3125H19.7561L21.7661 10H17.5624V5.3125ZM17.5624 19.375C17.1915 19.375 16.829 19.265 16.5207 19.059C16.2124 18.853 15.972 18.5601 15.8301 18.2175C15.6882 17.8749 15.6511 17.4979 15.7234 17.1342C15.7958 16.7705 15.9743 16.4364 16.2366 16.1742C16.4988 15.912 16.8329 15.7334 17.1966 15.661C17.5603 15.5887 17.9373 15.6258 18.2799 15.7677C18.6225 15.9096 18.9154 16.15 19.1214 16.4583C19.3274 16.7666 19.4374 17.1292 19.4374 17.5C19.4369 17.9971 19.2392 18.4738 18.8877 18.8253C18.5361 19.1768 18.0595 19.3745 17.5624 19.375ZM22.2499 16.5625H21.1793C20.9728 15.7595 20.5056 15.0477 19.851 14.5387C19.1965 14.0297 18.3915 13.7523 17.5624 13.75V11.875H22.2499V16.5625Z" fill="white" />
                        </svg>

                    </div>
                    <div>
                        <h1 className='text-2xl mx-1 font-arial font-bold'>FREE DELIVERY IN GREECE</h1>
                    </div>
                    <div>
                        <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.0489 10.5681L21.2364 4.00563C21.1643 3.83695 21.0441 3.69319 20.891 3.59219C20.7378 3.49119 20.5584 3.4374 20.3749 3.4375H17.5624V1.5625C17.5624 1.31386 17.4636 1.0754 17.2878 0.899588C17.112 0.723772 16.8735 0.625 16.6249 0.625H1.62489V2.5H15.6874V14.2712C15.2602 14.5193 14.8863 14.8495 14.5874 15.2427C14.2884 15.636 14.0703 16.0845 13.9455 16.5625H8.05426C7.82608 15.6788 7.28342 14.9086 6.528 14.3963C5.77259 13.884 4.85627 13.6649 3.95082 13.7799C3.04537 13.8949 2.21295 14.3362 1.60958 15.021C1.00622 15.7059 0.67334 16.5873 0.67334 17.5C0.67334 18.4127 1.00622 19.2941 1.60958 19.979C2.21295 20.6638 3.04537 21.1051 3.95082 21.2201C4.85627 21.3351 5.77259 21.116 6.528 20.6037C7.28342 20.0914 7.82608 19.3212 8.05426 18.4375H13.9455C14.1495 19.2421 14.6159 19.9557 15.2709 20.4655C15.926 20.9752 16.7323 21.252 17.5624 21.252C18.3924 21.252 19.1988 20.9752 19.8538 20.4655C20.5089 19.9557 20.9753 19.2421 21.1793 18.4375H23.1874C23.436 18.4375 23.6745 18.3387 23.8503 18.1629C24.0261 17.9871 24.1249 17.7486 24.1249 17.5V10.9375C24.1249 10.8105 24.0991 10.6848 24.0489 10.5681ZM4.43739 19.375C4.06655 19.375 3.70403 19.265 3.39569 19.059C3.08735 18.853 2.84703 18.5601 2.70511 18.2175C2.5632 17.8749 2.52607 17.4979 2.59841 17.1342C2.67076 16.7705 2.84934 16.4364 3.11156 16.1742C3.37378 15.912 3.70788 15.7334 4.07159 15.661C4.43531 15.5887 4.81231 15.6258 5.15492 15.7677C5.49753 15.9096 5.79036 16.15 5.99639 16.4583C6.20242 16.7666 6.31239 17.1292 6.31239 17.5C6.31189 17.9971 6.11419 18.4738 5.76266 18.8253C5.41114 19.1768 4.93451 19.3745 4.43739 19.375ZM17.5624 5.3125H19.7561L21.7661 10H17.5624V5.3125ZM17.5624 19.375C17.1915 19.375 16.829 19.265 16.5207 19.059C16.2124 18.853 15.972 18.5601 15.8301 18.2175C15.6882 17.8749 15.6511 17.4979 15.7234 17.1342C15.7958 16.7705 15.9743 16.4364 16.2366 16.1742C16.4988 15.912 16.8329 15.7334 17.1966 15.661C17.5603 15.5887 17.9373 15.6258 18.2799 15.7677C18.6225 15.9096 18.9154 16.15 19.1214 16.4583C19.3274 16.7666 19.4374 17.1292 19.4374 17.5C19.4369 17.9971 19.2392 18.4738 18.8877 18.8253C18.5361 19.1768 18.0595 19.3745 17.5624 19.375ZM22.2499 16.5625H21.1793C20.9728 15.7595 20.5056 15.0477 19.851 14.5387C19.1965 14.0297 18.3915 13.7523 17.5624 13.75V11.875H22.2499V16.5625Z" fill="white" />
                        </svg>

                    </div>
                </div>
                <div className='flex items-center justify-center mt-2'>
                    <img src={aliflogo} alt='loading' />
                </div>
                <div className="relative flex items-center justify-between  ">
                    <div className='bg-blue-700 z-100 '>

                    </div>

                    <ul className=" ml-[350px] hidden lg:flex items-center ">
                        <li className='mx-2'>
                            <Link

                                to="/"
                                className={navLink1}
                            >
                                Home
                            </Link>
                        </li>

                        <li className='mx-2'>
                            <Link
                                to="/shop"
                                className={navLink1}
                            >
                                Shop
                            </Link>
                        </li>
                        
                        <li className='mx-2'>
                            <Link
                                to="/make-order"
                                className={navLink1}
                            >
                                Made To Order
                            </Link>
                        </li>
                        <li className='mx-2'>
                            <Link
                                to="/insider-alif"
                                className={navLink1}
                            >
                                Insider Alif
                            </Link>
                        </li>
                        <li  >
                            <Link
                                to="/contact"
                                className={navLink1}

                            >
                                Contact
                            </Link>
                        </li>


                    </ul>
                    {/*  */}
                    <ul className="  items-center hidden space-x-8 lg:flex mr-3">


                        <form className="relative mx-auto w-max text-white">
                            <input type="search"
                                className="peer cursor-pointer relative z-10 h-12 w-12   bg-transparent   outline-none focus:w-full   " />
                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </form>
                        <li>
                            <Link to="/my-cart">
                                <Badge color="secondary" badgeContent={count}>
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                            </Link>
                        </li>
                        <li>
                            {!user?.email && <div>
                                <Button
                                    ref={anchorRef}
                                    id="composition-button"
                                    aria-controls={open ? 'composition-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }} src="/static/images/avatar/1.jpg">

                                    </Avatar>
                                </Button>
                                <Popper
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    placement="bottom-start"
                                    transition
                                    disablePortal
                                    className={rmv ? 'bg-black8 rounded-lg' : 'bg-black rounded-lg'}
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                        className={rmv ? 'bg-black8 rounded-lg px-5' : 'bg-black rounded-lg px-5'}
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList
                                                        autoFocusItem={open}
                                                        id="composition-menu"
                                                        aria-labelledby="composition-button"
                                                        onKeyDown={handleListKeyDown}
                                                    >
                                                        <MenuItem onClick={handleClose}>  <Link
                                                            to="/register"
                                                            className={navLink1}
                                                        >
                                                            Sign Up
                                                        </Link></MenuItem>
                                                        <MenuItem onClick={handleClose}>  <Link
                                                            to="/login"
                                                            className={navLink1}
                                                        >
                                                            Sign In
                                                        </Link></MenuItem>

                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>}
                            {user?.email && <div>
                                <Button
                                    ref={anchorRef}
                                    id="composition-button"
                                    aria-controls={open ? 'composition-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }} src={user?.profileImg}>

                                    </Avatar>
                                </Button>
                                <Popper
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    placement="bottom-start"
                                    transition
                                    disablePortal
                                    className={rmv ? 'bg-black8 rounded-lg' : 'bg-black rounded-lg'}
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            className={rmv ? 'bg-black8 px-5' : 'bg-black px-5'}
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList
                                                        autoFocusItem={open}
                                                        id="composition-menu"
                                                        aria-labelledby="composition-button"
                                                        onKeyDown={handleListKeyDown}
                                                    >
                                                        <MenuItem onClick={handleClose}>
                                                            <Link
                                                                to="/wishlist"
                                                                className={navLink1}
                                                            >
                                                              Profile
                                                            </Link>
                                                        </MenuItem>
                                                        <MenuItem onClick={handleClose}>   <Link
                                                            to="/wishlist"
                                                            className={navLink1}
                                                        >
                                                            Wishlist
                                                        </Link></MenuItem>
                                                        <MenuItem onClick={handleClose}>
                                                        <Link
                                                          
                                                            className={navLink1}
                                                        >
                                                           Log Out
                                                        </Link>
                                                        </MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>}
                        </li>
                        <select id="lang" className="bg-gray-50 border border-red text-slate-800 text-sm rounded-lg ">
                            <option selected>EN</option>
                            <option value="US">SP</option>

                        </select>

                    </ul>


                    <div className="lg:hidden">
                        <button
                            aria-label="Open Menu"
                            title="Open Menu"
                            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                                />
                            </svg>
                        </button>
                        {isMenuOpen && (
                            <div className='fixed top-0 left-0 w-full z-[999] bg-black'>
                                <div className=" flex flex-row-reverse justify-between py-10">
                                    <div className=" ">
                                        <button
                                            aria-label="Close Menu"
                                            title="Close Menu"
                                            className="py-6 px-4 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline text-black text-5xl"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <svg className="w-10 text-gray-600" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                />
                                            </svg>
                                        </button>

                                    </div>
                                    <nav className="text-slate-900">
                                        <ul className="space-y-4 p-5">

                                            <li >
                                                <Link
                                                    to="/partners"
                                                    className={navLink2}
                                                >
                                                    Partners
                                                </Link>
                                            </li>
                                            <li >
                                                <Link
                                                    to="/contract"
                                                    className={navLink2}
                                                >
                                                    Contact
                                                </Link>
                                            </li>
                                            <li >
                                                <Link
                                                    to="/contract"
                                                    className={navLink2}
                                                >
                                                    Contact
                                                </Link>
                                            </li>
                                            <li >
                                                <Link
                                                    to="/contract"
                                                    className={navLink2}
                                                >
                                                    Contact
                                                </Link>
                                            </li>
                                            <li >
                                                <Link
                                                    to="/contract"
                                                    className={navLink2}
                                                >
                                                    Contact
                                                </Link>
                                            </li>


                                        </ul>
                                        <ul className="flex items-center mt-6  space-x-8 lg:flex">

                                            <li>
                                                <Link to="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                                    </svg>
                                                </Link>
                                            </li>


                                        </ul>
                                        <ul className="flex justify-between items-center  space-x-8 lg:flex mt-6">
                                            <form className="relative  w-max ">
                                                <input type="search"
                                                    className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-8 outline-none focus:w-full focus:cursor-text focus:border-rose-300 focus:pl-16 focus:pr-4" />
                                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </form>

                                            <select id="lang" className="bg-gray-50    text-slate-800 text-sm rounded-lg ">
                                                <option selected className="text-slate-900">ENG</option>
                                                <option value="US">SP</option>

                                            </select>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>



    );
};

export default Navbar;