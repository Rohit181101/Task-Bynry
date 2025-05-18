import { useParams } from 'react-router-dom';
import profilesData from '../data/profiles.json';

const ProfileDetails = () => {
  const { id } = useParams();
  const profile = profilesData.find(p => p.id.toString() === id);

  if (!profile) return <p className="text-center mt-8">Profile not found.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <img src={profile.photo} className="w-full h-64 object-cover rounded" />
      <h2 className="text-3xl font-bold mt-4">{profile.name}</h2>
      <p className="mt-2">{profile.description}</p>
      <h3 className="mt-4 font-semibold">Location:</h3>
      <p>Latitude: {profile.location[0]}, Longitude: {profile.location[1]}</p>
    </div>
  );
};

export default ProfileDetails;
