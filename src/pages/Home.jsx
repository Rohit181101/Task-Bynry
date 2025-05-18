import { useEffect, useState } from "react";
import MapLeaflet from "../components/MapLeaflet";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [expandedProfileId, setExpandedProfileId] = useState(null);
  const [loadingMap, setLoadingMap] = useState(false);

  useEffect(() => {
    const storedProfiles = localStorage.getItem("profiles");
    if (storedProfiles) {
      setProfiles(JSON.parse(storedProfiles));
    } else {
      const defaultProfiles = [
        {
          id: 1,
          name: "Jane Doe",
          description: "Frontend Developer",
          email: "jane@example.com",
          phone: "1234567890",
          interests: "React, UI/UX",
          latitude: 44.9778,
          longitude: -93.265,
          image: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        {
          id: 2,
          name: "John Smith",
          description: "Backend Developer",
          email: "john@example.com",
          phone: "9876543210",
          interests: "Node.js, Databases",
          latitude: 40.7128,
          longitude: -74.006,
          image: "https://randomuser.me/api/portraits/men/2.jpg",
        },
      ];
      localStorage.setItem("profiles", JSON.stringify(defaultProfiles));
      setProfiles(defaultProfiles);
    }
  }, []);

  const toggleSummary = (id, lat, lon) => {
    setExpandedProfileId((prevId) => (prevId === id ? null : id));

    if (lat && lon) {
      setLoadingMap(true); // Start loading
      setSelectedLocation([lat, lon]);

      // Simulate load delay (e.g., until MapLeaflet renders new position)
      setTimeout(() => {
        setLoadingMap(false); // Stop loading after brief delay
      }, 500); // Adjust duration if needed
    }
  };

  const filteredProfiles = profiles.filter(
    (profile) =>
      (profile.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (profile.description || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row p-6 space-y-6 lg:space-y-0 lg:space-x-8 min-h-screen">
      <div className="w-full lg:w-1/2">
        <h1 className="text-3xl font-bold mb-4">Profiles</h1>
        <input
          type="text"
          placeholder="Search profiles..."
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="space-y-4 max-h-[70vh] overflow-auto">
          {filteredProfiles.map((profile) => (
            <div key={profile.id} className="bg-[#fbf7f7] rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={profile.photo || profile.image}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{profile.name}</h2>
                    <p className="text-gray-600">{profile.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (profile.latitude && profile.longitude) {
                      toggleSummary(
                        profile.id,
                        profile.latitude,
                        profile.longitude
                      );
                    }
                  }}
                  className="border border-gray-400 rounded px-3 py-1 text-sm hover:bg-gray-100 transition"
                >
                  {expandedProfileId === profile.id ? "Hide" : "Summary"}
                </button>
              </div>

              {expandedProfileId === profile.id && (
                <div className="transition-all duration-300 mt-4 border-t pt-4 text-sm text-gray-700 space-y-2">
                  <p>
                    <strong>Email:</strong> {profile.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {profile.phone}
                  </p>
                  <p>
                    <strong>Interests:</strong> {profile.interests}
                  </p>
                  <p>
                    <strong>Latitude:</strong> {profile.latitude}
                  </p>
                  <p>
                    <strong>Longitude:</strong> {profile.longitude}
                  </p>
                </div>
              )}
            </div>
          ))}
          {filteredProfiles.length === 0 && <p>No profiles found.</p>}
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        {loadingMap ? (
          <div className="h-[400px] flex items-center justify-center border border-gray-300 rounded">
            <LoadingSpinner />
          </div>
        ) : (
          <MapLeaflet location={selectedLocation} />
        )}
      </div>
    </div>
  );
};

export default Home;
