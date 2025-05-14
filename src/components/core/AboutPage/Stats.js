import React from "react";

const stats =[
    {count: "5K",label:"Active Students"},
    {count: "10+",label:"Mentors"},
    {count: "200+",label:"Courses"},
    {count: "50+",label:"Awards"},
    
]

const Stats = ()=>{
    return(
        <section className="bg-richblack-700">
            <div>
                <div className="flex justify-between  w-11/12 max-w-maxContent mx-auto">
                    {
                        stats.map((data,index)=>(
                            <div 
                            key={index}
                            className="py-10 flex flex-col text-center w-full"
                            >

                                <h1
                                className="text-[30px] font-bold text-richblack-5"
                                >
                                    {data.count}
                                </h1>

                                <h2
                                className="font-semibold text-[16px] text-richblack-500">
                                    {data.label}
                                </h2>

                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Stats;
