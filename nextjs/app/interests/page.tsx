import { getPassions } from "@/lib/sanity";
import Passion from "../components/Passion";

export default async function InterestsPage() {
  const passions = await getPassions();

  return (
    <main className="passions">
      <h1>Interests, hobbies and passions</h1>
      <div className="passions-list">
        {passions.map((passion) => (
          <Passion key={passion._id} passion={passion} />
        ))}
      </div>
    </main>
  );
}
