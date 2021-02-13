import React, { useState, useEffect } from 'react';
import './Team.css';
import { getHeartSvg } from '../../images/heart';

function Team({ id, crest, onChange, value, name, yearFounded }) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (value) {
      setIsSelected(true);
    }
  }, [value]);

  return (
    <tr className='team-card-container'>
      <td>
        <img className='crest-image' alt='crest' src={crest} />
      </td>
      <td>
        <span className='small-text'>{name}</span>
      </td>
      <td>
        <span className='small-text'>{yearFounded}</span>
      </td>
      <td>
        <div onClick={handleSelected} className='he-row'>
          {getHeartSvg(isSelected)}
        </div>
      </td>
    </tr>
  );

  function handleSelected() {
    setIsSelected(!isSelected);
    onChange && onChange(id);
  }
}

export default Team;
