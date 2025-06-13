import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

  const audioRef = useRef();  
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playerStatus, setPlayerStatus ] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
        seconds: 0,
        minutes: 0,
    },
    totalTime: {
        seconds: 0,
        minutes: 0,
    },
  });


  const play = () => {
    audioRef.current.play();
    setPlayerStatus(true);
  }

  const playwithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayerStatus(true);
  }

  const previous = async () => {
    if(track.id>0){
      await setTrack(songsData[track.id-1]);
      await audioRef.current.play();
      setPlayerStatus(true);
    }
  }
    const next = async () => {
    if(track.id<songsData.length-1){
      await setTrack(songsData[track.id+1]);
      await audioRef.current.play();
      setPlayerStatus(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width = `${(audioRef.current.currentTime / audioRef.current.duration) * 100}%`;

       setTime({
        currentTime: {
            seconds: Math.floor(audioRef.current.currentTime % 60),
            minutes: Math.floor(audioRef.current.currentTime / 60),
        },
        totalTime: {
            seconds: Math.floor(audioRef.current.duration % 60),
            minutes: Math.floor(audioRef.current.duration / 60),
        },
       })
      }
    },1000)
  },[audioRef])


  const pause = () => {
    audioRef.current.pause();
    setPlayerStatus(false);
  }


  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    playwithId,
    previous,
    next,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
