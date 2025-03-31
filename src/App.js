import { useSelector } from "react-redux";

import Nav from "./components/Nav";
import Main from "./components/Main";

import useWindowWidth from "./hooks/useWindowWidth";

import MobileLayout from "./Layout/MobileLayout";
import DesktopLayout from "./Layout/DesktopLayout";

export default function App() {
  const width = useWindowWidth();
  const MOBILE_BREAKPOINT = 829;
  const isMobile = width < MOBILE_BREAKPOINT;

  const selectedMovie = useSelector((store) => store.watched.selectedMovie);
  const selected = selectedMovie.length > 0;

  return (
    <>
      <Nav />
      <Main>
        {isMobile ? (
          <MobileLayout selected={selected} />
        ) : (
          <DesktopLayout selectedMovie={selectedMovie} />
        )}
      </Main>
    </>
  );
}
