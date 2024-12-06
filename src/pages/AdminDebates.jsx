import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Pen, Trash, Plus } from 'lucide-react';

const AdminDebates = () => {
  const [debates, setDebates] = useState([
    {
        title: 'Artificial Intelligence in Society',
        desc: 'Explore the impact of AI on our daily lives and its ethical implications.',
        eventdetails: 'Date: Dec 15, 2024 | Time: 5:00 PM | Venue: Virtual',
        category: 'Technology',
      },
      {
        title: 'Climate Change: Myth or Reality?',
        desc: 'Dive into the debate on climate change and discuss its significance.',
        eventdetails: 'Date: Dec 20, 2024 | Time: 4:00 PM | Venue: Hall A',
        category: 'Environment',
      },
      {
        title: 'The Future of Education',
        desc: 'Discuss how technology is reshaping the education sector.',
        eventdetails: 'Date: Dec 25, 2024 | Time: 3:00 PM | Venue: Seminar Room',
        category: 'Education',
      },
      {
        title: 'Space Exploration: Is it Worth the Cost?',
        desc: 'A thought-provoking discussion on the benefits of space exploration.',
        eventdetails: 'Date: Dec 30, 2024 | Time: 6:00 PM | Venue: Auditorium',
        category: 'Science',
      },
  ]);

  const categories = [
    'All',
    'Technology',
    'Environment',
    'Education',
    'Politics',
    'Science',
    'Health',
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visible, setVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Refs for form fields
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const eventDetailsRef = useRef(null);
  const categoryRef = useRef(null);

  const filteredDebates =
    selectedCategory === 'All'
      ? debates
      : debates.filter((debate) => debate.category === selectedCategory);

      const openPopup = (index = null) => {
        setVisible(true); // Ensure the popup is visible first
        
        // Use a timeout to delay setting values until the popup renders
        setTimeout(() => {
          if (index !== null) {
            const debate = debates[index];
            if (titleRef.current) titleRef.current.value = debate.title;
            if (descRef.current) descRef.current.value = debate.desc;
            if (eventDetailsRef.current) eventDetailsRef.current.value = debate.eventdetails;
            if (categoryRef.current) categoryRef.current.value = debate.category;
            setEditIndex(index);
          } else {
            if (titleRef.current) titleRef.current.value = '';
            if (descRef.current) descRef.current.value = '';
            if (eventDetailsRef.current) eventDetailsRef.current.value = '';
            if (categoryRef.current) categoryRef.current.value = '';
            setEditIndex(null);
          }
        }, 0); // Delay ensures refs are initialized
      };

  const handleSave = () => {
    const updatedDebate = {
      title: titleRef.current.value,
      desc: descRef.current.value,
      eventdetails: eventDetailsRef.current.value,
      category: categoryRef.current.value,
    };

    if (editIndex !== null) {
      // Update existing debate
      const updatedDebates = [...debates];
      updatedDebates[editIndex] = updatedDebate;
      setDebates(updatedDebates);
    } else {
      // Add new debate
      setDebates([...debates, updatedDebate]);
    }

    setVisible(false);
  };

  return (
    <>
      <Navbar />
      <section className="w-full h-[50vh] landingbg flex items-center justify-center text-center text-white">
        <div className="px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Manage Debates Effectively
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Oversee and organize debates effortlessly, ensuring smooth and engaging discussions for all participants
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Sort by Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer landingbg text-white w-[200px] h-[120px] flex items-center justify-center text-lg font-semibold rounded-xl shadow-lg hover:bg-purple-700 transition-colors ${
                selectedCategory === category ? 'bg-purple-700' : ''
              }`}
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="flex w-screen justify-center gap-[50px]">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            {selectedCategory === 'All'
              ? 'Featured Debates'
              : `${selectedCategory} Debates`}
          </h2>
          <button
            className="px-3 bg-gradient-to-r from-purple-800 to-blue-800 h-[40px] text-white rounded-lg font-semibold shadow-md hover:scale-105 transition-transform"
            onClick={() => openPopup()}
          >
            <Plus />
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {filteredDebates.length > 0 ? (
            filteredDebates.map((data, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden w-[300px] hover:scale-105 transition-transform"
              >
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{data.title}</h3>
                  <p className="text-gray-600 mb-4">{data.desc}</p>
                  <p className="text-gray-600 mb-4">{data.eventdetails}</p>
                  <p className="text-sm text-purple-800 rounded-lg font-semibold mb-4">
                    {data.category}
                  </p>
                  <div className="flex gap-2">
                    <button
                      className="px-2 py-2 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:scale-105 transition-transform"
                      onClick={() => openPopup(idx)}
                    >
                      <Pen />
                    </button>
                    <button
                      className="px-2 py-2 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:scale-105 transition-transform"
                      onClick={() =>
                        setDebates(debates.filter((_, i) => i !== idx))
                      }
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center text-lg">
              No debates available for the selected category.
            </p>
          )}
        </div>
      </section>

      {visible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
            <h3 className="text-2xl font-bold mb-4">
              {editIndex !== null ? 'Edit Debate' : 'Add Debate'}
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                ref={titleRef}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                name="desc"
                placeholder="Description"
                ref={descRef}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="eventdetails"
                placeholder="Event Details"
                ref={eventDetailsRef}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <select
                name="category"
                ref={categoryRef}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select Category</option>
                {categories.slice(1).map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="w-full bg-gradient-to-r from-purple-800 to-blue-800 text-white py-2 rounded-lg"
                onClick={handleSave}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDebates;
