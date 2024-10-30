// "use client";
// import React, { useEffect, useState, useRef } from 'react';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';
// import { NavBar } from '@/components/nav-bar';

// interface Cracker {
//   id: number;
//   x: number;
//   y: number;
//   color: string;
//   exploded: boolean;
//   scale: number;
// }

// interface Confetti {
//   id: number;
//   x: number;
//   y: number;
//   color: string;
//   rotation: number;
//   speed: number;
// }

// const colors = ['#FF5733', '#FFC300', '#FF33FF', '#33FF57', '#3366FF'];
// const confettiColors = ['#FFD700', '#FF69B4', '#00FF00', '#4169E1', '#FF4500'];

// const Game = () => {
//   const [crackers, setCrackers] = useState<Cracker[]>([]);
//   const [confetti, setConfetti] = useState<Confetti[]>([]);
//   const [score, setScore] = useState(0);
//   const [highScore, setHighScore] = useState(0);
//   const [gameStarted, setGameStarted] = useState(false);
//   const [gameOver, setGameOver] = useState(false);
//   const gameAreaRef = useRef<HTMLDivElement>(null);
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
//   const applauseRef = useRef<HTMLAudioElement | null>(null);

//   // Load high score from localStorage on initial render
//   useEffect(() => {
//     const savedHighScore = localStorage.getItem('crackerGameHighScore');
//     if (savedHighScore) {
//       setHighScore(parseInt(savedHighScore));
//     }
//     // Create audio element for applause
//     applauseRef.current = new Audio('/api/placeholder/audio'); // You'll need to replace this with actual applause sound URL
//   }, []);

//   // Update high score and trigger celebration when game ends
//   useEffect(() => {
//     if (gameOver && score > highScore) {
//       setHighScore(score);
//       localStorage.setItem('crackerGameHighScore', score.toString());
//       toast.success('🎉 NEW HIGH SCORE! 🎉', {
//         duration: 3000,
//         className: 'bg-yellow-500 text-white text-xl font-bold'
//       });
//       celebrateNewHighScore();
//     }
//   }, [gameOver, score, highScore]);

//   const celebrateNewHighScore = () => {
//     // Play applause sound
//     if (applauseRef.current) {
//       applauseRef.current.currentTime = 0;
//       applauseRef.current.play();
//     }

//     // Create confetti
//     const newConfetti: Confetti[] = Array.from({ length: 100 }).map((_, i) => ({
//       id: Date.now() + i,
//       x: Math.random() * dimensions.width,
//       y: dimensions.height + 10,
//       color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
//       rotation: Math.random() * 360,
//       speed: 2 + Math.random() * 2
//     }));

//     setConfetti(newConfetti);

//     // Animate confetti
//     const animateConfetti = () => {
//       setConfetti(current => 
//         current
//           .filter(c => c.y > -20)
//           .map(c => ({
//             ...c,
//             y: c.y - c.speed,
//             rotation: c.rotation + 2,
//             x: c.x + Math.sin(c.y / 50) * 2
//           }))
//       );
//     };

//     const confettiInterval = setInterval(animateConfetti, 16);
//     setTimeout(() => {
//       clearInterval(confettiInterval);
//       setConfetti([]);
//     }, 5000);
//   };

//    // Load high score from localStorage on initial render
//   useEffect(() => {
//     const savedHighScore = localStorage.getItem('crackerGameHighScore');
//     if (savedHighScore) {
//       setHighScore(parseInt(savedHighScore));
//     }
//   }, []);

//   // Update high score when game ends
//   useEffect(() => {
//     if (gameOver && score > highScore) {
//       setHighScore(score);
//       localStorage.setItem('crackerGameHighScore', score.toString());
//       toast.success('New High Score! 🎉');
//     }
//   }, [gameOver, score, highScore]);

//   // Initialize dimensions
//   useEffect(() => {
//     const updateDimensions = () => {
//       if (gameAreaRef.current) {
//         setDimensions({
//           width: gameAreaRef.current.clientWidth,
//           height: gameAreaRef.current.clientHeight
//         });
//       }
//     };

//     updateDimensions();
//     window.addEventListener('resize', updateDimensions);
//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   const startGame = () => {
//     setGameStarted(true);
//     setGameOver(false);
//     setScore(0);
//     setCrackers([]);
//     toast('Click on the crackers to burst them!');
//   };

