import React, { useState, useEffect, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { searchContext } from "../../contextApi/ContextApi";
import { allBooksApi } from "../../services/allApis";

function AllBooks() {
  const [collapse, setCollapse] = useState(false);
  const [token, setToken] = useState("");
  const [bookList, setBookList] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [tempBooks, setTempBooks] = useState([]);

  const { globalSearchKey, setGlobalSearchKey } =
    useContext(searchContext);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getAllBooks();
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, [globalSearchKey]);

  const getAllBooks = async () => {
    const response = await allBooksApi(globalSearchKey);

    if (response.status === 200) {
      const allBooks = response.data;

      setBookList(allBooks);
      setTempBooks(allBooks);

      const tempArray = [];
      allBooks.forEach((item) => {
        if (!tempArray.includes(item.category)) {
          tempArray.push(item.category);
        }
      });

      setAllCategories([...tempArray]);
    }
  };

  const filterBooks = (category) => {
    if (category === "No-Filter") {
      setBookList(tempBooks);
    } else {
      const filter = tempBooks.filter((item) =>
        item.category.toLowerCase().includes(category.toLowerCase())
      );
      setBookList(filter);
    }
  };

  return (
    <>
      <Header />

      {token ? (
        <div className="min-h-[75vh] bg-[#FAF7F2] py-16 px-6 md:px-12 transition-all duration-300">

          {/* TITLE */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-serif-display font-bold text-[#0D2818]">
              The Literary Vault
            </h1>
            <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mt-4"></div>
          </div>

          {/* SEARCH */}
          <div className="flex justify-center mb-12">
            <input
              type="text"
              placeholder="Search volumes by title..."
              className="w-full max-w-lg p-4 pl-6 rounded-full border border-[#E3DAC9] bg-white text-[#0D2818] placeholder-[#0D2818]/45 shadow-sm focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition duration-300 text-sm font-light"
              onChange={(e) => setGlobalSearchKey(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 max-w-7xl mx-auto">

            {/* FILTER SIDE */}
            <div className="col-span-1 md:sticky md:top-24 h-fit">

              <div className="flex items-center justify-between pb-4 border-b border-[#E3DAC9]/60">
                <h2 className="text-xl font-serif-display font-bold text-[#0D2818]">
                  Curations
                </h2>

                <button
                  className="text-xl text-[#C5A880] hover:text-[#0D2818] transition duration-300 md:hidden"
                  onClick={() => setCollapse(!collapse)}
                >
                  <GiHamburgerMenu />
                </button>
              </div>

              {!collapse && (
                <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm border border-[#E3DAC9]/50 space-y-4">

                  {allCategories.map((item) => (
                    <div key={item} className="flex items-center">
                      <input
                        type="radio"
                        id={`filter-${item}`}
                        name="filter"
                        className="accent-[#C5A880] w-4 h-4 cursor-pointer"
                        onClick={() => filterBooks(item)}
                      />
                      <label htmlFor={`filter-${item}`} className="ml-3 text-sm text-[#0D2818]/85 font-light hover:text-[#C5A880] cursor-pointer transition duration-200 capitalize">
                        {item}
                      </label>
                    </div>
                  ))}

                  <div className="flex items-center pt-2 border-t border-[#FAF7F2]">
                    <input
                      type="radio"
                      id="filter-all"
                      name="filter"
                      className="accent-[#C5A880] w-4 h-4 cursor-pointer"
                      onClick={() => filterBooks("No-Filter")}
                      defaultChecked
                    />
                    <label htmlFor="filter-all" className="ml-3 text-sm text-[#0D2818] hover:text-[#C5A880] cursor-pointer transition duration-200 font-medium">
                      All Volumes
                    </label>
                  </div>

                </div>
              )}
            </div>

            {/* BOOK LIST */}
            <div className="col-span-1 md:col-span-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

                {bookList.filter((item) => item.status === "approved")
                  .length > 0 ? (
                  bookList
                    .filter((item) => item.status === "approved")
                    .map((item) => (
                      <div
                        key={item._id}
                        className="group w-full max-w-[270px] bg-white rounded-2xl shadow-sm border border-[#E3DAC9]/45 overflow-hidden hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 transition-all duration-500"
                      >
                        <Link to={`/books/${item?._id}/view`} className="relative block aspect-[3/4] overflow-hidden bg-[#FAF7F2]">
                          <img
                            src={item?.image}
                            alt="book"
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                          />
                          {/* Book spine overlay */}
                          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/20 to-transparent"></div>
                        </Link>

                        <div className="p-5 text-center">

                          <h2 className="text-base font-serif-display font-semibold text-[#0D2818] line-clamp-1 group-hover:text-[#C5A880] transition-colors duration-300">
                            {item?.title}
                          </h2>

                          <h4 className="text-[#C5A880] font-serif-display font-bold text-base mt-2">
                            ₹{item?.price}
                          </h4>

                        </div>
                      </div>
                    ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <h2 className="text-[#0D2818]/60 text-lg font-light">
                      No volumes found matching the search.
                    </h2>
                  </div>
                )}

              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[75vh] bg-[#FAF7F2] flex flex-col justify-center items-center px-6 py-20 transition-all duration-300">

          <div className="relative max-w-sm bg-white p-8 rounded-3xl shadow-sm border border-[#E3DAC9]/60 text-center">
            
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#0D2818]/5 rounded-full text-[#C5A880] border border-[#C5A880]/15">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-serif-display font-bold text-[#0D2818] mb-4">
              Restricted Vault
            </h2>

            <p className="text-sm text-[#0D2818]/70 leading-6 font-light mb-8">
              Access to our complete literary catalogue is reserved for registered members. Please sign in to read details and purchase volumes.
            </p>

            <Link to="/login" className="inline-block w-full">
              <button className="w-full bg-[#0D2818] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0D2818] transition-all duration-300 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-[2px] border border-[#C5A880]/20 hover:border-transparent">
                Sign In
              </button>
            </Link>
          </div>

        </div>
      )}

      <Footer />
    </>
  );
}

export default AllBooks;