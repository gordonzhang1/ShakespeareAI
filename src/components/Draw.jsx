import { useState, useEffect, useRef } from "react";
import "../Draw.css";
import { db, auth } from "../../server/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import Fab from "@mui/material/Fab";
import { Zoom, Box } from "@mui/material";
import axios from "axios";
import Stars from "../assets/Stars.png";
import CircularProgress from "@mui/material/CircularProgress";
import BasicMenu from "./Menu";
import Logo from "../assets/logo-tran.png";

export default function Draw() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErase, setIsErase] = useState(false);
  const [canvasData, setCanvasData] = useState([]);
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);
  const [showQuizBox, setShowQuizBox] = useState(false);
  const [quizButtonText, setQuizButtonText] = useState("Quiz Me"); // Initial button text
  const [showButton, setShowButton] = useState(true); // To control animation visibility
  const [AIresponse, setAIresponse] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  let saveTimeout = useRef(null);

  // Save the current canvas as a new drawing in Firestore
  const saveCanvas = async () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();

    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, "canvasData", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const existingData = docSnap.data();
          // Create a copy of the existing canvas data and update the current index
          const updatedCanvasData = [...(existingData.canvasData || [])];
          updatedCanvasData[currentCanvasIndex] = { imageData: dataURL }; // Update only the current canvas

          await setDoc(docRef, { canvasData: updatedCanvasData });
          console.log("Canvas data saved to Firestore");
          setCanvasData(updatedCanvasData); // Update local state
          // No need to change currentCanvasIndex, as it already refers to the current canvas
        }
      } catch (error) {
        console.log("Failed to save data to firestore ", error);
      }
    }
  };

  const debounceSave = () => {
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(saveCanvas, 1500); // Wait for 1.5 seconds before saving
  };

  // Restore the selected canvas from Firestore
  const restoreCanvas = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, "canvasData", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const imageData = docSnap.data().canvasData;
          setCanvasData(imageData || []);
          if (imageData && imageData.length > 0) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.src = imageData[currentCanvasIndex]?.imageData || "";

            img.onload = () => {
              ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
              ctx.drawImage(img, 0, 0);
              console.log("Canvas restored from Firestore");
            };
          }
        }
      } catch (error) {
        console.log("Failed to restore data", error);
      }
    }
  };

  // Initialize canvas and restore saved drawings on page load
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    restoreCanvas();
  }, [currentCanvasIndex]); // Re-run whenever currentCanvasIndex changes

  function erase() {
    setIsErase(true);
  }

  function startDrawing(e) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  }

  function draw(e) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!isDrawing) return;

    if (isErase) {
      const eraserSize = 20;
      ctx.beginPath();
      ctx.arc(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
        eraserSize / 2,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "white"; // Set the fill color to white
      ctx.fill(); // Fill the circle with white to erase the content
    } else {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    debounceSave();
  }

  function stopDrawing(e) {
    setIsDrawing(false);
  }

  function drawtoggle() {
    setIsErase(false);
  }

  function nextCanvas() {
    if (currentCanvasIndex < canvasData.length - 1) {
      setCurrentCanvasIndex(currentCanvasIndex + 1);
    }
  }

  function previousCanvas() {
    if (currentCanvasIndex > 0) {
      setCurrentCanvasIndex(currentCanvasIndex - 1);
    }
  }

  function newCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Create a new blank canvas entry
    const newCanvasData = [...canvasData];

    // Create a blank canvas imageData
    const blankCanvasData = canvas.toDataURL();

    // Insert the blank canvas at the position after the current one
    newCanvasData.splice(currentCanvasIndex + 1, 0, {
      imageData: blankCanvasData,
    });

    // Update local state with the new canvas data
    setCanvasData(newCanvasData);

    // Clear the canvas and draw a blank background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Switch to the new blank canvas by updating the index
    setCurrentCanvasIndex(currentCanvasIndex + 1);
  }
  function clearFrame() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    debounceSave();
  }

  const DeleteCanvas = async () => {
    if (canvasData.length === 0) return;

    // Remove the current canvas from local state
    const newCanvasData = canvasData.filter(
      (_, index) => index !== currentCanvasIndex
    );

    // Get the current user
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, "canvasData", user.uid);

        if (newCanvasData.length === 0) {
          // If no canvases are left, create a new blank canvas
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const blankCanvasData = [{ imageData: canvas.toDataURL() }];
          await setDoc(docRef, { canvasData: blankCanvasData }); // Update Firestore
          setCanvasData(blankCanvasData); // Update local state
          setCurrentCanvasIndex(0); // Reset the index
        } else {
          // Update Firestore with the new canvas data
          await setDoc(docRef, { canvasData: newCanvasData });

          // Adjust the index and update local state
          const newIndex = Math.min(
            currentCanvasIndex,
            newCanvasData.length - 1
          );
          setCanvasData(newCanvasData);
          setCurrentCanvasIndex(newIndex);

          // Load the new canvas at the adjusted index
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          const img = new Image();
          img.src = newCanvasData[newIndex]?.imageData || "";

          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            ctx.drawImage(img, 0, 0);
          };
        }
      } catch (error) {
        console.error("Failed to delete canvas data from Firestore", error);
      }
    }
  };

  function submit() {
    const canvas = canvasRef.current;
    // Hide the button initially
    setShowButton(false);

    // Wait for 150ms, then toggle button text
    setTimeout(() => {
      setQuizButtonText((prevText) =>
        prevText === "Quiz Me" ? "Done" : "Quiz Me"
      ); // Toggle text
      setShowButton(true); // Show the button again after the animation
    }, 150);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("image", blob, "image.png");

      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3000/backend",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response.data);
        setAIresponse(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });

    if (quizButtonText === "Quiz Me") {
      setShowQuizBox(true);
    } else if (quizButtonText === "Done") {
      setShowQuizBox(!showQuizBox);
    }
  }

  return (
    <>
      <div className="canvas-container">
        <div className="page-nav-container">
          <BasicMenu className="draw-menu" />
          <div className="select-con">
            <Button variant="outlined" onClick={previousCanvas}>
              <ArrowBackIosOutlinedIcon />
            </Button>
            <Button variant="contained">{currentCanvasIndex + 1}</Button>
            <Button variant="outlined" onClick={nextCanvas}>
              <ArrowForwardIosOutlinedIcon />
            </Button>
          </div>
        </div>
        <div className="secondr-container">
          <div className="draw-container">
            <Button onClick={drawtoggle} variant="outlined">
              <ModeEditOutlineOutlinedIcon />
            </Button>
            <Button onClick={erase} variant="outlined">
              <AutoFixHighOutlinedIcon />
            </Button>
            <Button onClick={erase} variant="outlined">
              Undo
            </Button>
          </div>
          <div className="canf-container">
            <Button onClick={DeleteCanvas} variant="outlined">
              Delete Page
            </Button>
            <Button variant="outlined" onClick={clearFrame}>
              Clear Page
            </Button>
            <Button variant="outlined" onClick={newCanvas}>
              New Page
            </Button>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          id="canvas"
          width={window.innerWidth * 0.8}
          height={window.innerHeight * 0.8}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        ></canvas>
      </div>
      {showQuizBox && (
        <div className="outer-quiz-box">
          <div id="quizBox" className={loading ? "" : "loaded"}>
            {loading ? (
              <CircularProgress />
            ) : (
              <div className="text-inside-quiz">
                {AIresponse ? (
                  AIresponse.split("?") // Split the response by the '?' character
                    .filter((item) => item.trim() !== "") // Remove empty items
                    .map((question, index) => (
                      <p key={index}>{question.trim()}?</p>
                    ))
                ) : (
                  <p>No response yet</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <Box sx={{ textAlign: "center", marginTop: 20 }} className="quiz-button">
        <Zoom in={showButton} timeout={300}>
          <Button
            className="quiz-button-inner"
            variant="contained"
            onClick={submit}
            sx={{
              fontSize: "16px",
              transition: "all 0.3s ease",
              boxShadow: "none",
              borderRadius: "12px",
              backgroundColor: "#000435",
            }}
          >
            <div className="star-con">
              <img className="stars-img" src={Logo} />
              {quizButtonText}
            </div>
          </Button>
        </Zoom>
      </Box>
    </>
  );
}
