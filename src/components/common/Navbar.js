import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ACCOUNT_TYPE } from "../../utils/constants"
import mylogo from '../../assets/Logo/LearnSphere.png';

const Navbar=()=>{

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state)=>state.cart);

    const location=useLocation();

    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }
   
    const [subLinks,setSubLinks] = useState([]);

    const fetchSublinks = async()=>{

        try{

            const result = await apiConnector("GET",categories.CATEGORIES_API);
            console.log("Printing Sublinks result : ",result);
            setSubLinks(result.data.data);

        }catch(error){

            console.log("Could not fetch the category list");
            console.log(error);

        }

    }



    useEffect(()=>{

        fetchSublinks();

    },[]);



    return(
        <div className="flex h-14 items-center justify-center border-b-[1px]  border-richblack-700 ">
            <div className="flex w-11/12 max-w-maxContent  items-center justify-between ">

            <Link to="/">

            <img src = {mylogo} 
            width={160} 
            height={42} 
            loading="lazy"/>

            </Link>

            {/* NavLinks */}

            <nav>
                <ul className="flex gap-x-6 text-richblack-25 ">
                    {
                        NavbarLinks.map((link,index)=>(
                            <li key={index}>
                                {
                                    link.title === "Catalog" ?
                                    (
                                      <div className="relative flex items-center gap-x-2 cursor-pointer group">
                                        <p>{link.title}</p>
                                        <IoIosArrowDropdownCircle/>

                                        <div className="invisible opacity-0 z-[1000] absolute left-[50%] top-[50%] 
                                        flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                        transition-all duration-400 group-hover:visible
                                        group-hover:opacity-100 w-[300px] group-hover:translate-y-[15%]
                                        translate-x-[-50%]">

                                            <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded 
                                            bg-richblack-5 -translate-y-[40%] translate-x-[80%] ">
                                            </div>

                                            {
                                                subLinks?.map((link,index)=>(
                                                   <Link 
                                                   to={`/catalog/${link.name
                                                                        .split(" ")
                                                                        .join("-")
                                                                        .toLowerCase()}`}
                                                   key={index}>

                                                    <p className="text-richblack-800 py-4 px-4
                                                    hover:bg-richblack-50 rounded-md 
                                                    ">{link.name}</p>
                                                   </Link>
                                                ))
                                            }

                                        </div>

                                      </div>
                                    ):
                                    (
                                        <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path) ? ("text-yellow-25") : ("text-richblack-25")} `}>
                                            {link.title}
                                        </p>
                                        </Link>
                                    )
                                }
                            </li>
                        ))

                    }

                </ul>
            </nav>


            
            {/* Login/Signup/dashboard */}

            <div className="flex gap-x-4 items-center">
                {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                           <Link to="/dashboard/cart" className="relative">
                             <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                             {totalItems > 0 && (
                               <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                 {totalItems}
                               </span>
                             )}
                           </Link>
                         )}
                {
                    token === null && (
                        <Link to="/login">
                        <button className="border-richblack-700 border bg-richblack-800 px-[12px] py-[10px] text-richblack-100 rounded-md">
                            Log in
                        </button>
                        </Link>
                    )

                }
                {
                    token === null && (
                        <Link to="/signup">
                        <button className="border-richblack-700 border bg-richblack-800 px-[12px] py-[10px] text-richblack-100 rounded-md">
                            Sign Up
                        </button>
                        </Link>
                    )
                }
                {
                    token !==null &&
                    (
                        <ProfileDropDown/>
                    )

                }

            </div>



            </div>
        </div>
    )
}

export default Navbar;
