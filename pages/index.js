import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, searchRecipes } from "../redux/slice/homeSlice";
import Navbar from "../components/base/Navbar";
import Image from "next/image";
import foodLandingPage from "../assets/images/images/foodlp.png";
import search from "../assets/images/icons/search.png";
import Card from "../components/base/Card";
import Footer from "../components/base/Footer";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from 'react-responsive';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  const { recipes, searchResults, searchMessage, currentPage, totalPages } = useSelector((state) => state.home);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchQuery]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        dispatch(searchRecipes({ query: searchQuery, page: 1 }));
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, dispatch]);

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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-y-[25px] mt-[25px] mx-[5%]">
                {searchResults.map((recipe, index) => (
                  <Link href={`/recipes/${recipe.id}`} key={index}>
                    <Card
                      width={isMobile ? 150 : 240}
                      height={isMobile ? 150 : 240}
                      image={recipe?.image}
                      recipe_name={recipe.title}
                    />
                  </Link>
                ))}
              </div>
              {/* <PaginationButton
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => dispatch(searchRecipes({ query: searchQuery, page }))}
              /> */}
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col px-[5%] md:flex-row">
            <div className="w-full md:w-[50%] pt-[50px] md:pt-[150px]">
              <p className="font-bold text-[30px] md:text-[60px] text-mr_color">
                Discover Recipe & Delicious Food
              </p>
              <form onSubmit={(e) => dispatch(searchRecipes({ query: searchQuery, page: 1 }))}>
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
            <div className="hidden md:block md:w-[50%]">
              <Image src={foodLandingPage} alt="" priority />
            </div>
          </div>

          <div className="border-l-8 border-yellow-400 text-[24px] md:text-[48px] ml-[5%] mt-16">
            New Recipe
          </div>
          <div className="flex flex-col mr-[7%] md:flex-row items-center mt-[15px] ml-[7%] h-auto md:h-[600px]">
            <Image
              src={recipes[0]?.image}
              alt={recipes[0]?.name}
              width={400}
              height={300}
              className="h-auto w-full md:h-[600px] md:w-[600px] rounded-3xl border border-black object-cover"
            />
            <div className="text-left mt-4 md:mt-0 md:mr-[5%] md:pl-[15%]">
              <p className="text-[24px] md:text-[48px] font-bold border-b-2 border-black">
                {recipes[0]?.title || "No Recipe Title"}
              </p>
              <p className="mt-6 text-[16px] md:text-[24px]">
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

          <div className="border-l-8 border-yellow-400 text-[24px] md:text-[48px] ml-[5%] mt-16">
            Popular Recipe
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-y-[25px] mt-[25px] mx-[5%]">
            {recipes.slice(0,6).map((recipe, index) => (
              <Link href={`/recipes/${recipe.id}`} key={index}>
                <Card
                  width={isMobile ? 150 : 400}
                  height={isMobile ? 150 : 400}
                  image={recipe?.image}
                  recipe_name={recipe.title}
                />
              </Link>
            ))}
          </div>
          <Link href={`/recipes`}>
          <div className="flex justify-center w-full mt-6">
              <button className="px-6 py-3 bg-yellow-400 text-white rounded-md">
                Learn more
              </button>
            </div>
          </Link>
        </>
      )}
      <Footer />
    </div>
  );
}