//   const resetHighScore = () => {
//     setHighScore(0);
//     localStorage.removeItem('crackerGameHighScore');
//     toast.success('High score reset!');
//   };

//   // Create new crackers
//   useEffect(() => {
//     if (!gameStarted || gameOver || dimensions.width === 0) return;

//     const interval = setInterval(() => {
//       setCrackers(current => {
//         // Remove crackers that have moved off screen
//         const filtered = current
//           .filter(cracker => cracker.y > -100)
//           .map(cracker => ({
//             ...cracker,
//             y: cracker.y - 2 // Move crackers upward
//           }));

//         // Add new cracker
//         const newCracker = {
//           id: Date.now(),
//           x: Math.random() * (dimensions.width - 50),
//           y: dimensions.height - 50,
//           color: colors[Math.floor(Math.random() * colors.length)],
//           exploded: false,
//           scale: 1
//         };

//         // End game if too many crackers are missed
//         if (filtered.length >= 15) {
//           setGameOver(true);
//           return filtered;
//         }

//         return [...filtered, newCracker];
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [gameStarted, gameOver, dimensions]);

//   const playBurstSound = () => {
//     const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();
    
//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);
    
//     oscillator.type = 'sine';
//     oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
//     gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
//     gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
//     oscillator.start();
//     oscillator.stop(audioContext.currentTime + 0.3);
//   };

//   const burstCracker = (id: number) => {
//     if (gameOver) return;

//     playBurstSound();
    
//     setCrackers(current =>
//       current.map(cracker =>
//         cracker.id === id
//           ? { ...cracker, exploded: true, scale: 1.5 }
//           : cracker
//       )
//     );
    
//     setScore(s => s + 10);

//     const cracker = crackers.find(c => c.id === id);
//     if (!cracker) return;

//     // Create particles
//     for (let i = 0; i < 12; i++) {
//       const angle = (i / 12) * Math.PI * 2;
//       const particle = document.createElement('div');
//       particle.className = 'absolute w-2 h-2 rounded-full';
//       particle.style.backgroundColor = cracker.color;
//       particle.style.left = `${cracker.x + 16}px`;
//       particle.style.top = `${cracker.y + 16}px`;
//       particle.style.transform = 'translate(-50%, -50%)';
      
//       gameAreaRef.current?.appendChild(particle);

//       const animation = particle.animate([
//         {
//           transform: 'translate(-50%, -50%) scale(1)',
//           opacity: 1
//         },
//         {
//           transform: `translate(
//             calc(-50% + ${Math.cos(angle) * 100}px), 
//             calc(-50% + ${Math.sin(angle) * 100}px)
//           ) scale(0)`,
//           opacity: 0
//         }
//       ], {
//         duration: 1000,
//         easing: 'ease-out'
//       });

//       animation.onfinish = () => particle.remove();
//     }

//     setTimeout(() => {
//       setCrackers(current => current.filter(c => c.id !== id));
//     }, 100);
//   };


// return (
//   <div className="bg-gradient-to-b from-orange-500/20 to-yellow-500/20 min-h-screen overflow-hidden">
//     <NavBar />
    
//     <div className="mx-auto px-4 pt-20 container">
//       <div className="mb-4 text-center">
//         <div className="flex justify-center items-center gap-8 mb-4">
//           <div className="font-bold text-2xl">
//             Score: {score}
//           </div>
//           <div className="font-bold text-2xl text-yellow-500">
//             High Score: {highScore}
//           </div>
//         </div>
        
//         {gameOver && (
//           <div className="mb-4 font-bold text-4xl text-red-500">
//             Game Over!
//           </div>
//         )}
        
//         <div className="flex justify-center gap-4">
//           <Button 
//             onClick={startGame}
//             className="bg-blue-500 hover:bg-blue-600 px-8 py-2 rounded-lg text-white"
//           >
//             {gameOver || !gameStarted ? 'Start Game' : 'Restart'}
//           </Button>
          
//           <Button 
//             onClick={resetHighScore}
//             variant="outline"
//             className="px-8 py-2 rounded-lg"
//           >
//             Reset High Score
//           </Button>
//         </div>
//       </div>

