import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full flex flex-col items-center justify-center bg-white">
        {children}
      </div>
      <div className="w-1/2 h-full relative">
        <Image
          src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg"
          fill
          alt="Doctors"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-blue-900/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <h1 className="text-4xl font-bold tracking-tight">Cabinetpro</h1>
          <p className="text-base mt-2 text-blue-100">
            Welcome to your medical platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;