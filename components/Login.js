import React from "react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

function Login({ providers }) {
  return (
    <div className=" flex min-h-screen flex-col items-center justify-center space-y-20">
      <Image
        src="/logo.svg"
        alt=""
        width={150}
        height={150}
        objectFit="contain"
      />
      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-3 font-medium transition-all hover:bg-white"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-primary transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left font-semibold text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                Sign in with {provider.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;
