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
        <div className="min-h-[60vh] bg-[#F8F5F0] py-10 px-5 md:px-10">

          {/* TITLE */}
          <h1 className="text-4xl text-center font-bold text-[#1B4332]">
            Book Collections
          </h1>

          {/* SEARCH */}
          <div className="flex justify-center mt-6">
            <input
              type="text"
              placeholder="Search books by title..."
              className="w-[60%] md:w-[40%] p-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:border-[#1B4332]"
              onChange={(e) => setGlobalSearchKey(e.target.value)}
            />
          </div>

          <div className="md:grid grid-cols-5 gap-6 mt-10">

            {/* FILTER SIDE */}
            <div className="col-span-1">

              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#1B4332]">
                  Filters
                </h1>

                <button
                  className="text-2xl text-[#1B4332]"
                  onClick={() => setCollapse(!collapse)}
                >
                  <GiHamburgerMenu />
                </button>
              </div>

              {!collapse && (
                <div className="mt-6 bg-white p-4 rounded-2xl shadow border border-[#e8e3db]">

                  {allCategories.map((item) => (
                    <div key={item} className="my-3">
                      <input
                        type="radio"
                        name="filter"
                        onClick={() => filterBooks(item)}
                      />
                      <label className="ml-2 text-gray-700">
                        {item}
                      </label>
                    </div>
                  ))}

                  <div className="my-3">
                    <input
                      type="radio"
                      name="filter"
                      onClick={() => filterBooks("No-Filter")}
                    />
                    <label className="ml-2 text-gray-700">
                      All Books
                    </label>
                  </div>

                </div>
              )}
            </div>

            {/* BOOK LIST */}
            <div className="col-span-4 mt-5">

              <div className="flex flex-wrap justify-center gap-6">

                {bookList.filter((item) => item.status === "approved")
                  .length > 0 ? (
                  bookList
                    .filter((item) => item.status === "approved")
                    .map((item) => (
                      <div
                        key={item._id}
                        className="w-[260px] bg-white rounded-2xl shadow-lg border border-[#e8e3db] overflow-hidden hover:shadow-2xl transition"
                      >
                        <Link to={`/books/${item?._id}/view`}>
                          <img
                            src={item?.image}
                            alt="book"
                            className="h-[320px] w-full object-cover"
                          />
                        </Link>

                        <div className="p-3 text-center">

                          <h2 className="text-lg font-semibold text-[#1B4332]">
                            {item?.title}
                          </h2>

                          <h4 className="text-[#BC6C25] font-bold text-lg">
                            ₹{item?.price}
                          </h4>

                        </div>
                      </div>
                    ))
                ) : (
                  <h2 className="text-center text-red-500 text-xl">
                    No books available
                  </h2>
                )}

              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[60vh] bg-[#F8F5F0] flex flex-col justify-center items-center px-5">

          <img
            src="https://img.freepik.com/premium-vector/access-denied_1271422-13426.jpg"
            alt="access-denied"
            className="w-[280px] rounded-2xl shadow-lg"
          />

          <p className="text-lg mt-6 text-gray-700">
            Please{" "}
            <Link to="/login" className="text-[#1B4332] font-bold underline">
              login
            </Link>{" "}
            to view all books
          </p>

        </div>
      )}

      <Footer />
    </>
  );
}

export default AllBooks;