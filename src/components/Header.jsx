import React from 'react';

const Header = () => {
    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // Do something with the camera stream, e.g., display it in a video element
            const videoElement = document.createElement('video');
            videoElement.srcObject = stream;
            videoElement.autoplay = true;
            document.body.appendChild(videoElement);
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }
    return (
        <div className="navbar px-5 flex bg-primary text-slate-200 rounded-md sticky top-0 z-10 shadow-lg text-lg font-bold justify-between items-center">
            <a className="text-xl">Note daily Kharcha</a>
            <button className='btn btn-primary text-slate-200 ' onClick={() => { document.getElementById('my_modal_5').showModal() }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Kaam chal raha tab tk monkey ko dekh le!</h3>
                    <div className='flex flex-col items-center gap-4 my-4'>
                        <button className='btn btn-primary' onClick={openCamera}>Yha dawaa</button>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default Header;
