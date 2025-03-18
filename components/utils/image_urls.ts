
// Eğer posterleriniz için ekstra bilgi (başlık, id, vb.) varsa, bir interface tanımlayabilirsiniz:
export interface Poster {
    id: number;
    title: string;
    url: string;
}
export const posters = [
    "https://www.themoviedb.org/t/p/w1280/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    "https://www.themoviedb.org/t/p/w1280/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    "https://live.staticflickr.com/4038/4686112993_efe13b4937_h.jpg"
    // Diğer poster linkleri...
];
// Posterleri bir obje ya da dizi olarak dışa aktarabilirsiniz:

