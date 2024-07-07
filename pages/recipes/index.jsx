import React, { useEffect, useState } from "react";
import Navbar from "../../components/base/Navbar";
import Footer from "../../components/base/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/slice/homeSlice";
import Link from "next/link";
import Card from "../../components/base/Card";
import { useMediaQuery } from "react-responsive";
import Pagination from "../../components/base/PaginationButton";

const Recipes = () => {
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.home);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchRecipes({ page }));
  }, [dispatch, page]);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-y-[25px] mt-[25px] mx-[5%]">
        {recipes.map((recipe, index) => (
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

      <Pagination 
        currentPage={page} 
        onPageChange={handlePageChange} 
        basic={true} // Atur sesuai kebutuhan
      />

      <Footer />
    </div>
  );
};

export default Recipes;
