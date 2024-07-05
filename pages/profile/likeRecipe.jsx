import Link from 'next/link'
import React from 'react'
import Card from '../../components/base/Card'

const LikeRecipe = () => {
  return (
    <div><div className="grid grid-cols-3 place-items-center gap-y-[25px] mt-[15px] mx-[5%]">
    {recipes.map((recipe, index) => (
      <Link href={`/recipes/${recipe.id}`} key={index}>
        <Card size={400} image={recipe?.image} recipe_name={recipe.title} />
      </Link>
    ))}
  </div></div>
  )
}

export default LikeRecipe