//       <div 
//         ref={gameAreaRef}
//         className="relative bg-transparent rounded-lg h-[60vh] overflow-hidden"
//       >
//         {/* Confetti particles */}
//         {confetti.map(particle => (
//           <div
//             key={particle.id}
//             className="absolute w-4 h-4"
//             style={{
//               left: particle.x,
//               top: particle.y,
//               backgroundColor: particle.color,
//               transform: `rotate(${particle.rotation}deg)`,
//               clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
//               transition: 'transform 0.1s linear'
//             }}
//           />
//         ))}

//         {/* Existing crackers */}
//         {crackers.map(cracker => !cracker.exploded && (
//           <div
//             key={cracker.id}
//             className="absolute transition-all duration-300 cursor-pointer"
//             style={{
//               left: cracker.x,
//               top: cracker.y,
//               transform: `scale(${cracker.scale})`,
//               transition: 'all 0.05s ease-out'
//             }}
//             onClick={() => burstCracker(cracker.id)}
//           >
//             <div
//               className="rounded-full w-8 h-8 animate-pulse"
//               style={{ backgroundColor: cracker.color }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );
// };

// export default Game;

"use client"

"use client"

import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { NavBar } from '@/components/nav-bar';

interface Cracker {
  id: number;
  x: number;
  y: number;
  color: string;
  exploded: boolean;
  scale: number;
}

interface Confetti {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  speed: number;
}

const colors = ['#FF5733', '#FFC300', '#FF33FF', '#33FF57', '#3366FF'];
const confettiColors = ['#FFD700', '#FF69B4', '#00FF00', '#4169E1', '#FF4500'];
const INITIAL_LIVES = 3;
const MAX_CRACKERS_ON_SCREEN = 3;

