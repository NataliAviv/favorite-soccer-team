import React, { useEffect, useState, useCallback } from 'react';
import {
  getSoccerTeams,
  serverGetFavorites,
  serverUpdateFavorites
} from '../../Service';
import Team from '../../components/team/Team';
import './MainPage.css';
import NavBar from '../../components/navbar/NavBar';
function MainPage() {
  const [teams, setTeams] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [fillterTeams, setFillterTeams] = useState([]);

  const getTeams = useCallback(() => {
    getSoccerTeams()
      .then(res => {
        console.log(res);
        const { data } = res;

        if (data.data && Array.isArray(data.data)) {
          setTeams(data.data);
        }
      })
      .catch(e => console.log(e));
  }, []);

  const getFavorites = useCallback(() => {
    serverGetFavorites()
      .then(res => {
        if (res && Array.isArray(res)) {
          setFavorites(res);
        }
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    getTeams();
    getFavorites();
  }, [getTeams, getFavorites]);

  const isInFavorites = id => {
    const isFavorite = favorites.find(favoriteId => favoriteId === id);
    return isFavorite ? true : false;
  };

  const handleTeamFavoriteChange = id => {
    const favortiesList = favorites;
    const isExistIndex = favortiesList.findIndex(favId => favId === id);
    if (isExistIndex !== -1) {
      favortiesList.splice(isExistIndex, 1);
    } else {
      favortiesList.push(id);
    }

    serverUpdateFavorites(favortiesList)
      .then(getFavorites)
      .catch(console.log);
  };

  function handleFilteredArray(filteredArray) {
    if (filteredArray === '') {
      setFillterTeams(teams);
    } else {
      setFillterTeams(filteredArray);
    }
  }
  return (
    <div className='main-page'>
      <NavBar
        teams={teams}
        field={'name'}
        filteredArray={handleFilteredArray}
      />
      <span className='main-title'>List Of Soccer Teams</span>
      <table>
        <thead>
          <tr>
            <th key='crest-title' className='small-text'>
              Crest
            </th>
            <th key='name-title' className='small-text'>
              Name
            </th>
            <th key='founded-title' className='small-text'>
              Year Founded
            </th>
            <th key='favorite-title' className='small-text'>
              Favorite
            </th>
          </tr>
        </thead>
        <tbody style={{ width: '100vw' }}>
          {fillterTeams.map((team, index) => {
            const { legacy_id, name, logo_path, founded } = team;
            return (
              <Team
                key={index}
                value={isInFavorites(legacy_id)}
                onChange={handleTeamFavoriteChange}
                id={legacy_id}
                name={name}
                crest={logo_path}
                yearFounded={founded}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MainPage;
