"use client"
import ReduxProvider from "./components/WithReduxProvider";
import ServicesList from "./components/service-list";

export default function Home() {
  const backgroundImageStyle = {
    backgroundImage: `url('https://res.cloudinary.com/antonio2020/image/upload/q_auto/f_auto/v1698716202/happy_dog.jpg')`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center center',
  };
  return (
    <ReduxProvider>
      <div className="flex h-screen bg-gray-100 text-blue-800">
        <div style={backgroundImageStyle} className="w-screen h-screen flex flex-row">
          <div className="w-full md:w-1/2 min-w-[20rem] p-6 flex flex-col items-center justify-center">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h1 className="text-base md:text-3xl lg:text-4xl font-semibold">Embrace pet care right in your local community. Reserve reliable pet sitters and dog walkers.</h1>
              <ServicesList />
            </div>
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
    </ReduxProvider>
  );
}
