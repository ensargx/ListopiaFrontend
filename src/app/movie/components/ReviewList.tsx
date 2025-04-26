import React, { useState } from 'react';
import '../style/ReviewList.css';

interface ReviewList {
    id: string;
    author: string;
    content: string;
}

const mockReviews: ReviewList[] = [
    { id: 'r1', author: 'Alice', content: 'Harika bir film, mutlaka izleyin!' },
    { id: 'r2', author: 'Bob', content: 'Klasik bir başyapıt.' },
    { id: 'r3', author: 'Charlie', content: 'Biraz uzun ama değiyor.' },
];

const ReviewList: React.FC = () => {
    const [review, setReview] = useState('');

    // Yorum gönderme fonksiyonu (API ile bağlantı yapılacak)
    const handleCommentSubmit = () => {
        // API ile yorum gönderme işlemi burada yapılacak
        console.log("Yorum gönderilecek:", review);
        setReview(''); // Yorum gönderildikten sonra input sıfırlanır
    };

    return (
        <section className="review-list">
            <h2>User Reviews</h2>
            {mockReviews.map(r => (
                <div key={r.id} className="review-card">
                    <p className="author">{r.author}</p>
                    <p className="content">{r.content}</p>
                </div>
            ))}

            {/* Yorum yazma alanı */}
            <div className="comment-section">
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button onClick={handleCommentSubmit} className="btn-comment">
                    Submit Comment
                </button>
            </div>

            <a href="#" className="see-all">See all reviews</a>
        </section>
    );
};

export default ReviewList;
