import { getExperiences, getEducation } from "@/lib/sanity";
import Timeline from "../components/Timeline";

export default async function TimelinePage() {
    const experiences = await getExperiences();
    const educations = await getEducation();


    return (
        <main>
            <Timeline experiences={experiences} educations={educations} />
        </main>
    );
}
