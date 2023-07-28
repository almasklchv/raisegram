/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState, useEffect } from "react";
import React from "react";
import Post from "../../components/Post";
import styles from "../../styles/History.module.scss";
import classNames from "classnames";
import axios from "axios";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [hasPosts, setHasPosts] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isAccess, setIsAccess] = useState(true)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [posts, setPosts] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFromLocalStorage = localStorage.getItem('user');
        const currentUrl = window.location.href;
        const urlParams = new URL(currentUrl).searchParams;
        const idFromUrl = urlParams.get("user_id");

        if (idFromUrl == JSON.parse(userFromLocalStorage).data.id) {
          const url = `http://localhost:3333/post/view`;
          const response = await axios.post(url, null, {
            params: {
              authorId: idFromUrl,
            },
          });
          console.log(response)
          setPosts(response.data);
          setHasPosts(response.data.length > 0);
        } else {
          setIsAccess(false)
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!isFetched) {
      fetchData();
      setIsFetched(true)
    }
    
  }, []);

  return (
    <div className={styles.centralizer}>
      <h2 className={styles.title}>История генераций</h2>
      {!hasPosts && isAccess && (
        <div>
          <p className={styles.primaryText}>Вы еще не генерировали посты!</p>
        </div>
      )}
      {hasPosts && posts.map((post, index) => (<Post key={index} {...post} />))}
      {!isAccess &&  <p className={styles.primaryText}>У вас нет доступа к истории данного пользователя!</p>}
    </div>
  );
};

export default page;
