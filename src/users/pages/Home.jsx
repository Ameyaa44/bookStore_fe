import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";

import Header from "../components/Header";
import Footer from "../../components/Footer";

import { latestBookApi } from "../../services/allApis";
import { searchContext } from "../../contextApi/ContextApi";

function Home() {
  const [latestBooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { setGlobalSearchKey } = useContext(searchContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestBooks();
  }, []);

  const fetchLatestBooks = async () => {
    try {
      setLoading(true);

      const result = await latestBookApi();

      if (result.status === 200) {
        setLatestBooks(result.data);
      } else {
        setError("Please login to load books.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const gotoBooks = () => {
    navigate("/books");
  };

  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section
        className="relative h-[90vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80')",

        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 h-full flex items-center justify-center px-5">
          <div className="max-w-4xl text-center text-white">
            <p className="uppercase tracking-[6px] text-orange-200 text-sm mb-4">
              Premium Book Collection
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Discover Stories
              <br />
              That Stay With You
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Explore bestselling novels, timeless classics, inspiring
              biographies, and books that transform perspectives.
            </p>

            <div className="mt-10 bg-white rounded-full p-2 flex items-center max-w-2xl mx-auto shadow-2xl">
              <input
                type="text"
                placeholder="Search books, authors, genres..."
                className="flex-1 px-5 py-3 text-black outline-none bg-transparent"
                onChange={(e) => setGlobalSearchKey(e.target.value)}
              />

              <button
                onClick={gotoBooks}
                className="bg-[#1B4332] hover:bg-[#143126] transition text-white p-4 rounded-full"
              >
                <FaMagnifyingGlass />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="bg-[#F8F5F0] py-20 px-5 md:px-16 lg:px-24">
        <div className="text-center">
          <p className="uppercase tracking-[4px] text-[#BC6C25] text-sm">
            Latest Collection
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#1B4332] mt-3">
            New Arrivals
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Carefully curated books that inspire, educate and entertain.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <p className="text-lg text-gray-500">Loading books...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[300px]">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
            {latestBooks?.length > 0 ? (
              latestBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="overflow-hidden">
                    <img
                      src={book.image || "/book1.jpg"}
                      alt={book.title}
                      className="w-full h-[350px] object-cover hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#1B4332] line-clamp-1">
                      {book.title}
                    </h3>

                    <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                      {book.description}
                    </p>

                    <div className="flex justify-between items-center mt-5">
                      <span className="text-2xl font-bold text-[#BC6C25]">
                        ₹{book.price}
                      </span>

                      <button className="bg-[#1B4332] text-white px-4 py-2 rounded-lg hover:bg-[#143126] transition">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No books available.
              </p>
            )}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link to="/books">
            <button className="px-8 py-3 rounded-full bg-[#1B4332] text-white hover:bg-[#143126] transition shadow-lg">
              Explore Collection
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURED AUTHOR */}
      <section className="bg-[#1B4332] text-white py-20 px-5 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[4px] text-orange-300 text-sm">
              Featured Author
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Captivates With Every Word
            </h2>

            <p className="mt-6 text-gray-300 leading-8 text-justify">
              A featured author is a literary voice that resonates deeply with
              readers, captivating hearts and minds through powerful
              storytelling. Their work blends imagination, emotion, and insight
              into unforgettable experiences that remain long after the final
              page.
            </p>

            <p className="mt-4 text-gray-300 leading-8 text-justify">
              Through compelling characters and thought-provoking themes, their
              stories inspire reflection while providing entertainment. Every
              sentence is crafted with care, inviting readers into meaningful
              worlds.
            </p>

            <button className="mt-8 bg-[#BC6C25] hover:bg-[#a85d1f] transition px-8 py-3 rounded-full font-medium">
              Read Biography
            </button>
          </div>

          <div>
            <img
              src="https://media.istockphoto.com/id/1413766112/photo/successful-mature-businessman-looking-at-camera-with-confidence.jpg?s=612x612&w=0&k=20&c=NJSugBzNuZqb7DJ8ZgLfYKb3qPr2EJMvKZ21Sj5Sfq4="
              alt="author"
              className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-white py-20 px-5 md:px-16 lg:px-24">
        <div className="text-center">
          <p className="uppercase tracking-[4px] text-[#BC6C25] text-sm">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#1B4332] mt-3">
            What Readers Say
          </h2>
        </div>

        <div className="max-w-4xl mx-auto mt-14">
          <div className="bg-[#F8F5F0] rounded-3xl p-10 shadow-lg text-center">
            <img
              src="https://st4.depositphotos.com/1017228/20282/i/450/depositphotos_202829902-stock-photo-close-portrait-smiling-young-man.jpg"
              alt="testimonial"
              className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
            />

            <h3 className="text-2xl font-semibold text-[#1B4332] mt-5">
              John Luther
            </h3>

            <p className="text-gray-600 mt-6 leading-8">
              This bookstore offers an excellent collection of books across
              various genres, making it easy for readers to find exactly what
              they’re looking for. With a user-friendly experience, affordable
              prices, and quality service, it has become a trusted destination
              for students, professionals, and book lovers alike.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F8F5F0] py-20 text-center px-5">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1B4332]">
          A Book Is A Dream You Hold In Your Hand
        </h2>

        <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
          Start exploring thousands of stories, ideas and adventures from
          authors around the world.
        </p>

        <Link to="/books">
          <button className="mt-8 px-10 py-4 rounded-full bg-[#1B4332] text-white hover:bg-[#143126] transition shadow-lg">
            Browse Books
          </button>
        </Link>
      </section>

      <Footer />
    </>
  );
}

export default Home;