import { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [profiles, setProfiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    description: '',
    email: '',
    phone: '',
    interests: '',
    latitude: '',
    longitude: ''
  });

  // Load profiles from localStorage or fallback to default
  useEffect(() => {
    const stored = localStorage.getItem('profiles');
    if (stored) {
      setProfiles(JSON.parse(stored));
    } else {
      // Fallback default profiles
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
      localStorage.setItem('profiles', JSON.stringify(defaultProfiles));
      setProfiles(defaultProfiles);
    }
  }, []);

  const saveProfiles = (updated) => {
    setProfiles(updated);
    localStorage.setItem('profiles', JSON.stringify(updated));
  };

  const handleSubmit = () => {
    const { name, photo, latitude, longitude } = formData;

    if (!name || !photo || !latitude || !longitude) {
      alert('Please fill all required fields (Name, Photo URL, Latitude, Longitude).');
      return;
    }

    const newProfile = {
      ...formData,
      id: editingId ?? Date.now(),
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      interests: formData.interests.trim(),
    };

    const updated = editingId
      ? profiles.map(p => (p.id === editingId ? newProfile : p))
      : [...profiles, newProfile];

    saveProfiles(updated);
    setFormData({
      name: '', photo: '', description: '', email: '', phone: '',
      interests: '', latitude: '', longitude: ''
    });
    setEditingId(null);
  };

  const handleEdit = (profile) => {
    setFormData({
      ...profile,
      latitude: profile.latitude.toString(),
      longitude: profile.longitude.toString()
    });
    setEditingId(profile.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      const updated = profiles.filter(p => p.id !== id);
      saveProfiles(updated);
      if (editingId === id) {
        setEditingId(null);
        setFormData({
          name: '', photo: '', description: '', email: '', phone: '',
          interests: '', latitude: '', longitude: ''
        });
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {['name', 'photo', 'description', 'email', 'phone', 'interests'].map(field => (
          <input
            key={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={e => setFormData({ ...formData, [field]: e.target.value })}
            className="border p-2 rounded"
          />
        ))}
        <input
          type="number"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={e => setFormData({ ...formData, latitude: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={e => setFormData({ ...formData, longitude: e.target.value })}
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700 transition"
      >
        {editingId ? 'Update' : 'Add'} Profile
      </button>

      <ul>
        {profiles.map(p => (
          <li key={p.id} className="border p-2 my-2 flex justify-between items-center rounded">
            <span>{p.name}</span>
            <div className="space-x-2">
              <button onClick={() => handleEdit(p)} className="text-blue-500 hover:underline">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
