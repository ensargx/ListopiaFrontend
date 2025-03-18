
// Eğer posterleriniz için ekstra bilgi (başlık, id, vb.) varsa, bir interface tanımlayabilirsiniz:
export interface Poster {
    id: number;
    title: string;
    url: string;
}
export const posters = [
    "https://www.themoviedb.org/t/p/w1280/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    "https://www.themoviedb.org/t/p/w1280/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    "https://www.themoviedb.org/t/p/w1280/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
    "https://www.themoviedb.org/t/p/w1280/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    "https://www.themoviedb.org/t/p/w1280/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    "https://www.themoviedb.org/t/p/w1280/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg"
    // Diğer poster linkleri...
];
// Posterleri bir obje ya da dizi olarak dışa aktarabilirsiniz:

