import React, { useState } from 'react';
import { login } from '../services/auth.service';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tokens = await login(username, password);
      localStorage.setItem('accessToken', tokens.accessToken);
      alert('¡Inicio de sesión exitoso! Token guardado.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    cardWrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: '420px'
    },
    glowEffect: {
      position: 'absolute',
      inset: '-2px',
      background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
      borderRadius: '24px',
      filter: 'blur(20px)',
      opacity: 0.6,
      animation: 'pulse 2s ease-in-out infinite'
    },
    card: {
      position: 'relative',
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)'
    },
    logoContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px'
    },
    logo: {
      width: '70px',
      height: '70px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      textAlign: 'center',
      color: '#1f2937',
      marginBottom: '8px'
    },
    subtitle: {
      textAlign: 'center',
      color: '#6b7280',
      fontSize: '15px',
      marginBottom: '35px'
    },
    inputGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    inputWrapper: {
      position: 'relative'
    },
    iconLeft: {
      position: 'absolute',
      left: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none'
    },
    input: {
      width: '100%',
      padding: '14px 14px 14px 45px',
      fontSize: '15px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      fontFamily: 'inherit'
    },
    inputFocus: {
      border: '2px solid #8b5cf6',
      boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)'
    },
    inputDisabled: {
      backgroundColor: '#f3f4f6',
      cursor: 'not-allowed'
    },
    inputWithIcon: {
      paddingRight: '45px'
    },
    eyeButton: {
      position: 'absolute',
      right: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    errorBox: {
      backgroundColor: '#fef2f2',
      borderLeft: '4px solid #ef4444',
      padding: '14px',
      borderRadius: '8px',
      marginBottom: '20px'
    },
    errorText: {
      color: '#dc2626',
      fontSize: '14px',
      margin: 0
    },
    button: {
      width: '100%',
      padding: '16px',
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
      fontFamily: 'inherit'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none'
    },
    buttonContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    footer: {
      marginTop: '24px',
      textAlign: 'center'
    },
    link: {
      color: '#8b5cf6',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'color 0.2s'
    }
  };

  const [buttonHover, setButtonHover] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 0.8; }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spinner {
            animation: spin 1s linear infinite;
            marginRight: '12px';
          }
        `}
      </style>
      
      <div style={styles.cardWrapper}>
        <div style={styles.glowEffect}></div>
        
        <div style={styles.card}>
          <div style={styles.logoContainer}>
            <div style={styles.logo}>
              <svg style={{width: '35px', height: '35px', color: 'white'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <h2 style={styles.title}>Bienvenido</h2>
          <p style={styles.subtitle}>Ingresa tus credenciales para continuar</p>

          <div>
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>Usuario</label>
              <div style={styles.inputWrapper}>
                <div style={styles.iconLeft}>
                  <svg style={{height: '20px', width: '20px', color: '#9ca3af'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setUsernameFocus(true)}
                  onBlur={() => setUsernameFocus(false)}
                  required
                  disabled={loading}
                  placeholder="Ingresa tu usuario"
                  style={{
                    ...styles.input,
                    ...(usernameFocus && styles.inputFocus),
                    ...(loading && styles.inputDisabled)
                  }}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Contraseña</label>
              <div style={styles.inputWrapper}>
                <div style={styles.iconLeft}>
                  <svg style={{height: '20px', width: '20px', color: '#9ca3af'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  required
                  disabled={loading}
                  placeholder="Ingresa tu contraseña"
                  style={{
                    ...styles.input,
                    ...styles.inputWithIcon,
                    ...(passwordFocus && styles.inputFocus),
                    ...(loading && styles.inputDisabled)
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? (
                    <svg style={{height: '20px', width: '20px', color: '#9ca3af'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg style={{height: '20px', width: '20px', color: '#9ca3af'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div style={styles.errorBox}>
                <p style={styles.errorText}>{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
              style={{
                ...styles.button,
                ...(buttonHover && !loading && styles.buttonHover),
                ...(loading && styles.buttonDisabled)
              }}
            >
              {loading ? (
                <span style={styles.buttonContent}>
                  <svg className="spinner" style={{width: '20px', height: '20px', marginRight: '12px'}} fill="none" viewBox="0 0 24 24">
                    <circle style={{opacity: 0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{opacity: 0.75}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Validando...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>

          <div style={styles.footer}>
            <a href="#" style={styles.link}>¿Olvidaste tu contraseña?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;