import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({modalData})=>{
    return(
        <div className="z-[100] fixed  inset-0 bg-black bg-opacity-10 backdrop-blur-md flex justify-center items-center">
            <div className="flex border bg-black bg-opacity-70 border-richblack-400 px-12 py-8 rounded-md  flex-col gap-4">

                <p className="text-white text-3xl font-bold">
                    {modalData.text1}
                </p>

                <p className="text-richblack-100">
                    {modalData.text2}
                </p>

                <div className="flex gap-x-4">
                    <IconBtn
                    onclick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                    />

                    <button onClick={modalData?.btn2Handler}
                    className="bg-richblack-100 font-semibold rounded-md px-4 py-2"
                    >
                        {modalData?.btn2Text}
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ConfirmationModal;
