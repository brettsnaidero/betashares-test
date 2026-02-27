import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
