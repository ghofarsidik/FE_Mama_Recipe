import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Navbar from '../../components/base/Navbar';
import Footer from '../../components/base/Footer';
import API from '../../api/api';
import like from '../../assets/images/icons/like.svg';
import unlike from '../../assets/images/icons/unlike.svg';
import save from '../../assets/images/icons/bookmark.svg';
import unsave from '../../assets/images/icons/unbookmark.svg';
import { fetchRecipe, fetchLikeStatus, fetchSaveStatus, setLikeStatus, setSaveStatus, deleteLike, deleteSave } from '../../redux/slice/recipeSlice';
import Image from 'next/image';
import PrivateRoute from '../../components/module/route/PrivateRoute';

const RecipeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { recipe, error, isLiked, isSaved } = useSelector((state) => state.recipe);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipe(id));
      dispatch(fetchLikeStatus(id));
      dispatch(fetchSaveStatus(id));
    }
  }, [id, dispatch]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await dispatch(deleteLike(id)).unwrap();
      } else {
        await API.post(`/recipes/like`, { recipe_id: id });
        dispatch(setLikeStatus(true));
      }
    } catch (err) {
      dispatch(setError("Error updating like status."));
    }
  };

  const handleSave = async () => {
    try {
      if (isSaved) {
        await dispatch(deleteSave(id)).unwrap();
      } else {
        await API.post(`/recipes/save`, { recipe_id: id });
        dispatch(setSaveStatus(true));
      }
    } catch (err) {
      dispatch(setError("Error updating save status."));
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  const createMarkup = (description) => {
    const formattedDescription = description
      .split('\n')
      .map(line => `<li>- ${line}</li>`)
      .join('');
    return { __html: `<ul>${formattedDescription}</ul>` };
  };

  return (
    <div className="w-full mx-auto bg-bg_krem font-montserrat">
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
        <p className='text-xl mt-10 ml-[10%]'>Bahan-Bahan</p>
        <p dangerouslySetInnerHTML={createMarkup(recipe.description)} className='ml-[10%] mt-5 text-lg list-disc list-inside'></p>
      </div>
      <Footer /> 
    </div>
  );
};

export default PrivateRoute(RecipeDetail);
// export default RecipeDetail;
