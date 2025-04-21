import React from 'react';
import './ReviewList.css';

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

const ReviewList: React.FC = () => (
    <section className="review-list">
        <h2>User Reviews</h2>
        {mockReviews.map(r => (
            <div key={r.id} className="review-card">
                <p className="author">{r.author}</p>
                <p className="content">{r.content}</p>
            </div>
        ))}
        <a href="#" className="see-all">See all reviews</a>
    </section>
);

export default ReviewList;
