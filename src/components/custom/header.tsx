// import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  return (
    <header className="flex items-center justify-center px-2 sm:px-4 py-2 bg-background text-black dark:text-white w-full">
      <img
        src="/avatar/logo-contenidos.png"
        alt="Logo Contenidos"
        className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto"
      />
    </header>
  );
};
