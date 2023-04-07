// TODO: when you created the database you can add a records tab of the players who played the game and duration of the game they played and other stuff.


import React, { useState } from 'react';
import image1 from '../background-assets/group.png';
import image2 from '../background-assets/detective.jpeg';
import image3 from '../background-assets/family.png';


function About() {
  const [modal, setModal] = useState('');

  const openModal = (section) => {
    setModal(section);
  };

  const closeModal = () => {
    setModal('');
  };

  return (
    <div className="bodyBackground container items-center mx-auto p-10 font-nav-font">
      <div className="flex flex-wrap">
        {[
          { id: "getReady", title: "Get ready to play", content: "To start the game you need a group of your dear friends (at least 6 people) to start the game. Playing the Mafia game is pretty simple, but it does require some cleverness. If you've played with your friends before, you might know that there's usually one person who acts as the 'Lord' and doesn't get to participate in the game itself, but rather just observes it. With our website, though, everyone can get in on the action! We'll handle all the game flow so you can just focus on having fun and trying to outsmart your friends.", image: `${image1}` },
          { id: "howToPlay", title: "How to play", content: "This modal provides detailed instructions on how to play the Mafia game.", image: `${image2}` },
          { id: "aboutGame", title: "About the game", content: "In the Mafia Game each player is secretly assigned a role aligned with either the citizen or the mafia. The mafia eliminates one citizen per night while cleverly disguised as normal citizens during the day. The citizens must group together to eliminate the true mafia before they are outnumbered! The game is divided into two parts: night and day. During the night, mafia members secretly plan to murder a citizen and think up a sneaky day-time strategy. During the day, the entire cast of surviving players debates who among them is a mafia and votes to hang someone. The game alternates between these two phases until either all of the mafias are eliminated (citizen wins) or the number of remaining players reaches a certain threshold.", image: `${image3}` },
        ].map(({ id, title, content, image }) => (
          <div key={id} className="w-full md:w-1/3 p-6">
            <button
              className="w-full h-64 md:h-96 text-2xl text-gold bg-center bg-cover border-2 rounded-lg border-scarlet shadow-lg hover:bg-opacity-60 hover:scale-105 transition-all duration-300 transform p-6 flex flex-col justify-end items-center"
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => openModal(id)}
            >
              <span className="inline-block px-2 py-1 bg-dark border-1 rounded-md">
                {title}
              </span>
            </button>
            {modal === id && (
              <div
                className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-80 z-10"
                onClick={closeModal}
              >
                <div className="bg-white p-6 rounded w-full md:w-1/2" onClick={(e) => e.stopPropagation()}>
                  <h2 className="text-2xl text-scarlet mb-4">{title}</h2>
                  <p className="text-black">{content}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;


