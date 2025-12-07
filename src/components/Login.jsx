import React, { useState, useEffect } from 'react';
import { login } from '../services/auth.service';
import { LockWarning, ErrorMessage, InputField, Spinner } from './LoginForm';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0);

  const MAX_ATTEMPTS = 3;
  const LOCK_DURATION = 300;

  useEffect(() => {
    const lockEndTime = localStorage.getItem('loginLockEndTime');
    if (lockEndTime) {
      const remainingTime = Math.floor((parseInt(lockEndTime) - Date.now()) / 1000);
      if (remainingTime > 0) {
        setIsLocked(true);
        setLockTimeRemaining(remainingTime);
      } else {
        localStorage.removeItem('loginLockEndTime');
        localStorage.removeItem('failedLoginAttempts');
      }
    }

    const savedAttempts = localStorage.getItem('failedLoginAttempts');
    if (savedAttempts) {
      setFailedAttempts(parseInt(savedAttempts));
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isLocked && lockTimeRemaining > 0) {
      interval = setInterval(() => {
        setLockTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setFailedAttempts(0);
            localStorage.removeItem('loginLockEndTime');
            localStorage.removeItem('failedLoginAttempts');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockTimeRemaining]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLocked) return;

    setError('');
    setLoading(true);

    try {
      const tokens = await login(username, password);
      localStorage.setItem('accessToken', tokens.accessToken);
      
      setFailedAttempts(0);
      localStorage.removeItem('failedLoginAttempts');
      localStorage.removeItem('loginLockEndTime');
      
      alert('¡Inicio de sesión exitoso! Token guardado.');
    } catch (err) {
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);
      localStorage.setItem('failedLoginAttempts', newFailedAttempts.toString());

      if (newFailedAttempts >= MAX_ATTEMPTS) {
        const lockEndTime = Date.now() + (LOCK_DURATION * 1000);
        localStorage.setItem('loginLockEndTime', lockEndTime.toString());
        setIsLocked(true);
        setLockTimeRemaining(LOCK_DURATION);
        setError(`Demasiados intentos fallidos. Cuenta bloqueada por ${LOCK_DURATION / 60} minutos.`);
      } else {
        setError(`${err.message} (${newFailedAttempts}/${MAX_ATTEMPTS} intentos)`);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        <div className={styles.glowEffect}></div>
        
        <div className={styles.card}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <svg style={{width: '35px', height: '35px', color: 'white'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <h2 className={styles.title}>Bienvenido</h2>
          <p className={styles.subtitle}>Ingresa tus credenciales para continuar</p>

          <div>
            {isLocked && (
              <LockWarning 
                timeRemaining={lockTimeRemaining} 
                formatTime={formatTime} 
              />
            )}

            <InputField
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              disabled={loading || isLocked}
              onFocus={() => {}}
              onBlur={() => {}}
            />

            <InputField
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              disabled={loading || isLocked}
              onFocus={() => {}}
              onBlur={() => {}}
              showToggle={true}
              onToggle={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            {error && !isLocked && <ErrorMessage message={error} />}

            <button
              onClick={handleSubmit}
              disabled={loading || isLocked}
              className={styles.button}
            >
              {loading ? (
                <span className={styles.buttonContent}>
                  <Spinner />
                  Validando...
                </span>
              ) : isLocked ? (
                'Cuenta Bloqueada'
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>

          <div className={styles.footer}>
            <a href="#" className={styles.link}>¿Olvidaste tu contraseña?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;