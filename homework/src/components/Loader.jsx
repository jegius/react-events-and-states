import React from 'react';

export default function Loader() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinner} />
      <span>Загрузка...</span>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  spinner: {
    width: '40px',
    height: '40px',
    marginBottom: '0.5rem',
    border: '5px solid #ccc',
    borderTop: '5px solid #4A90E2',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};