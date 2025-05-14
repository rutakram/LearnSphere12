import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Stats from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";



const About = ()=>{
    return(
        <div>

            {/* Section - 1 */}

            <section className="bg-richblack-700 ">

                <div className="relative h-[515px] w-11/12 max-w-maxContent mx-auto text-white">
                    <header className="mx-auto text-center py-20 text-4xl font-semibold lg:w-[70%]">
                        Driving Innovation in Online Education for a
                        <HighlightText text={"Brighter Future"}/>
                        <p className="mx-auto font-inter mt-3 text-center text-base font-medium text-richblack-300 lg:w-[90%]">
                            LearnSphere is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </header>

                    <div className="flex absolute gap-x-10 translate-y-[-10%] mx-auto">
                        <img 
                        src={BannerImage1}
                        />
                        <img 
                        src={BannerImage2}
                        />
                        <img 
                        src={BannerImage3}
                        />
                    </div>


                </div>

            </section>


            {/* Section - 2 */}

            <section>
                <div className="border-b border-richblack-700">
                    
                    <Quote />

                </div>

            </section>

            {/* Section - 3 */}

            <section className="w-11/12 max-w-maxContent mx-auto">

                <div className="flex flex-col mt-24 mb-24">

                    {/* Founding story div */}

                    <div className="flex items-center justify-between">

                        {/* Founding story left box */}

                        <div className="flex flex-col gap-y-10 w-[50%]">

                            <h1
                            className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] "
                            >
                                Our Founding Story</h1>
                            
                            <p className="text-base  font-medium text-richblack-300 lg:w-[95%]">
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                            
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                       
                        </div>

                        {/* Founding story right box */}

                        <div>
                            <img
                             src={FoundingStory}
                             alt="Founding"
                             className="shadow-[0_0_20px_0] shadow-[#FC6767]"/>
                        </div>



                    </div>

                    {/* Vision and mission div */}

                    <div className="flex mt-[250px] gap-x-24 justify-between">

                        {/* Left box */}

                        <div className="flex flex-col gap-y-10 w-[40%]">
                            <h1
                            className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] "
                            >
                                Our Vision
                            </h1>
                            <p
                            className="text-base  font-medium text-richblack-300 lg:w-[95%]"
                            >
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                            </p>

                        </div>

                        {/* Right box */}

                        <div className="flex flex-col gap-y-10 w-[40%]">
                            <h1
                            className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] "
                            >
                                Our Mission</h1>
                            <p className="text-base  font-medium text-richblack-300 lg:w-[95%]">
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>




                    </div>


                </div>

            </section>


            {/* Section - 4 */}

            <Stats/>


            {/* Section - 5 */}

            <section className="mx-auto w-11/12 mt-16 flex flex-col items-center justify-between gap-5 mb-[140px]">

                <LearningGrid/>

                <ContactFormSection/>


            </section>


            <section>

                <div>
                    <h1 className="text-center text-4xl font-semibold mt-8 text-white">
                    Reviews From Other Learners
                    </h1>
                    {/* Review Slider */}
                    <ReviewSlider/>
                </div>
                
            </section>

            
            {/* Footer */}

            <Footer/>



        </div>
    )
}

export default About;
