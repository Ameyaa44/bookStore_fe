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
        className="relative h-[90vh] bg-cover bg-center select-none"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* Soft luxury dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-[#0A1C12]/90"></div>

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="max-w-4xl text-center text-white">
            <p className="uppercase tracking-[6px] text-[#C5A880] text-xs font-semibold mb-6">
              Curated Literary Collections
            </p>

            <h1 className="text-4xl md:text-7xl font-serif-display font-bold leading-[1.15] text-white">
              Discover Stories
              <br />
              <span className="italic text-[#C5A880] font-normal font-serif-sub">That Resonate Within</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-[#EAE0D5]/80 max-w-2xl mx-auto font-light leading-8">
              Explore our exquisite treasury of rare editions, award-winning masterpieces, and biographies crafted for the discerning mind.
            </p>

            <div className="mt-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1.5 flex items-center max-w-2xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.3)] focus-within:border-[#C5A880]/60 transition-all duration-300">
              <input
                type="text"
                placeholder="Search premium volumes, authors, genres..."
                className="flex-grow px-6 py-3.5 text-white placeholder-[#EAE0D5]/50 outline-none bg-transparent text-sm font-light"
                onChange={(e) => setGlobalSearchKey(e.target.value)}
              />

              <button
                onClick={gotoBooks}
                className="bg-[#C5A880] hover:bg-[#FAF7F2] text-[#0D2818] hover:shadow-[0_0_15px_rgba(197,168,128,0.4)] transition-all duration-300 p-3.5 rounded-full"
              >
                <FaMagnifyingGlass size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="bg-[#FAF7F2] py-24 px-6 md:px-16 lg:px-24 border-b border-[#E3DAC9]/40">
        <div className="text-center">
          <p className="uppercase tracking-[4px] text-[#C5A880] text-xs font-semibold">
            The Autumn Release
          </p>

          <h2 className="text-3xl md:text-5xl font-serif-display font-bold text-[#0D2818] mt-4">
            New Arrivals
          </h2>

          <div className="w-16 h-[1.5px] bg-[#C5A880] mx-auto mt-6"></div>

          <p className="text-[#0D2818]/70 mt-6 text-sm max-w-2xl mx-auto font-light leading-7">
            Carefully curated books selected for their intellectual brilliance, narrative elegance, and beautiful aesthetics.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <p className="text-sm font-medium text-[#0D2818]/60 uppercase tracking-[2px] animate-pulse">Loading collection...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[300px]">
            <p className="text-red-600 font-light text-sm">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16 max-w-7xl mx-auto">
            {latestBooks?.length > 0 ? (
              latestBooks.map((book) => (
                <div
                  key={book._id}
                  className="group bg-white border border-[#E3DAC9]/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="relative overflow-hidden aspect-[3/4] bg-[#FAF7F2]">
                    <img
                      src={book.image || "/book1.jpg"}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    />
                    {/* Shadow effect to resemble real book spine */}
                    <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-serif-display font-semibold text-[#0D2818] line-clamp-1 group-hover:text-[#C5A880] transition-colors duration-300">
                      {book.title}
                    </h3>

                    <p className="text-xs text-[#0D2818]/60 mt-3 line-clamp-2 leading-relaxed font-light">
                      {book.description}
                    </p>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#FAF7F2]">
                      <span className="text-xl font-serif-display font-bold text-[#C5A880]">
                        ₹{book.price}
                      </span>

                      <Link to={`/books/${book?._id}/view`} >
                        <button className="bg-[#0D2818] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0D2818] text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-300 border border-[#C5A880]/30 hover:border-transparent">
                          View
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-sm font-light text-[#0D2818]/50 py-10">
                No books available in this release.
              </p>
            )}
          </div>
        )}

        <div className="flex justify-center mt-16">
          <Link to="/books">
            <button className="px-10 py-4 rounded-full bg-[#0D2818] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0D2818] transition-all duration-300 shadow-md font-semibold text-sm uppercase tracking-[2px] border border-[#C5A880]/20 hover:border-transparent">
              Explore Vault
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURED AUTHOR */}
      <section className="bg-[#0D2818] text-white py-24 px-6 md:px-16 lg:px-24 border-b border-[#C5A880]/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="uppercase tracking-[4px] text-[#C5A880] text-xs font-semibold">
              Featured Author
            </p>

            <h2 className="text-3xl md:text-5xl font-serif-display font-bold mt-4 leading-tight">
              Captivating With
              <br />
              <span className="italic font-serif-sub text-[#C5A880] font-normal">Every Inkstroke</span>
            </h2>

            <div className="w-12 h-[1px] bg-[#C5A880] my-6"></div>

            <p className="text-sm text-[#EAE0D5]/80 leading-8 text-justify font-light">
              A featured author is a literary voice that resonates deeply with readers, captivating hearts and minds through powerful storytelling. Their work blends imagination, emotion, and insight into unforgettable experiences that remain long after the final page.
            </p>

            <p className="mt-4 text-sm text-[#EAE0D5]/80 leading-8 text-justify font-light">
              Through compelling characters and thought-provoking themes, their stories inspire reflection while providing entertainment. Every sentence is crafted with care, inviting readers into meaningful worlds.
            </p>

            <button className="mt-8 bg-[#C5A880] text-[#0D2818] hover:bg-[#FAF7F2] transition-all duration-300 px-8 py-3.5 rounded-full font-semibold text-xs uppercase tracking-[2px] shadow-lg">
              Read Biography
            </button>
          </div>

          <div className="relative">
            {/* Elegant double border frame for premium picture */}
            <div className="absolute -inset-3 border border-[#C5A880]/40 rounded-3xl -z-10 translate-x-2 translate-y-2"></div>
            <img
              src="https://media.istockphoto.com/id/1413766112/photo/successful-mature-businessman-looking-at-camera-with-confidence.jpg?s=612x612&w=0&k=20&c=NJSugBzNuZqb7DJ8ZgLfYKb3qPr2EJMvKZ21Sj5Sfq4="
              alt="author"
              className="w-full h-[450px] object-cover rounded-2xl shadow-2xl border border-[#C5A880]/20"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-[#FAF7F2] py-24 px-6 md:px-16 lg:px-24">
        <div className="text-center">
          <p className="uppercase tracking-[4px] text-[#C5A880] text-xs font-semibold">
            Client Testimonials
          </p>

          <h2 className="text-3xl md:text-5xl font-serif-display font-bold text-[#0D2818] mt-4">
            Reader Reflections
          </h2>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white border border-[#E3DAC9]/60 rounded-3xl p-10 md:p-14 shadow-sm text-center relative">
            <span className="text-6xl text-[#C5A880]/20 font-serif-display absolute top-6 left-10">“</span>
            
            <img
              src="https://st4.depositphotos.com/1017228/20282/i/450/depositphotos_202829902-stock-photo-close-portrait-smiling-young-man.jpg"
              alt="testimonial"
              className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-[#C5A880] p-1 shadow-md"
            />

            <h3 className="text-xl font-serif-display font-semibold text-[#0D2818] mt-6">
              John Luther
            </h3>
            
            <p className="text-[#C5A880] text-xs uppercase tracking-[2px] font-semibold mt-1">Connoisseur Member</p>

            <p className="text-sm text-[#0D2818]/70 mt-8 leading-8 italic font-serif-sub max-w-2xl mx-auto">
              "This bookstore offers an excellent collection of books across various genres, making it easy for readers to find exactly what they’re looking for. With a user-friendly experience, affordable prices, and quality service, it has become a trusted destination for students, professionals, and book lovers alike."
            </p>
            
            <span className="text-6xl text-[#C5A880]/20 font-serif-display absolute bottom-6 right-10">”</span>
          </div>
        </div>
      </section>

      

      <Footer />
    </>
  );
}

export default Home;