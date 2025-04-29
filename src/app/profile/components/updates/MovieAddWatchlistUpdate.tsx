import React from "react";
import { UserAcitivity } from "@/types/user/useractivity";

interface MovieAddWatchlistUpdateProps {
  activity: Extract<UserAcitivity, { type: "MOVIE_ADD_WATCHLIST" }>;
}

const MovieAddWatchlistUpdate: React.FC<MovieAddWatchlistUpdateProps> = ({ activity }) => {
  const content = activity.content;

  return (
    <div className="p-4 bg-white shadow rounded-xl border border-gray-100">
      <p className="text-gray-800">
        <strong>{content.title}</strong> izleme listesine ekledi.
      </p>
      <p className="text-sm text-gray-500">
        {new Date(activity.time).toLocaleString()}
      </p>
    </div>
  );
};

export default MovieAddWatchlistUpdate;
