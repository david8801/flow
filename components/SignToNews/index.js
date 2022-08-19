import React from 'react';
import styles from "./styles.module.css"
import {MailIcon} from "../../icons/shared";

const SignToNews = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={styles.signToNewsWrapper}>
      <span className={styles.title}>Be Updated on the Latest Ukrainian IT News </span>
      <span className={styles.subtitle}>Get exclusive news updates and overview on tech market</span>
      <form onSubmit={handleSubmit} className={styles.actions}>
        <MailIcon/>
        <input placeholder={"email@example.com"} type="email"/>
        <button type="submit">subscribe</button>
      </form>
    </div>
  );
};

export default SignToNews;
