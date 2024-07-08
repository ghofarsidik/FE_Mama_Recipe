import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/base/Navbar";
import Image from "next/image";
import dummyImage from "../../assets/images/images/dummyPhoto.jpg";
import MyRecipe from "../../components/module/MyRecipe.jsx";
import SavedRecipe from "../../components/module/SavedRecipe.jsx";
import LikeRecipe from "../../components/module/LikeRecipe.jsx";
import Footer from "../../components/base/Footer.jsx";
import { getProfile, getMyRecipes, getSavedRecipes, getLikeRecipes, deleteMyRecipe, deleteSavedRecipe, deleteLikeRecipe } from "../../redux/slice/userSlice";
import PrivateRoute from "../../components/module/route/PrivateRoute.jsx";

const Index = () => {
  const dispatch = useDispatch();
  const { user, myRecipes, savedRecipes, likeRecipes } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("My Recipe");

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getMyRecipes());
    dispatch(getSavedRecipes());
    dispatch(getLikeRecipes());
  }, [dispatch]);

  const handleDeleteMyRecipe = (id) => {
    dispatch(deleteMyRecipe(id));
  };

  const handleDeleteSave = (id) => {
    dispatch(deleteSavedRecipe(id));
  };

  const handleDeleteLike = (id) => {
    dispatch(deleteLikeRecipe(id));
  };

  return (
    <div>
      <Navbar />
      <Image
        src={dummyImage}
        alt="photo"
        width={160}
        height={160}
        className="mx-auto mt-11 h-[160px] w-[160px] rounded-full object-cover"
      />     

      <div className="mt-5 w-full">
        <p className="text-center font-semibold text-[26px]">{user?.name}</p>
      </div>
      <div className="flex w-full border-b-2 pb-7 mt-16">
        <div
          className={`text-[23px] font-semibold ml-[5%] ${
            activeTab === "My Recipe" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("My Recipe")}
        >
          My Recipe
        </div>
        <div
          className={`text-[23px] font-semibold ml-[5%] ${
            activeTab === "Saved Recipe" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Saved Recipe")}
        >
          Saved Recipe
        </div>
        <div
          className={`text-[23px] font-semibold ml-[5%] ${
            activeTab === "Like Recipe" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Like Recipe")}
        >
          Like Recipe
        </div>
      </div>
      <div className="mt-5 w-full text-center">
        {activeTab === "My Recipe" && <MyRecipe recipes={myRecipes} handleDelete={handleDeleteMyRecipe} />}
        {activeTab === "Saved Recipe" && <SavedRecipe savedRecipes={savedRecipes} handleDelete={handleDeleteSave} />}
        {activeTab === "Like Recipe" && <LikeRecipe likeRecipes={likeRecipes} handleDelete={handleDeleteLike} />}
      </div>

      <Footer />
    </div>
  );
};

export default PrivateRoute(Index, true);
