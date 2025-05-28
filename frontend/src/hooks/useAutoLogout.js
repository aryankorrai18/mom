import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const useAutoLogout = (timeout = 10 * 60 * 1000) => {
  const navigate = useNavigate();
  const timerRef = useRef();

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/logout');
      }, timeout);
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timerRef.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [navigate, timeout]);
};

export default useAutoLogout;