const Game = () => {
  const [crackers, setCrackers] = useState<Cracker[]>([]);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [ setLives] = useState(INITIAL_LIVES);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const applauseRef = useRef<HTMLAudioElement | null>(null);

  // Load high score from localStorage on initial render
  useEffect(() => {
    const savedHighScore = localStorage.getItem('crackerGameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    applauseRef.current = new Audio('/api/placeholder/audio');
  }, []);

  // Update high score and trigger celebration when game ends
  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score);
      localStorage.setItem('crackerGameHighScore', score.toString());
      toast.success('🎉 NEW HIGH SCORE! 🎉', {
        duration: 3000,
        className: 'bg-yellow-500 text-white text-xl font-bold'
      });
      celebrateNewHighScore();
    }
  }, [gameOver, score, highScore]);

  // Check for too many crackers on screen
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const unburstCrackers = crackers.filter(cracker => !cracker.exploded);
      if (unburstCrackers.length >= MAX_CRACKERS_ON_SCREEN) {
        setGameOver(true);
        toast.error('Game Over! Too many crackers on screen!');
      }
    }
  }, [crackers, gameStarted, gameOver]);

  const celebrateNewHighScore = () => {
    if (applauseRef.current) {
      applauseRef.current.currentTime = 0;
      applauseRef.current.play();
    }

    const newConfetti: Confetti[] = Array.from({ length: 100 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * dimensions.width,
      y: dimensions.height + 10,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      rotation: Math.random() * 360,
      speed: 2 + Math.random() * 2
    }));

    setConfetti(newConfetti);

    const animateConfetti = () => {
      setConfetti(current => 
        current
          .filter(c => c.y > -20)
          .map(c => ({
            ...c,
            y: c.y - c.speed,
            rotation: c.rotation + 2,
            x: c.x + Math.sin(c.y / 50) * 2
          }))
      );
    };

    const confettiInterval = setInterval(animateConfetti, 16);
    setTimeout(() => {
      clearInterval(confettiInterval);
      setConfetti([]);
    }, 5000);
  };

  // Initialize dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (gameAreaRef.current) {
        setDimensions({
          width: gameAreaRef.current.clientWidth,
          height: gameAreaRef.current.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCrackers([]);
    toast('Click on the crackers to burst them! Don\'t let 3 or more accumulate!');
  };

  const resetHighScore = () => {
    setHighScore(0);
    localStorage.removeItem('crackerGameHighScore');
    toast.success('High score reset!');
  };

  // Create new crackers
  useEffect(() => {
    if (!gameStarted || gameOver || dimensions.width === 0) return;

    const interval = setInterval(() => {
      setCrackers(current => {
        const unburstCrackers = current.filter(cracker => !cracker.exploded);
        
        // Don't add new crackers if we're at or above the limit
        if (unburstCrackers.length >= MAX_CRACKERS_ON_SCREEN) {
          return current;
        }

        // Update existing crackers positions
        const updatedCrackers = current.map(cracker => ({
          ...cracker,
          y: cracker.y - 2
        })).filter(cracker => cracker.y > -100);

        // Add new cracker
        const newCracker = {
          id: Date.now(),
          x: Math.random() * (dimensions.width - 50),
          y: dimensions.height - 50,
          color: colors[Math.floor(Math.random() * colors.length)],
          exploded: false,
          scale: 1
        };

        return [...updatedCrackers, newCracker];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, dimensions]);

  const playBurstSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const burstCracker = (id: number) => {
    if (gameOver) return;

    playBurstSound();
    
    setCrackers(current =>
      current.map(cracker =>
        cracker.id === id
          ? { ...cracker, exploded: true, scale: 1.5 }
          : cracker
      )
    );
    
    setScore(s => s + 10);

    const cracker = crackers.find(c => c.id === id);
    if (!cracker) return;

    // Create particles
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 rounded-full';
      particle.style.backgroundColor = cracker.color;
      particle.style.left = `${cracker.x + 16}px`;
      particle.style.top = `${cracker.y + 16}px`;
      particle.style.transform = 'translate(-50%, -50%)';
      
      gameAreaRef.current?.appendChild(particle);

      const animation = particle.animate([
        {
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1
        },
        {
          transform: `translate(
            calc(-50% + ${Math.cos(angle) * 100}px), 
            calc(-50% + ${Math.sin(angle) * 100}px)
          ) scale(0)`,
          opacity: 0
        }
      ], {
        duration: 1000,
        easing: 'ease-out'
      });

      animation.onfinish = () => particle.remove();
    }

    setTimeout(() => {
      setCrackers(current => current.filter(c => c.id !== id));
    }, 100);
  };

  return (
    <div className="bg-gradient-to-b from-orange-500/20 to-yellow-500/20 min-h-screen overflow-hidden">
      <NavBar />
      
      <div className="mx-auto px-4 pt-20 container">
        <div className="mb-4 text-center">
          <div className="flex justify-center items-center gap-8 mb-4">
            <div className="font-bold text-2xl">
              Score: {score}
            </div>
            <div className="font-bold text-2xl text-yellow-500">
              High Score: {highScore}
            </div>
          </div>

          {/* Display current number of crackers */}
          <div className="mb-2 text-lg">
            Active Crackers: {crackers.filter(c => !c.exploded).length}/{MAX_CRACKERS_ON_SCREEN}
          </div>

          {/* Lives display
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: INITIAL_LIVES }).map((_, i) => (
              i < lives ? (
                <Heart key={i} className="w-8 h-8 text-red-500" />
              ) : (
                <HeartOff key={i} className="w-8 h-8 text-gray-400" />
              )
            ))}
          </div> */}
          
          {gameOver && (
            <div className="mb-4 font-bold text-4xl text-red-500">
              Game Over!
            </div>
          )}
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={startGame}
              className="bg-blue-500 hover:bg-blue-600 px-8 py-2 rounded-lg text-white"
            >
              {gameOver || !gameStarted ? 'Start Game' : 'Restart'}
            </Button>
            
            <Button 
              onClick={resetHighScore}
              variant="outline"
              className="px-8 py-2 rounded-lg"
            >
              Reset High Score
            </Button>
          </div>
        </div>

        <div 
          ref={gameAreaRef}
          className="relative bg-transparent rounded-lg h-[60vh] overflow-hidden"
        >
          {confetti.map(particle => (
            <div
              key={particle.id}
              className="absolute w-4 h-4"
              style={{
                left: particle.x,
                top: particle.y,
                backgroundColor: particle.color,
                transform: `rotate(${particle.rotation}deg)`,
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                transition: 'transform 0.1s linear'
              }}
            />
          ))}

          {crackers.map(cracker => !cracker.exploded && (
            <div
              key={cracker.id}
              className="absolute transition-all duration-300 cursor-pointer"
              style={{
                left: cracker.x,
                top: cracker.y,
                transform: `scale(${cracker.scale})`,
                transition: 'all 0.05s ease-out'
              }}
              onClick={() => burstCracker(cracker.id)}
            >
              <div
                className="rounded-full w-8 h-8 animate-pulse"
                style={{ backgroundColor: cracker.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;