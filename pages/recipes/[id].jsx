'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Navbar from '../../components/base/Navbar'
import Footer from '../../components/base/Footer';

const RecipeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(
            `https://pijar-mama-recipe.vercel.app/v1/recipes/${id}`
          );
          setRecipe(response.data.data);
        } catch (err) {
          setError("Error fetching recipe details.");
        }
      };

      fetchRecipe();  
    }
  }, [id]);

  console.log(recipe);
  console.log(error);

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  const createMarkup = (description) => {
    const formattedDescription = description.replace(/\n/g, '<br />');
    return { __html: formattedDescription };
  };

  return (
    <div className="max-w-[1440px] mx-auto bg-bg_krem font-montserrat">
      <Navbar />
      <div className="flex flex-col px-[5%]">
        <h1 className="font-semibold text-[50px] text-mr_color mx-auto">{recipe.title}</h1>
        <Image
          src={recipe.image}
          alt=""
          width={800}
          height={600}
          className='mx-auto mt-11 h-[600px] w-auto rounded-2xl'
        />
        <p className='mt-5 ml-[10%]'>Bahan-Bahan</p>
        <p dangerouslySetInnerHTML={createMarkup(recipe.description)} className='ml-[10%] mt-5'></p>
        {/* Display other recipe details as needed */}
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetail;
