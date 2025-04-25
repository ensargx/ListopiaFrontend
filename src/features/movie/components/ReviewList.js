import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './ReviewList.css';
const mockReviews = [
    { id: 'r1', author: 'Alice', content: 'Harika bir film, mutlaka izleyin!' },
    { id: 'r2', author: 'Bob', content: 'Klasik bir başyapıt.' },
    { id: 'r3', author: 'Charlie', content: 'Biraz uzun ama değiyor.' },
];
const ReviewList = () => {
    const [review, setReview] = useState('');
    // Yorum gönderme fonksiyonu (API ile bağlantı yapılacak)
    const handleCommentSubmit = () => {
        // API ile yorum gönderme işlemi burada yapılacak
        console.log("Yorum gönderilecek:", review);
        setReview(''); // Yorum gönderildikten sonra input sıfırlanır
    };
    return (_jsxs("section", { className: "review-list", children: [_jsx("h2", { children: "User Reviews" }), mockReviews.map(r => (_jsxs("div", { className: "review-card", children: [_jsx("p", { className: "author", children: r.author }), _jsx("p", { className: "content", children: r.content })] }, r.id))), _jsxs("div", { className: "comment-section", children: [_jsx("textarea", { value: review, onChange: (e) => setReview(e.target.value), placeholder: "Write a comment..." }), _jsx("button", { onClick: handleCommentSubmit, className: "btn-comment", children: "Submit Comment" })] }), _jsx("a", { href: "#", className: "see-all", children: "See all reviews" })] }));
};
export default ReviewList;
