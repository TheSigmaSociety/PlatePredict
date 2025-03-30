"use client";

import React from "react";
import BarcodeScanner from "@/components/BarcodeScanner";
import WasteScanner from "@/components/WasteScanner";

export default function Page() {
  const [barcode, setBarcode] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const URL = "https://plateprotectbackend.varram.me/";
  function handleBarcode(barcode: string) {
      console.log(barcode);
      setBarcode(barcode);
      fetch(
        `${URL}/get_entry/?student_id=${barcode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          //handle the data
          
        })
        .catch((error) => {
          console.error("Error:", error);
        }
        
      )
  }
  
  function handlePhoto(photo: string) {
      console.log(photo);
      setPhoto(photo);

      if(barcode) {
        fetch(URL + "/add_waste", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: barcode,
            image: photo,
          }),
        }).then((response) => response.json()).then((data) => console.log("Response: ", data)).catch((error) => console.log(error));
      }
      else {
        console.log("Barcode not found");
      }
  } 
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 animated-bg -z-10" />
      <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-transparent">
        <div className="flex gap-8">
          {/* <WasteScanner />
          <BarcodeScanner /> */}
          <WasteScanner onPhotoTaken = {handlePhoto}/>
            <BarcodeScanner onPhotoTaken = {handleBarcode}/>
        </div>
      </div>
    </div>
  );
}