import Navbar from "../components/base/Navbar";
import Image from "next/image";
import foodLandingPage from "../assets/images/images/foodlp.png";
import search from "../assets/images/icons/search.png";
import { useEffect, useState, useRef } from "react";
import Card from "../components/base/Card";
import Footer from "../components/base/Footer";
import Link from "next/link";
import api from "../api/api.jsx";
import noImage from "../assets/images/images/noimage.jpg";
import PaginationButton from "../components/base/PaginationButton.jsx";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchInputRef = useRef(null);

  const handleSearch = async (query, page = 1) => {
    try {
      const response = await api.get(
        `/recipes?page=${page}&limit=10&search=${query}`
      );
      const data = response.data.data;
      setSearchResults(data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);

      if (data.length === 0) {
        setSearchMessage("Resep yang Anda cari tidak ditemukan.");
      } else {
        setSearchMessage("");
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  useEffect(() => {
    const getRecipesData = async () => {
      try {
        const response = await api.get("/recipes");
        const data = response.data.data.slice(0, 6);
        console.log("Recipe data: ", data);
        setRecipes(data);
      } catch (err) {
        console.error("Failed to get recipe data: ", err);
      }
    };

    getRecipesData();
  }, []);

  useEffect(() => {
    if (searchQuery && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchQuery]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery, 1);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div className="w-[100%] mx-auto bg-bg_krem font-montserrat">
      <Navbar />
      {searchQuery ? (
        <>
          <div className="flex px-[5%] mt-4">
            <form onSubmit={(e) => e.preventDefault()} className="w-full">
              <div className="flex items-center bg-white rounded-lg">
                <button type="submit">
                  <Image src={search} alt="" className="h-6 w-6 mx-4" />
                </button>
                <input
                  type="text"
                  placeholder="Search Recipe"
                  className="px-6 py-3 rounded-lg flex-grow"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  ref={searchInputRef}
                />
              </div>
            </form>
          </div>

          {searchMessage ? (
            <div className="ml-[5%] mt-4"> {searchMessage} </div>
          ) : (
            <>
              <p className="ml-[5%] mt-4 font-montserrat text-2xl">
                Hasil pencarian: {searchQuery}
              </p>
              <div className="grid grid-cols-5 place-items-center gap-y-[25px] mt-[25px] mx-[5%]">
                {searchResults.map((recipe, index) => (
                  <Link href={`/recipes/${recipe.id}`} key={index}>
                    <Card
                      width={240}
                      height={240}
                      image={recipe?.image}
                      recipe_name={recipe.title}
                    />
                  </Link>
                ))}
              </div>
              <PaginationButton
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => handleSearch(searchQuery, page)}
              />
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex px-[5%]">
            <div className="w-[50%] pt-[150px]">
              <p className="font-bold text-[60px] text-mr_color">
                Discover Recipe & Delicious Food
              </p>
              <form onSubmit={(e) => handleSearch(searchQuery, 1)}>
                <div className="flex items-center bg-white rounded-lg">
                  <button type="submit">
                    <Image src={search} alt="" className="h-6 w-6 mx-4" />
                  </button>
                  <input
                    type="text"
                    placeholder="Search Recipe"
                    className="px-6 py-3 rounded-lg flex-grow"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    ref={searchInputRef}
                  />
                </div>
              </form>
            </div>
            <div className="w-[50%]">
              <Image src={foodLandingPage} alt="" priority />
            </div>
          </div>

          <div className="border-l-8 border-yellow-400 text-[48px] ml-[5%] mt-16">
            New Recipe
          </div>
          <div className="flex items-center mt-[15px] ml-[7%] h-[600px]">
            <Image
              src={recipes[0]?.image}
              alt={recipes[0]?.name}
              width={800}
              height={600}
              className="h-[600px] w-[600px] rounded-3xl border border-black object-cover"
            />
            <div className="text-left mr-[5%] pl-[15%]">
              <p className="text-[48px] font-bold border-b-2 border-black">
                {recipes[0]?.title || "No Recipe Title"}
              </p>
              <p className="mt-6 text-[24px]">
                {recipes[0]?.description?.length > 100
                  ? `${recipes[0]?.description.substring(0, 100)}...`
                  : recipes[0]?.description || "No Recipe Description"}
              </p>
              <Link href={`/recipes/${recipes[0]?.id}`}>
                <button className="px-6 py-3 bg-yellow-400 text-white rounded-md mt-6">
                  Learn more
                </button>
              </Link>
            </div>
          </div>

          <div className="border-l-8 border-yellow-400 text-[48px] ml-[5%] mt-16">
            Popular Recipe
          </div>
          <div className="grid grid-cols-3 place-items-center gap-y-[25px] mt-[15px] mx-[5%]">
            {recipes.map((recipe, index) => (
              <Link href={`/recipes/${recipe.id}`} key={index}>
                <Card
                  width={400}
                  height={400}
                  image={recipe?.image}
                  recipe_name={recipe.title}
                />
              </Link>
            ))}
          </div>
          <Link href={`/recipes`}>
            <button className="px-6 py-3 bg-yellow-400 text-white rounded-md mt-6 ml-[45%]">
              Learn more
            </button>
          </Link>
        </>
      )}
      <Footer />
    </div>
  );
}
