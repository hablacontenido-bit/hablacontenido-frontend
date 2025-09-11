// import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 flex items-center justify-center px-2 sm:px-4 py-2 bg-background text-black dark:text-white w-full">
      <img
        src="/avatar/logo-contenidos.png"
        alt="Logo Contenidos"
        className="w-44 sm:w-52 md:w-64 lg:w-64 h-auto"
      />
    </header>
  );
};
