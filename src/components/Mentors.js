
import React, { useState } from "react";


const Tutoring = () => {
    const [showAllCards] = useState(false);
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [bookingStatus, setBookingStatus] = useState(null);
  
    const tutorCards = [
      { id: 1, name: 'Lisbeth Snow', specialization: 'Full Stack Developer', about: 'Lisbeth is a passionate Full Stack Developer with a keen interest in creating seamless and user-friendly applications. She enjoys working on both front-end and back-end technologies.', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVhY2hlcnxlbnwwfHwwfHx8MA%3D%3D' },
      { id: 2, name: 'Julius Amantete', specialization: 'UX/UI Designer', about: ' Julius is a talented UX/UI Designer who combines creativity with functionality. He excels in creating visually appealing and intuitive designs to enhance user experiences.', image: 'https://images.unsplash.com/flagged/photo-1559475555-b26777ed3ab4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFsZSUyMHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D%3D' },
      { id: 3, name: 'Annabelle Williams', specialization: 'Data Scientist', about: 'Annabelle is a dedicated Data Scientist with a knack for extracting meaningful insights from complex datasets. She enjoys solving real-world problems through data-driven approaches.', image: 'https://images.unsplash.com/photo-1590650213165-c1fef80648c4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D' },
      { id: 4, name: 'Liam Swath', specialization: 'Mobile App Developer', about: 'Liam is a skilled Mobile App Developer who loves crafting innovative and efficient mobile applications. He stays updated on the latest mobile development trends.', image: 'https://images.unsplash.com/photo-1473492201326-7c01dd2e596b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hbGUlMjB0ZWFjaGVyfGVufDB8fDB8fHww' },
      { id: 5, name: 'Olivia Anderson', specialization: 'Front-End Developer', about: 'Olivia is a detail-oriented Front-End Developer who takes pride in creating visually appealing and responsive user interfaces. She has a strong foundation in HTML, CSS, and JavaScript.', image: 'https://media.istockphoto.com/id/1485687739/photo/portrait-of-female-high-school-or-secondary-school-teacher-with-digital-tablet-outdoors-at.jpg?s=612x612&w=0&k=20&c=M4JxvN1FwB8xnNcofN85UwD9iFEIvAAvLcloMbwmgXA=' },
      { id: 6, name: 'Jackson Davis', specialization: 'Cybersecurity Analyst', about: 'Jackson is a cybersecurity enthusiast with a focus on ensuring digital security. He is dedicated to implementing robust security measures to safeguard against cyber threats.', image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hbGUlMjB0ZWFjaGVyfGVufDB8fDB8fHww' },
    ];
  
    const visibleTutors = showAllCards ? tutorCards : tutorCards.slice(0, 6);
  
    const handleTutorClick = (tutor) => {
      setSelectedTutor(tutor);
    };
  
    const handleBooking = async () => {
      try {
        const response = await fetch('/bookings', {
          method: 'POST',
          body: JSON.stringify({
            tutor: selectedTutor.id,
            // Include any additional booking details
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        // Handle the response as needed
        if (response.ok) {
          const booking = await response.json();
          setBookingStatus("Session booked!");
          console.log('Booking:', booking);
        } else {
          setBookingStatus("Booking failed. Please try again later.");
        }
      } catch (error) {
        setBookingStatus("An error occurred. Please try again later.");
        console.error(error);
      }
    };
  
    return (
      <div
        className="tutoring-card"
        style={{ maxWidth: '800px', margin: 'auto', padding: '20px', backgroundColor: 'white' }}
      >
        <div
          className="heading"
          style={{
            color: 'teal',
            fontSize: 34,
            fontFamily: 'Chau Philomene One',
            fontWeight: '400',
            wordWrap: 'break-word'
          }}
        >
          Unlocking Potential: The Power of Exceptional Mentors and Private Tutoring.
        </div>
  
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <div style={{ flex: 1, marginLeft: '60px' }}>
            <p style={{ fontSize: '18px', color: 'black', marginBottom: '30px' }}>
              In the realm of education, the impact of an exceptional mentor cannot be overstated. Our team of mentors is comprised of seasoned professionals dedicated to guiding and inspiring individuals on their educational journey.
              Private tutoring enables mentors to provide timely and detailed feedback. This continuous feedback loop ensures that students are aware of their strengths and areas for improvement. It also allows for prompt adjustments to learning strategies, optimizing the overall educational experience.
            </p>
            <p style={{ fontSize: '18px', color: 'black', marginBottom: '30px' }}>
              Here are our exceptional and experienced technical mentors:
            </p>
          </div>
        </div>
  
        <div className="tutors" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '30px' }}>
    {visibleTutors.map((tutor) => (
      <div
        key={tutor.id}
        className="tutor-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          marginRight: '20px',
          cursor: 'pointer',
          width: '230px', // Adjust the width as per your requirement
        }}
        onClick={() => handleTutorClick(tutor)}
      >
        <img
          src={tutor.image}
          alt={tutor.name}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginRight: '20px',
          }}
        />
        <div>
          <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>{tutor.name}</h3>
          <p style={{ color: 'gray', fontSize: '16px' }}>{tutor.specialization}</p>
        </div>
      </div>
    ))}
  </div>
  
  {selectedTutor && (
    <div
      className="tutor-details"
      style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: 'teal',
        color: 'white',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        width: '700px', // Adjust the width as per your requirement
      }}
    >
      <img
        src={selectedTutor.image}
        alt={selectedTutor.name}
        style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover', marginRight: '20px' }}
      />
      <div>
        <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>{selectedTutor.name}</h3>
        <p style={{ fontSize: '20px' }}>{selectedTutor.specialization}</p>
        <p style={{ fontSize: '18px' }}>{selectedTutor.about}</p>
        <button
          style={{
            backgroundColor: 'white',
            color: 'teal',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            marginTop: '10px',
            cursor: 'pointer',
          }}
          onClick={handleBooking}
        >
          Book Tutoring Session
        </button>
      </div>
    </div>
  )}
  
  {bookingStatus && (
    <div
      className="notification"
      style={{
        marginTop: '20px',
        padding: '10px',
        backgroundColor: 'green',
        color: 'white',
        borderRadius: '5px',
        width: '500px', // Adjust the width as per your requirement
      }}
    >
      {bookingStatus}
    </div>
  )}
      </div>
    )};

export default Tutoring