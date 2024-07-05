import Image from "next/image";
import noImage from "../../assets/images/images/noimage.jpg";

const Card = ({ image, recipe_name, onClick, width, height }) => {
  return (
    <div
      className={`w-[${width}px] h-[${height}px] bg-white  relative`}
      onClick={onClick}
    >
      <Image
        className={`rounded-t-xl object-cover w-[${width}px] h-[${height}px] rounded-xl`}
        src={image || noImage}
        alt="image"
        width={width}
        height={height}
      />
      <p className="text-base font-blanja_metropolis rounded-r-xl font-medium absolute bottom-2 left-0 py-1 px-3 
      bg-white bg-opacity-75
      ">
        {recipe_name}
      </p>
    </div>
  );
};

export default Card;
