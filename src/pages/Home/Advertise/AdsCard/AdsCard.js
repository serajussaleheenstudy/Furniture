import React from 'react';
import { Link } from 'react-router-dom';

const AdsCard = ({ ad }) => {
    const { _id, image, title, resale_price, location, product_condition } = ad;
    return (
      <div>
        <div
          className="card w-96 bg-base-100 shadow-xl image-full"
          data-aos="zoom-in"
        >
          <figure>
            <img src={image} alt="" />
          </figure>
          <div className="card-body">
            <p className="text-3xl font-bold text-accent">HOT Deal!!!</p>
            <h2 className="card-title">{title}</h2>
            <div>
              <p className="font-semibold">Resale Price: ${resale_price}</p>
            </div>

            <div>
              <p className="font-semibold">Location: {location}</p>
            </div>

            <div className="card-actions justify-end bottom-0">
              <Link
                to={`/product/${_id}`}
                className="btn bg-primary hover:bg-primary hover:bg-opacity-70 text-neutral border-none rounded-sm"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AdsCard;