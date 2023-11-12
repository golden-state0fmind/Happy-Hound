"use client"
import Link from "next/link";
import WelcomeUser from "../components/welcomeUser";
import ReduxProvider from "../components/WithReduxProvider";

export default async function Home() {

    return (
        <ReduxProvider>
            <div className="flex bg-white">
                <div className="w-screen flex flex-col space-y-5 justify-center items-center mt-3 md:mt-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full p-3 md:w-4/5 md:p-0 md:h-2/4">
                        {/* START COLUMN 1 */}
                        <div className="md:col-span-1 lg:col-span-1">
                            {/* START CARD 1 */}
                            <WelcomeUser />
                            {/* END CARD 1 */}

                            {/* START CARD 3 */}
                            <div className="bg-gray-100 rounded-lg shadow-md px-4 py-8">
                                {/* Placeholder content */}
                                <div className="flex justify-between mb-10">
                                    <h2 className='text-base md:text-lg lg:text-xl font-semibold text-blue-800' >Wallet</h2>
                                    <span className='text-base md:text-lg lg:text-xl font-semibold text-blue-800'>$ <span className='text-green-700' >0.00</span> </span>
                                </div>
                                <button className="bg-blue-300 hover:bg-blue-800 text-black hover:text-white rounded-md py-2 px-4 mt-2">
                                    Add or Modify Payment Method
                                </button>
                            </div>
                            {/* END CARD 3 */}
                        </div>
                        {/* END COLUMN 1 */}

                        {/* START COLUMN 2 */}
                        <div className="md:col-start-2 md:col-end-3 lg:col-start-2 lg:col-end-3 h-full w-100">
                            {/* START CARD 4 */}
                            <div className="bg-gray-100 rounded-lg shadow-md px-4 py-8 h-full w-full">
                                {/* Placeholder content */}
                                <h2 className='text-base md:text-lg lg:text-xl font-semibold text-blue-800' >Your Pets</h2>
                                <p className='text-base md:text-lg lg:text-xl font-semibold text-blue-800' >Add your pets or edit their info</p>
                                <div className="mt-5 border-dotted border-2 border-gray-400 p-4 md:p-8 lg:p-12 h-80 flex flex-col justify-center items-center">
                                    <Link href='/addpet'>
                                        <button className="bg-blue-300 hover:bg-blue-800 text-black hover:text-white rounded-md py-2 px-4 mt-2">
                                            +
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            {/* END CARD 4 */}
                        </div>
                        {/* END COLUMN 2 */}
                    </div>
                </div>
            </div>
        </ReduxProvider>
    );
}