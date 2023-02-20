import React from "react";

const Stats = () => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow-lg w-full bg-primary text-neutral mt-16 mb-20">
      <div className="stat  place-items-center">
        <div className="stat-title">Available</div>
        <div className="stat-value">Everyday</div>
        <div className="stat-desc"> Any Time </div>
      </div>

      <div className="stat  place-items-center">
        <div className="stat-title">Reviews</div>
        <div className="stat-value">4,200</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div className="stat  place-items-center">
        <div className="stat-title">New Orders</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
  );
};

export default Stats;
