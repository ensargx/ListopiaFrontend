import { Link } from "react-router";

function NotFoundPage() {
  return (
    <>
      <div>Page Not Found</div>
      Go to <Link to="/">Home</Link>
    </>
  );
}

export default NotFoundPage;
