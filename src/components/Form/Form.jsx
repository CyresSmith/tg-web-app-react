import { useCallback, useEffect, useState } from 'react';
import styles from './Form.module.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
  const { tg } = useTelegram();

  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [subject, setSubject] = useState('');

  const handleDataSend = useCallback(() => {
    const data = {
      country,
      street,
      subject,
    };

    tg.sendData(JSON.stringify(data));
  }, [country, street, subject, tg]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', handleDataSend);

    return () => {
      tg.offEvent('mainButtonClicked', handleDataSend);
    };
  }, [handleDataSend, tg, tg.MainButton]);

  useEffect(() => {
    if (!country || !street) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street, tg.MainButton]);

  useEffect(() => {
    tg.MainButton.setParams({ text: 'Send Data' });
  }, [tg.MainButton]);

  const handleCountryChange = e => setCountry(e.target.value);

  const handleStreetChange = e => setStreet(e.target.value);

  const handleSubjectChange = e => setSubject(e.target.value);

  return (
    <form className={styles.form}>
      <h3>Enter Your Data</h3>

      <input
        id="Country"
        className={styles.input}
        type="text"
        placeholder="Country"
        onChange={handleCountryChange}
        value={country}
      />

      <input
        id="Street"
        className={styles.input}
        type="text"
        placeholder="Street"
        onChange={handleStreetChange}
        value={street}
      />

      <select
        id="Subject"
        className={styles.select}
        onChange={handleSubjectChange}
        value={subject}
      >
        <option value="physical">Physical subject</option>
        <option value="legal">Legal subject</option>
      </select>
    </form>
  );
};

export default Form;
