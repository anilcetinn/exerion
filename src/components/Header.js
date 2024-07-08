export default function Header({ children }) {
  return (
    <>
      <div id="main-header-loading"></div>
      <header id="main-header">
        <div id="header-title" className=" text-white  px-6">
          <h1 className="text-3xl ">EXERION</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
