import React, { useEffect, useState } from "react";
import DialogBox from "./DialogBox";
import Header from "./Header";

const Tiles = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [isHandleSearchCalled, SetIsHandleSearchCalled] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const url = "https://jsonplaceholder.typicode.com/albums";
    try {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data, "data");
          let cardData = data;
          let uniqueUserIds = [...new Set(cardData.map((c) => c.userId))];
          const usersData = uniqueUserIds.map((userId) => {
            const userAlbums = cardData.filter((c) => c.userId === userId);
            const itemCount = userAlbums.length;
            const items = userAlbums.map((album) => ({
              id: album.id,
              title: album.title,
            }));
            let userName = getRandomName();
            let fullName = userName + userId;
            return {
              id: userId,
              itemCount,
              items,
              fullName: fullName,
            };
          });
          setData(usersData);
        });
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleSearch = (e) => {
    setSearchData(e.target.value);
    SetIsHandleSearchCalled(true);
    if (e.target.value !== "") {
      const results = data.filter((item) => {
        return item.fullName
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
      SetIsHandleSearchCalled(false);
    }
  };

  const getRandomName = () => {
    const names = ["aaa", "bbb", "ccc", "ddd", "eee", "fff", "ggg", "hhh"];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  };

  return (
    <>
      <Header search={handleSearch} value={searchData} />
      {searchResults.length !== 0 ? (
        <div className="contentBox">
          {searchResults.map((item) => (
            <div className="mainTile" key={item.id}>
              <div className="circle">
                <div className="homeIcon">&#127968;</div>
                <div className="fullName">{item.fullName}</div>
              </div>
              <DialogBox data={item} />
            </div>
          ))}
        </div>
      ) : (
        <p className="noResultFound">
          {isHandleSearchCalled ? "No Matching Result" : ""}
        </p>
      )}

      {searchResults.length === 0 && searchData === "" && (
        <div className="contentBox">
          {data.map((c) => {
            return (
              <div className="mainTile" key={c.id}>
                <div className="circle">
                  <div className="homeIcon">&#127968;</div>
                  <div className="fullName">{c.fullName}</div>
                </div>
                <DialogBox data={c} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Tiles;
