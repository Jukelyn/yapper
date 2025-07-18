import { SignInButton } from "@clerk/nextjs";

const CustomSignInButton = () => {
  return (
    <div
      className="font-barlow group relative inline-flex cursor-pointer justify-center overflow-hidden rounded-lg border-solid px-4 py-2 text-center text-base text-white uppercase outline-offset-4 transition-transform duration-300 ease-in-out focus:outline-2 focus:outline-offset-4 focus:outline-white"
      onClick={() => {
        const btn = document.querySelector("[data-sign-in-button]");
        if (btn) (btn as HTMLElement).click();
      }}
    >
      <SignInButton data-sign-in-button />
      <span className="absolute top-0 left-[-75%] z-10 h-full w-[50%] rotate-12 bg-white/20 blur-lg transition-all duration-1000 ease-in-out group-hover:left-[125%]"></span>

      <span className="drop-shadow-3xl absolute top-0 left-0 block h-[20%] w-1/2 rounded-tl-lg border-t-2 border-l-2 border-[#D4EDF9] transition-all duration-300"></span>
      <span className="drop-shadow-3xl absolute top-0 right-0 block h-[50%] w-1/2 rounded-tr-lg border-t-2 border-r-2 border-[#D4EDF9] transition-all duration-300 group-hover:h-[90%]"></span>
      <span className="drop-shadow-3xl absolute bottom-0 left-0 block h-[50%] w-1/2 rounded-bl-lg border-b-2 border-l-2 border-[#D4EDF9] transition-all duration-300 group-hover:h-[90%]"></span>
      <span className="drop-shadow-3xl absolute right-0 bottom-0 block h-[20%] w-1/2 rounded-br-lg border-r-2 border-b-2 border-[#D4EDF9] transition-all duration-300"></span>
    </div>
  );
};

export default CustomSignInButton;
