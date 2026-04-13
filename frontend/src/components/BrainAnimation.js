import React from 'react';
import './BrainAnimation.css';
import { 
  FaJava, FaPython, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaDocker, FaPhp, FaAndroid, FaReact 
} from 'react-icons/fa';
import { 
  SiJavascript, SiC, SiCplusplus, SiTypescript, SiKotlin, SiSwift, SiLinux, SiMysql 
} from 'react-icons/si';

const BrainAnimation = () => {
  const icons = [
    { component: <FaPython size={40} color="#306998" />, radius: 180, speed: 10, tilt: 0 },
    { component: <SiJavascript size={40} color="#F7DF1E" />, radius: 200, speed: 12, tilt: 10 },
    { component: <FaJava size={40} color="#007396" />, radius: 220, speed: 14, tilt: -10 },
    { component: <FaHtml5 size={40} color="#E34F26" />, radius: 180, speed: 11, tilt: 5 },
    { component: <FaCss3Alt size={40} color="#1572B6" />, radius: 200, speed: 13, tilt: -5 },
    { component: <FaNodeJs size={40} color="#339933" />, radius: 220, speed: 15, tilt: 15 },
    { component: <FaGitAlt size={40} color="#F05032" />, radius: 240, speed: 16, tilt: -15 },
    { component: <FaDocker size={40} color="#2496ED" />, radius: 260, speed: 18, tilt: 20 },
    { component: <FaReact size={40} color="#61DAFB" />, radius: 180, speed: 12, tilt: -20 },
    { component: <SiC size={40} color="#00599C" />, radius: 200, speed: 14, tilt: 25 },
    { component: <SiCplusplus size={40} color="#00599C" />, radius: 220, speed: 16, tilt: -25 },
    { component: <SiTypescript size={40} color="#3178C6" />, radius: 240, speed: 13, tilt: 30 },
    { component: <SiKotlin size={40} color="#0095D5" />, radius: 260, speed: 17, tilt: -30 },
    { component: <SiSwift size={40} color="#F05138" />, radius: 280, speed: 19, tilt: 35 },
    { component: <SiLinux size={40} color="#FCC624" />, radius: 300, speed: 20, tilt: -35 },
    { component: <SiMysql size={40} color="#4479A1" />, radius: 320, speed: 21, tilt: 40 },
    { component: <FaPhp size={40} color="#777BB4" />, radius: 340, speed: 22, tilt: -40 },
    { component: <FaAndroid size={40} color="#3DDC84" />, radius: 360, speed: 23, tilt: 45 },
  ];

  return (
    <div className="brain-container">
      <div className="brain">🧠</div>
      {icons.map((icon, index) => (
        <div
          key={index}
          className="symbol"
          style={{
            '--radius': `${icon.radius}px`,
            '--speed': `${icon.speed}s`,
            '--tilt': `${icon.tilt}deg`
          }}
        >
          {icon.component}
        </div>
      ))}
    </div>
  );
};

export default BrainAnimation;
