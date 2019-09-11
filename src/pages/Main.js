import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/logo.svg';
import Like from '../assets/like.svg';
import Dislike from '../assets/dislike.svg';
import api from '../services/api';
import './Main.css';


export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/dev/index', {
        headers: {
          user: match.params.id
        }
      })

      setUsers(response.data);
    }
    loadUsers()
  }, [match.params.id])

  async function handleLike(id) {
    api.post(`/dev/${id}/like`,null, {
      headers: {
        user: match.params.id
      }
    });
    setUsers(users.filter((user) => user._id !== id))
  }
  async function handleDislike(id) {
    api.post(`/dev/${id}/dislike`, null, {
      headers: {
        user: match.params.id
      }
    });

    setUsers(users.filter((user) => user._id !== id))
  }

  return (
    <div className="main-container">
      <Link to="/">
      <img src={Logo} alt="Tindev logo" />
      </Link>
      {users.length > 0 ?
        (
          <ul>
            {users.map(user =>
          <li key={user._id} >
              <img
                src={user.avatar}
                alt={user.name}
              />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={Like} alt="Like" />
                </button>

                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={Dislike} alt="Dislike" />
                </button>
              </div>
            </li> )}
            </ul>)
             : (<div className="empty">
              Acabou :(
            </div>)}
    </div>
  );
}

