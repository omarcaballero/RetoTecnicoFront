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
  const [lockInfo, setLockInfo] = useState(null);

  useEffect(() => {
    let interval;
    if (lockInfo && lockInfo.remainingTime > 0) {
      interval = setInterval(() => {
        setLockInfo(prev => {
          if (!prev || prev.remainingTime <= 1) {
            return null;
          }
          return {
            ...prev,
            remainingTime: prev.remainingTime - 1
          };
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [lockInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await login(username, password);
      
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        setLockInfo(null);
        setError('');
        alert('¡Inicio de sesión exitoso! Token guardado.');
      }
    } catch (err) {
        console.log(err);
      if (err.remainingTime !== undefined && err.remainingTime > 0) {
        setLockInfo({
          message: err.message,
          remainingTime: err.remainingTime,
          timestamp: Date.now()
        });
        setError('');
      } else {
        setError(err.message);
        if (err.remainingTime === 0 || err.remainingTime === undefined) {
          setLockInfo(null);
        }
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

  const isLocked = lockInfo && lockInfo.remainingTime > 0;

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
                timeRemaining={lockInfo.remainingTime} 
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