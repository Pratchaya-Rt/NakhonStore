import { Link } from "react-router-dom";
import HeartIcon from './HeartIcon'


const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-[15rem] w-[30rem] rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4" >
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-orange-900 dark:text-orange-300">
              {product.price} บาท
            </span>
          </h2>
        </Link>
      </div>
    </div>
  )
}

export default SmallProduct