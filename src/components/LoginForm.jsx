import React from 'react';
import styles from './Login.module.css';

export const LockWarning = ({ timeRemaining, formatTime }) => (
  <div className={styles.lockBox}>
    <p className={styles.lockTitle}>
      <svg style={{width: '20px', height: '20px'}} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
      Cuenta Bloqueada
    </p>
    <div className={styles.lockTime}>{formatTime(timeRemaining)}</div>
  </div>
);

export const ErrorMessage = ({ message }) => (
  <div className={styles.errorBox}>
    <p className={styles.errorText}>{message}</p>
  </div>
);

export const InputField = ({ 
  id, 
  type, 
  value, 
  onChange, 
  placeholder, 
  disabled, 
  onFocus, 
  onBlur,
  showToggle,
  onToggle,
  showPassword 
}) => (
  <div className={styles.inputGroup}>
    <label htmlFor={id} className={styles.label}>
      {id === 'username' ? 'Usuario' : 'Contraseña'}
    </label>
    <div className={styles.inputWrapper}>
      <div className={styles.iconLeft}>
        {id === 'username' ? (
          <svg style={{height: '20px', width: '20px', color: '#9ca3af'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ) : (
          <svg style={{height: '20px', width: '20px', color: '#9ca3af'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        )}
      </div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required
        disabled={disabled}
        placeholder={placeholder}
        className={`${styles.input} ${showToggle ? styles.inputWithIcon : ''}`}
      />
      {showToggle && (
        <button 
          type="button" 
          onClick={onToggle} 
          disabled={disabled}
          className={styles.eyeButton}
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
      )}
    </div>
  </div>
);

export const Spinner = () => (
  <svg className={styles.spinner} fill="none" viewBox="0 0 24 24">
    <circle style={{opacity: 0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path style={{opacity: 0.75}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);