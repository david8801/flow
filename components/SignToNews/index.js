import React, {useState} from 'react';
import styles from "./styles.module.css"
import {MailIcon} from "../../icons/shared";
import {emailRegex} from "../../constants/regex";
import * as keys from "../../helpers/keys";

const SignToNews = ({ type }) => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.match(emailRegex)) {
      setError("Incorrect email format")
      return
    }

    localStorage.setItem(keys.signToNews, "seen")
    setSuccess(true)
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
    setError(false)
  }

  return (
    <div
      id={type ? "" : "subscribe"}
      className={`${styles.signToNewsWrapper} ${type ? styles[type] : ""}`}
    >
      {success
        ? <>
          <span className={styles.title}>Thank you! 🙂</span>
          <span className={styles.subtitle}>The exclusive news and updates are coming soon</span>
        </>
        : <>
          <span className={styles.title}>{type ? "👋" : ""} be updated on the latest ukrainian tech news</span>
          <span className={styles.subtitle}>Get exclusive news updates and overview on tech market</span>
          <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit} className={styles.actions}>
              <MailIcon/>
              <input
                onChange={handleChangeEmail}
                placeholder={"email@example.com"}
              />
              <button type="submit">subscribe</button>
            </form>
            {error && <span className={styles.error}>{error}</span>}
          </div>
        </>
      }
    </div>
  );
};

export default SignToNews;
