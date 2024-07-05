import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Navbar from '../../components/base/Navbar';
import Footer from '../../components/base/Footer';
import API from '../../api/api';
import like from '../../assets/images/icons/like.svg';
import unlike from '../../assets/images/icons/unlike.svg';
import save from '../../assets/images/icons/bookmark.svg';
import unsave from '../../assets/images/icons/unbookmark.svg';

const RecipeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (id) {
      const getRecipe = async () => {
        try {
          const response = await API.get(`/recipes/${id}`);
          console.log("recipe: ", response.data.data);
          setRecipe(response.data.data);
        } catch (err) {
          setError("Error fetching recipe details.");
        }
      };

      const getLikeStatus = async () => {
        try {
          const likeResponse = await API.get(`/recipes/like`);
          const likeRecipe = likeResponse.data.data.find(recipe => recipe.recipe_id === id);
          setIsLiked(!!likeRecipe); // Set isLiked based on the existence of likeRecipe
        } catch (err) {
          setError("Error fetching like status.");
        }
      };

      const getSaveStatus = async () => {
        try {
          const saveResponse = await API.get(`/recipes/save`);
          const savedRecipe = saveResponse.data.data.find(recipe => recipe.recipe_id === id);
          setIsSaved(!!savedRecipe); 
        } catch (err) {
          setError("Error fetching save status.");
        }
      };

      getRecipe();
      getLikeStatus();
      getSaveStatus();
    }
  }, [id]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        const likeRecipesData = await API.get('/recipes/like')
        const likeRecipe = likeRecipesData.data.data.find(recipe => recipe.recipe_id === id)
        await API.delete(`/recipes/like/${likeRecipe.id}`);
        setIsLiked(false); // Set to false after delete
      } else {
        await API.post(`/recipes/like`, { recipe_id: id });
        setIsLiked(true); // Set to true after post
      }
    } catch (err) {
      setError("Error updating like status.");
    }
  };

  const handleSave = async () => {
    try {
      if (isSaved) {
        const saveRecipeData = await API.get('/recipes/save')
        const saveRecipe = saveRecipeData.data.data.find(recipe => recipe.recipe_id === id)
        await API.delete(`/recipes/save/${saveRecipe.id}`);
        setIsSaved(false); // Set to false after delete
      } else {
        await API.post(`/recipes/save`, { recipe_id: id });
        setIsSaved(true); // Set to true after post
      }
    } catch (err) {
      setError("Error updating save status.");
    }
  };

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

  const handleClick = async() => {
    try {
      const likeResponse = await API.post(`/recipes/save`, { id });
      console.log("likeResponse: ", likeResponse);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="max-w-[1440px] mx-auto bg-bg_krem font-montserrat">
      <Navbar />
      <div className="flex flex-col px-[5%]">
        <h1 className="font-semibold text-[50px] text-mr_color mx-auto">{recipe.title}</h1>
        <div className="relative mx-auto mt-11">
          <Image
            src={recipe.image}
            alt=""
            width={800}
            height={600}
            className='h-[600px] w-auto rounded-2xl'
          />
          <div className="absolute bottom-4 right-4 flex space-x-4">
            <button onClick={handleLike}>
              <Image src={isLiked ? like : unlike} alt="Like" width={45} height={45} />
            </button>
            <button onClick={handleSave}>
              <Image src={isSaved ? save : unsave} alt="Save" width={45} height={45} />
            </button>
          </div>
        </div>
        <button onClick={handleClick}>Save</button>
        <p className='mt-5 ml-[10%]'>Bahan-Bahan</p>
        <p dangerouslySetInnerHTML={createMarkup(recipe.description)} className='ml-[10%] mt-5'></p>
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetail;
