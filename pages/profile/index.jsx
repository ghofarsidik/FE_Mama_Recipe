import React, { useEffect, useState } from "react";
import Navbar from "../../components/base/Navbar";
import Image from "next/image";
import dummyImage from "../../assets/images/images/dummyPhoto.jpg";
import MyRecipe from "./MyRecipe.jsx";
import SavedRecipe from "./SavedRecipe";
import LikeRecipe from "./LikeRecipe";
import API from "../../api/api.jsx";
import Footer from "../../components/base/Footer.jsx";

const Index = () => {
  const [activeTab, setActiveTab] = useState("My Recipe");
  const [recipes, setrecipes] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await API.get("/users/profile");
        const data = response.data.data;
        console.log("user data: ", data);
        setUser(data);
      } catch (error) {
        console.error("Error getting user data: ", error);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const getRecipesData = async () => {
      try {
        const response = await API.get("/recipes/self");
        const data = response.data.data;
        console.log("Recipe data: ", data);
        setrecipes(data);
      } catch (err) {
        console.error("Failed to get recipe data: ", err);
      }
    };

    getRecipesData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/recipes/${id}`);
      setrecipes((prevRecipes) => prevRecipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Failed to delete the recipe:', error);
    }
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
        <p className="text-center font-semibold text-[26px]">{user.name}</p>
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
        {activeTab === "My Recipe" && <MyRecipe recipes={recipes} handleDelete={handleDelete} />}
        {activeTab === "Saved Recipe" && <SavedRecipe recipes={recipes} />}
        {activeTab === "Like Recipe" && <LikeRecipe recipes={recipes} />}
      </div>

      <Footer />
    </div>
  );
};

export default Index;
