import { useState, useEffect, useRef } from "react";
import "../Draw.css";
import { db, auth } from "../../server/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export default function Draw() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErase, setIsErase] = useState(false);
  const [canvasData, setCanvasData] = useState([]);
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);

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
    ctx.fillStyle = "beige";
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
      ctx.globalCompositeOperation = "destination-out"; // Use this mode for erasing
      ctx.beginPath();
      ctx.arc(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
        eraserSize / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.globalCompositeOperation = "source-over"; // Reset to default drawing mode
    } else {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
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
    newCanvasData.splice(currentCanvasIndex + 1, 0, {
      imageData: blankCanvasData,
    });

    // Update local state with the new canvas data
    setCanvasData(newCanvasData);

    // Clear the canvas and draw a blank background
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Switch to the new blank canvas by updating the index
    setCurrentCanvasIndex(currentCanvasIndex + 1);
  }

  return (
    <>
      <button onClick={erase}>Erase</button>
      <button onClick={drawtoggle}>Draw</button>
      <button onClick={newCanvas}>New Canvas</button>
      <button onClick={previousCanvas}>Previous Canvas</button>
      <button onClick={nextCanvas}>Next Canvas</button>

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
      <button onClick={saveCanvas}>Save</button>
    </>
  );
}
