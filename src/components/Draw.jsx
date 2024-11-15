import { useState, useEffect, useRef } from "react";
import "../Draw.css";
import { db, auth } from "../../server/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
export default function Draw() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErase, setIsErase] = useState(false);

  const saveCanvas = async () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();

    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, "canvasData", user.uid);

        await setDoc(docRef, { imageData: dataURL });
        console.log("data saved to firestore");
      } catch (error) {
        console.log("Failed to save data to firestore ", error);
      }
    }
  };

  const restoreCanvas = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, "canvasData", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const imageData = docSnap.data().imageData;
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          const img = new Image();
          img.src = imageData;

          img.onload = () => {
            ctx.drawImage(img, 0, 0);
            console.log("Canvas restored from Firestore");
          };
        }
      } catch (error) {
        console.log("Failed to restore data", error);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    restoreCanvas();
  }, []);

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

  return (
    <>
      <button onClick={erase}>Erase</button>
      <button onClick={drawtoggle}>Draw</button>

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
