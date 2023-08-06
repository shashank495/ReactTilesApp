import React, { useEffect, useState } from "react";

const DialogBox = ({ data }) => {
  let storedReadData = JSON.parse(localStorage.getItem(`${data.id}`));
  let displayNotification =
    storedReadData !== 10 && storedReadData != undefined
      ? storedReadData
      : data.itemCount;
  let storedClickedData = JSON.parse(localStorage.getItem(`ID${data.id}`));
  let setClickedStore = storedClickedData?.length > 0 ? storedClickedData : [];
  const [isClicked, setIsClicked] = useState(setClickedStore || []);
  const [unread, setUnread] = useState(displayNotification);
  const [randomColor, setRandomColor] = useState("black");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  let isSeenData = new Set();

  const handleDialog = () => {
    setIsDialogOpen(true);
  };

  useEffect(() => {
    const randomColor = getRandomColor();
    setRandomColor(randomColor);
  }, [isDialogOpen]);

  const handleClose = () => {
    setIsDialogOpen(false);
    if (data.id) {
      let arrLength = isClicked.length;
      let currLength = data.itemCount - arrLength;
      localStorage.setItem(`${data.id}`, JSON.stringify(currLength));
      setUnread(currLength);
    }
  };

  const handleRead = (e, val) => {
    isSeenData.add(val);
    let isSeenArr = [...isSeenData];
    setIsClicked([...new Set([...isClicked, ...isSeenArr])]);
    localStorage.setItem(
      `ID${data.id}`,
      JSON.stringify([...new Set([...isClicked, ...isSeenArr])])
    );
    const randomColor = getRandomColor();
    setRandomColor(randomColor);
    console.log("val", val, "isSeenArr", isSeenArr, "local");
  };

  const getRandomColor = () => {
    const colors = ["red", "green", "blue", "orange"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div>
      <div className="totalCount" onClick={handleDialog}>
        {unread}
      </div>
      {isDialogOpen && (
        <div class="modal">
          <div className="dialog">
            <span className="closeDialog" onClick={handleClose}>
              &times;
            </span>
            <p className="dialog-content">
              {data.items.map((c) => {
                return (
                  <p
                    key={c.id}
                    className="DialogContent"
                    style={{
                      color: isClicked.includes(c.id) ? randomColor : "black",
                    }}
                    onClick={(e) => handleRead(e, c.id)}
                  >
                    {c.title}
                  </p>
                );
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DialogBox;
