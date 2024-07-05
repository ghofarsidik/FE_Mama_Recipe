import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Card from '../../components/base/Card'
import edit from '../../assets/images/icons/edit.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'

const MyRecipe = ({ recipes, handleDelete }) => {
  const [columns, setColumns] = useState(1);
  const router = useRouter(); // Initialize useRouter

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

  const handleEdit = (id) => {
    router.push(`/recipes/edit_recipe/${id}`); // Navigate to the edit page with the recipe id
  };

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
      {recipes.map((recipe, index) => (
        <div key={index} className="relative">
          <Link href={`/recipes/${recipe.id}`}>
            <Card width={300} height={200} image={recipe?.image} recipe_name={recipe.title} />
          </Link>
          <div className="absolute top-2 right-0 flex">
            <button
              onClick={() => handleEdit(recipe.id)}
              className="bg-white bg-opacity-75 text-blue-800 rounded-l-2xl p-1 w-8 h-8 flex items-center justify-center "
            >
              <Image src={edit} alt="Edit" className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(recipe.id)}
              className="bg-white bg-opacity-75 text-red-800 p-1 w-8 h-8 flex items-center justify-center"
            >
              <span className="text-xl font-bold"> x </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyRecipe