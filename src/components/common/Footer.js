import React from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { FaFacebook,FaGoogle,FaTwitter,FaYoutube } from "react-icons/fa";
import { FooterLink2 } from "../../data/footer-links";
import Foot from "../common/Foot";
import Logo2 from '../../assets/Logo/LearnSphere.png'
const Footer=()=>{
    return(
        <div className=" bg-richblack-800">
            <div className="w-11/12  py-[52px]  px-[80px] mx-auto">
            <div className="flex max-lg:justify-center max-lg:flex-wrap w-[100%] pb-6 gap-[30px]  border-b-[1px] border-richblack-700">
                <div className="lg:w-[50%] pr-12 max-lg:flex-wrap  flex gap-3 border-r-[1px] border-richblack-700 justify-between">

                    <div className="flex flex-col gap-3">

                        <div className="w-[180px] h-[32px] -translate-y-20 -translate-x-5">
                        <img src={Logo2}/>
                        </div>

                        <p  className="font-inter font-semibold text-richblack-50 text-[16px]">Company</p>

                        <div className="font-inter text-richblack-400 text-[14px] flex flex-col gap-2 ">
                            <a href="/about"  className="hover:text-white transition-all duration-200">About</a>
                            <a href="/careers"  className="hover:text-white transition-all duration-200">Careers</a>
                            <a href="/affiliates"  className="hover:text-white transition-all duration-200">Affiliates</a>
                        </div>


                        <div className="text-richblack-200 flex gap-3">
                            <FaFacebook height={24} width={24}/>
                            <FaGoogle  height={24} width={24}/>
                            <FaTwitter  height={24} width={24}/>
                            <FaYoutube  height={24} width={24}/>
                        </div>



                    </div>

                    <div className="flex flex-col gap-9">

                        <div className="flex flex-col gap-3">
                            <p className="font-inter font-semibold text-richblack-50 text-[16px]">Resources</p>

                            <div className="flex flex-col gap-2 font-inter text-richblack-400 text-[14px]">
                                <a href="/articles"  className="hover:text-white transition-all duration-200">Articles</a>
                                <a href="/blogs"  className="hover:text-white transition-all duration-200">Blog</a>
                                <a href="/chart-sheet"  className="hover:text-white transition-all duration-200">Chart Sheet</a>
                                <a href="/code-challenge"  className="hover:text-white transition-all duration-200">Code Challenge</a>
                                <a href="/docs"  className="hover:text-white transition-all duration-200">Docs</a>
                                <a href="/projects"  className="hover:text-white transition-all duration-200">Projects</a>
                                <a href="/videos"  className="hover:text-white transition-all duration-200">Videos</a>
                                <a href="/workspaces"  className="hover:text-white transition-all duration-200">Workspaces</a>
                            </div>
                            
                        </div>

                        <div className="flex flex-col gap-3">
                            <p className="font-inter font-semibold text-richblack-50 text-[16px]">Support</p>
                            <a href="/help-center" className=" hover:text-white transition-all duration-200 font-inter text-richblack-400 text-[14px] ">Help Center</a>
                        </div>

                    </div>

                    <div className="flex flex-col gap-9">
                        <div className="flex flex-col gap-3">
                            <div className="font-inter font-semibold text-richblack-50 text-[16px]">
                                Plans
                            </div>
                            <div className="flex flex-col gap-2 font-inter text-richblack-400 text-[14px]">
                                <a href="\paid" className="hover:text-white transition-all duration-200">Paid Memberships</a>
                                <a href="\for-students"  className="hover:text-white transition-all duration-200">For students</a>
                                <a href="\business-solution"  className="hover:text-white transition-all duration-200">Business solutions</a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="font-inter font-semibold text-richblack-50 text-[16px]">
                                Community
                            </div>
                            <div className="flex flex-col gap-2 font-inter text-richblack-400  text-[14px]">
                                <a href="\forums" className="hover:text-white transition-all duration-200">Forums</a>
                                <a href="\chapters" className="hover:text-white transition-all duration-200">Chapters</a>
                                <a href="\events" className="hover:text-white transition-all duration-200">Events</a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex max-lg:flex-wrap gap-3 justify-between lg:w-[50%] pb-6">
                    
                    <div className="flex flex-col gap-3">
                        <div className="font-inter font-semibold text-richblack-50 text-[16px]">
                            {FooterLink2[0].title}
                        </div>

                        <div className="flex flex-col gap-2">

                        {
                            FooterLink2[0].links.map((link,index)=>(
                                <Foot key={index} link={link}/>
                            ))
                            
                        }
                        
                        </div>

                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="font-inter font-semibold text-richblack-50 text-[16px]">
                            {FooterLink2[1].title}
                        </div>

                        <div className="flex flex-col gap-2">

                        {
                            FooterLink2[1].links.map((link,index)=>(
                                <Foot key={index} link={link}/>
                            ))
                            
                        }
                        
                        </div>

                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="font-inter font-semibold text-richblack-50 text-[16px]">
                            {FooterLink2[2].title}
                        </div>

                        <div className="flex flex-col gap-2">

                        {
                            FooterLink2[2].links.map((link,index)=>(
                                <Foot key={index} link={link}/>
                            ))
                            
                        }
                        
                        </div>

                    </div>



                </div>

            </div>


            <div className="mt-12 flex max-lg:flex-col max-lg:items-center lg:justify-between">
                <div className="flex gap-3">
                    <a href="/privacy-policy" className="border-r-[2px] pr-2  border-richblack-700 font-inter text-richblack-400 text-[14px] hover:text-white transition-all duration-200">Privacy Policy</a>
                    <a href="/coookie-policy" className="border-r-[2px] pr-2  border-richblack-700 font-inter text-richblack-400 text-[14px] hover:text-white transition-all duration-200">Cookie Policy</a>
                    <a href="/terms" className="font-inter text-richblack-400 text-[14px] hover:text-white transition-all duration-200">Terms </a>
                </div>

                <div className="max-lg:mt-4 text-richblack-400">
                Made with ❤️ Rutak © 2025 LearnSphere
                </div>

            </div>

            </div>


        </div>
    )
}

export default Footer;


