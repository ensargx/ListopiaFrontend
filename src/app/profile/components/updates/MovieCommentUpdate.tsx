import React from "react";
import { UserAcitivity } from "@/types/user/useractivity";

interface MovieCommentedUpdateProps {
  activity: Extract<UserAcitivity, { type: "MOVIE_COMMENT" }>;
}

const MovieCommentedUpdate: React.FC<MovieCommentedUpdateProps> = ({ activity }) => {
  const content = activity.content;

  return (
    <div className="p-4 bg-white shadow rounded-xl border border-gray-100">
      <p className="text-gray-800">
        <strong>{content.message}</strong> yorumunu ypatı.
      </p>
      <p className="text-sm text-gray-500">
        {new Date(activity.time).toLocaleString()}
      </p>
    </div>
  );
};

export default MovieCommentedUpdate;
