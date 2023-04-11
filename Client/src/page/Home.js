import { useNavigate } from "react-router-dom";
import Button from "../components/StartButton";
import img from '../background-assets/gang.png';

function Home() {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate('/About');
  }
  return (
    <div>
      <div className="bodyBackground container mx-auto py-12 font-nav-font">
        <div className="flex flex-wrap">
          <div className="w-full p-6 m-6 bg-cover bg-center bg-no-repeat h-56 border-dark rounded-md shadow-lg hover:bg-opacity-60 hover:scale-95 transition-all duration-300 transform"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
          <div className="w-full p-6">
            <div className="relative p-6 rounded-lg shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-gold opacity-40 rounded-lg"></div>
              <div className="relative bg-gray-900 bg-opacity-80 p-6 rounded-lg">
                <h2 className="text-2xl text-gold text-center mb-4">Get ready to play</h2>
                <p className="text-white text-2xl text-center">
                  To start the game you need a group of your dear friends (at least 6 people).<br /> when you're ready, read the instructions here:
                </p>
                <div className="flex justify-center mt-4">
                  <button onClick={handleClick} className="bg-transparent hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
                    Instructions
                  </button>
                </div>
                <div className="text-xl mt-3 flex justify-center text-white">
                  <h2>Ok! You already know how to play? Let's start!</h2>
                </div>
                <div className="flex justify-center">
                  <Button />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
