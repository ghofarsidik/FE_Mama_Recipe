import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Card from '../base/Card'

const SavedRecipe = ({ savedRecipes, handleDelete }) => {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      const screenWidth = window.innerWidth;
      const columns = Math.floor((screenWidth * 0.85) / 300);
      console.log(columns);
      setColumns(columns);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);

    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Map column numbers to Tailwind CSS grid classes
  const getGridClass = (columns) => {
    switch (columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-3';
      case 4:
        return 'grid-cols-4';
      default:
        return 'grid-cols-1';
    }
  };

  return (
    <div className={`grid ${getGridClass(columns)} place-items-center gap-y-[25px] mt-[15px] mx-[5%]`}>
      {savedRecipes.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada resep yang disimpan</p>
      ) : (
        savedRecipes.map((recipe, index) => (
          <div key={index} className="relative">
            <Link href={`/recipes/${recipe.recipe_id}`}>
              <Card width={300} height={200} image={recipe?.recipe?.image} recipe_name={recipe?.recipe?.title} />
            </Link>
            <div className="absolute top-2 right-0 flex">
              <button
                onClick={() => handleDelete(recipe.id)}
                className="bg-white bg-opacity-75 text-red-800 p-1 w-8 h-8 flex items-center justify-center"
              >
                <span className="text-xl font-bold"> x </span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default SavedRecipe