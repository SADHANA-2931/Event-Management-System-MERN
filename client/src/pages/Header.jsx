import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { RxExit } from "react-icons/rx";
import { BsFillCaretDownFill } from "react-icons/bs";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef();

  // Fetch events once on mount
  useEffect(() => {
    axios
      .get("/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setSearchQuery("");
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // Logout handler
  async function logout() {
    await axios.post("/logout");
    setUser(null);
  }

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <header className="flex py-2 px-6 sm:px-6 justify-between items-center relative">
        {/* Logo + DSATM Text */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="../src/assets/logo.png"
              alt="EventoEMS Logo"
              className="w-26 h-14"
            />
          </Link>
          
        </div>

        {/* Search Bar */}
        <div className="flex bg-white rounded py-2.5 px-4 w-1/6 gap-4 items-center shadow-md shadow-gray-200">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          <div ref={searchInputRef} className="flex-1">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="text-sm text-black outline-none w-full"
            />
          </div>
        </div>

        {/* Search Results Dropdown */}
        {searchQuery && (
          <div className="absolute z-10 mt-2 max-h-60 overflow-y-auto rounded bg-white shadow-md left-1/2 transform -translate-x-1/2 w-1/4">
            {events.filter((event) =>
              event.title.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 ? (
              <div className="text-sm text-gray-500 p-2">
                No events found.
              </div>
            ) : (
              events
                .filter((event) =>
                  event.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((event) => (
                  <Link key={event._id} to={`/event/${event._id}`}>
                    <div className="p-2 text-black text-lg hover:bg-gray-100 rounded">
                      {event.title}
                    </div>
                  </Link>
                ))
            )}
          </div>
        )}

        {/* Right-side Links */}
        <div className="flex items-center gap-4">
          <Link to="/createEvent">
            <div className="hidden md:flex flex-col items-center py-1 px-2 rounded text-primary cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm shadow-gray-200 transition-shadow duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="font-bold text-sm">Create Event</span>
            </div>
          </Link>

          <div className="hidden lg:flex gap-5 text-sm">
        <a
  href="https://dsatm.edu.in"
  target="_blank"
  rel="noopener noreferrer"
  className="flex flex-col items-center py-1 px-3 rounded cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm shadow-gray-200 transition-shadow duration-150"
>
  <img
    src="../src/assets/bulb.png"
    alt="Bulb Icon"
    className="w-5 h-5"
  />
  <span>About</span>
</a>


            <Link to="/verification">
              <div className="flex flex-col items-center py-1 px-3 rounded cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm shadow-gray-200 transition-shadow duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd"/>
                </svg>
                <span>Center</span>
              </div>
            </Link>

            <Link to="/calendar">
              <div className="flex flex-col items-center py-1 px-3 rounded cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm shadow-gray-200 transition-shadow duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd"/>
                  <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                </svg>
                <span>Calendar</span>
              </div>
            </Link>
          </div>

          {/* Notification Icon */}
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 py-1">
              <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd"/>
            </svg>
          </div>

          {/* User Info / Auth Buttons */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/useraccount" className="font-semibold">
                {user.name.toUpperCase()}
              </Link>
              <BsFillCaretDownFill
                className="h-5 w-5 cursor-pointer hover:rotate-180 transition-all"
                onClick={() => setisMenuOpen(!isMenuOpen)}
              />
              <button onClick={logout} className="hidden md:flex ml-4 secondary items-center gap-1">
                <RxExit className="w-5 h-5" />
                <span>Log out</span>
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="primary">Sign in</button>
            </Link>
          )}
        </div>

        {/* Mobile User Menu */}
        {user && isMenuOpen && (
          <nav className="absolute z-10 mt-64 right-2 md:right-[160px] w-48 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col font-semibold text-[16px]">
              <Link to="/createEvent" className="py-2 pt-3 px-6 hover:bg-background rounded-lg">
                Create Event
              </Link>
              <Link to="/wallet" className="py-2 px-6 hover:bg-background rounded-lg">
                Wallet
              </Link>
              <Link to="/verification" className="py-2 px-6 hover:bg-background rounded-lg">
                Center
              </Link>
              <Link to="/calendar" className="py-2 px-6 hover:bg-background rounded-lg">
                Calendar
              </Link>
              <button onClick={logout} className="py-2 pb-3 px-6 text-left hover:bg-background rounded-lg">
                Log out
              </button>
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}

