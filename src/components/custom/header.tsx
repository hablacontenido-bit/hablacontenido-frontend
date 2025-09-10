import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-2 sm:px-4 py-2 bg-background text-black dark:text-white w-full">
      {/* Left: Theme Toggle */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        <ThemeToggle />
      </div>

      {/* Center: Logo */}
      <div className="flex justify-center flex-1">
        <img
          src="/avatar/logo-contenidos.png"
          alt="Logo Contenidos"
          className="w-24 sm:w-36 md:w-44 lg:w-52 h-auto"
        />
      </div>

      {/* Right: Empty space for balance */}
      <div className="w-8 sm:w-10" />
    </header>
  );
};
