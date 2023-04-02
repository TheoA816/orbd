import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../config/useAxiosPrivate';
import PlayButton from '../playbutton/PlayButton';
import styles from './Results.module.css';

type resultsProps = {
    onClick: () => void,
    times: React.MutableRefObject<{
        start: number;
        end: number;
    }>
}

const Results = ({ onClick, times }: resultsProps) => {

  const [sec, setSec] = useState(0);
  const [ms, setMs] = useState(0);

  const [secIncr, setSecIncr] = useState(0);
  const [msIncr, setMsIncr] = useState(0);

  const [pb, setPb] = useState(0);
  const [newPb, setNewPb] = useState(false);
  const [showPb, setShowPb] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const pad = (n: number, z?: number) => {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  // set seconds and milliseconds and find pb
  useEffect(() => {
    const updatePb = async () => {

      let best_time;
      try {
        const stats = await axiosPrivate.get('/user/stats');
        best_time = stats.data.best_time;
        if (best_time !== null) setPb(best_time);
        else best_time = -1;
      } catch {
        best_time = -1;
      }
      
      const roundTime = times.current.end - times.current.start;
      console.log(roundTime + " " + pb)
      setNewPb(false);
      setSec(Math.floor(roundTime / 1000));
      setMs(roundTime % 1000);
      
      if (best_time < 0 || roundTime < best_time) {
        setPb(roundTime);
        setNewPb(true);
      }

      await axiosPrivate.post('/user/update', { best_time: roundTime });
    }
    updatePb();
  }, [times, axiosPrivate])

  // set stopwatch effect result
  useEffect(() => {
    const timer = (secIncr < sec) ? setInterval(() => setSecIncr(secIncr + 1), 1500 / sec) : undefined;
    return () => clearInterval(timer);
  }, [secIncr, sec])

  useEffect(() => {
    const timer = (msIncr < ms) ? setInterval(() => setMsIncr(msIncr + 1), 2000 / ms) : undefined;
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