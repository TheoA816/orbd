import { useEffect, useState } from 'react';
import PlayButton from '../playbutton/PlayButton';
import styles from './Results.module.css';

const Results = ({ onClick, times }) => {

  const [sec, setSec] = useState(0);
  const [ms, setMs] = useState(0);

  const [secIncr, setSecIncr] = useState(0);
  const [msIncr, setMsIncr] = useState(0);

  const [pb, setPb] = useState(Number(localStorage.getItem("pb")));
  const [newPb, setNewPb] = useState(false);
  const [showPb, setShowPb] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const pad = (n, z) => {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  // set stopwatch effect result
  useEffect(() => {
    const timer = secIncr < sec && setInterval(() => setSecIncr(secIncr + 1), 1500 / sec);
    return () => clearInterval(timer);
  }, [secIncr, sec])

  useEffect(() => {
    const timer = msIncr < ms && setInterval(() => setMsIncr(msIncr + 1), 2000 / ms);
    return () => clearInterval(timer);
  }, [msIncr, ms])

  // show pb and restart button
  useEffect(() => {
    if (msIncr === ms && secIncr === sec) {
      const pbTimer = setTimeout(() => {setShowPb(true)}, 200);
      const btnTimer = setTimeout(() => {setShowBtn(true)}, 500);
      return (() => {
        clearTimeout(pbTimer);
        clearTimeout(btnTimer);
      });
    }
  }, [msIncr])

  // set seconds and milliseconds and find pb
  useEffect(() => {
    const roundTime = times.current.end - times.current.start;
    setNewPb(false);
    if (pb === 0 || roundTime < pb) {
      setPb(roundTime);
      setNewPb(true);
      localStorage.setItem("pb", roundTime);
    }
    setSec(Math.floor(roundTime / 1000));
    setMs(roundTime % 1000)
  }, [times])

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.container}>
          <span className={styles.time}>
            <span className={styles.sec}>{pad(secIncr)}</span>
            <span>:</span>
            <span className={styles.ms}>{pad(msIncr, 3)}</span>
          </span>
          { showPb && <span className={styles.pb}>{newPb ? "New Personal Best" : "PB: " + pb / 1000.0}</span> }
          { showBtn && <PlayButton onClick={onClick} text={"Restart"} /> }
        </div>
      </div>
    </>
  )
}

export default Results