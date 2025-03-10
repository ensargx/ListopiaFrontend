import { useParams } from "react-router";

function UserPage() {
  const { username } = useParams();

  return <div>Selam, {username}!</div>;
}

export default UserPage;
