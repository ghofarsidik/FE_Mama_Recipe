import Image from "next/image";
import noImage from "../../assets/images/images/noimage.jpg";

const Card = ({ image, recipe_name, onClick, width, height, fontSize = 24 }) => {
  return (
    <div
      className={`bg-white relative`}
      onClick={onClick}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        className={`rounded-t-xl object-cover rounded-xl`}
        src={image || noImage}
        alt="image"
        width={width}
        height={height}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
      <p className={`text-[${fontSize}] font-blanja_metropolis rounded-r-xl font-medium absolute bottom-2 left-0 py-1 px-3 
      bg-white bg-opacity-75
      `}>
        {recipe_name}
      </p>
    </div>
  );
};

export default Card;
