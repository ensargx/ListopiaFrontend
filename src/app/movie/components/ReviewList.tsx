import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieComments, submitMovieComment } from '@/api/movieapi';
import { useAuth } from "@/app/auth/hooks/AuthContext";
import '../style/ReviewList.css';
import { Comment } from '@/types/movie'; // Correct import for Comment
import { movieIdFromSlug } from '@/app/home/util/slug';

const COMMENTS_PER_PAGE = 5;

const ReviewList: React.FC = () => {
    const { movieSlug } = useParams<{ movieSlug: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();

    const movieId = movieIdFromSlug(movieSlug || '') || 0;
    const [comments, setComments] = useState<Comment[]>([]); // Correct type for comments
    const [comment, setComment] = useState('');
    const [isSpoiler, setIsSpoiler] = useState(false); // State for spoiler checkbox for new comment
    const [currentPage, setCurrentPage] = useState(0); // Current page for pagination
    const [totalPages, setTotalPages] = useState(0); // Total number of pages
    const [loading, setLoading] = useState(false);

    const submitCommentHandler = async () => {
        if (!user) {
            navigate('/login/');
            return;
        }

        try {
            const newComment = await submitMovieComment(movieId, user.uuid, comment, isSpoiler);
            // Prepend the new comment to the existing ones
            setComments((prevComments) => [newComment, ...prevComments]);
            setComment(''); // Clear the comment input
            setIsSpoiler(false); // Reset the spoiler checkbox
        } catch (error) {
            console.error('Failed to submit comment', error);
        }
    };

    const fetchComments = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetchMovieComments(movieId, page, COMMENTS_PER_PAGE);
            setComments(response.content || []);  // Ensure response.content is an array
            setTotalPages(response.totalPages || 0);  // Set the total number of pages
        } catch (error) {
            console.error('Failed to fetch comments', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (movieId) {
            fetchComments(currentPage);
        }
    }, [movieId, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Function to toggle the spoiler visibility for a specific comment
    const toggleSpoiler = (commentId: number) => {
        const updatedComments = comments.map(comment =>
            comment.commentId === commentId
                ? { ...comment, isSpoiler: !comment.isSpoiler } // Toggle the spoiler flag for this specific comment
                : comment
        );
        setComments(updatedComments);
    };

    return (
        <section className="review-list">
            <h2>User Reviews</h2>

            {loading && <p>Loading comments...</p>}

            {comments.length > 0 ? (
                comments.map((commentObj) => (
                    <div key={commentObj.commentId} className="review-card">
                        <p className="author">
                            {/* Accessing user properties: firstName, lastName, and username */}
                            <span
                                className="author-name"
                                onClick={() => navigate(`/profile/${encodeURIComponent(commentObj.user.uuid)}`)}
                            >
                                {commentObj.user.username} {/* Display username */}
                            </span>
                        </p>

                        <p className="content">
                            {/* Show "Show Spoiler" button if it's a spoiler */}
                            {commentObj.isSpoiler ? (
                                <button
                                    className="spoiler-button"
                                    onClick={() => toggleSpoiler(commentObj.commentId)}
                                >
                                    Show Spoiler
                                </button>
                            ) : (
                                <>{commentObj.message}</> // Show the message if not a spoiler
                            )}
                        </p>

                        {/* Only show the spoiler message if the comment is marked as a spoiler */}
                        {commentObj.isSpoiler && commentObj.isUpdated && (
                            <p className="spoiler-message">{commentObj.message}</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No comments available.</p>
            )}

            <div className="comment-section">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <div className="spoiler-checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={isSpoiler}
                            onChange={() => setIsSpoiler(!isSpoiler)} // Toggle the spoiler flag for new comment
                        />
                        This is a spoiler
                    </label>
                </div>
                <button onClick={submitCommentHandler} className="btn-comment">
                    Submit Comment
                </button>
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 0}
                    className="pagination-button"
                >
                    Previous
                </button>
                <span className="pagination-info">Page {currentPage + 1} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default ReviewList;
