import React, { useEffect } from "react";
import axios from "axios";
import ClipLoader from 'react-spinners/ClipLoader';
import { useSelector, useDispatch } from "react-redux";
import { setSummary, setLoading } from "../app/promptSlice"; // Replace with the actual path to your Redux slice
function Display() {
  const dispatch = useDispatch();
  const prompt = useSelector((state) => state.prompt);
  const load = useSelector((state) => state.isLoading);
  const summary = useSelector((state) => state.summary);

  useEffect(() => {
    const fetchData = async () => {
      if (prompt) {
        dispatch(setLoading(true)); // Set loading to true

        try {
          console.log("Diplay Request");
          dispatch(setSummary(prompt));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(setLoading(false)); // Set loading to false
        }
      } else {
        // Set a default message when prompt is empty
        dispatch(
          setSummary("Hello! What Medical Condition You Want To Know About?")
        );
      }
    };

    fetchData();
  }, [dispatch, prompt]);

  const renderContent = () => {
    if (load) {
      return (
        <div className="loader-container flex">
          <h3>Loading </h3>
          <ClipLoader color={'#fff'} size={10} />
        </div>
      );
    } else {
      // Split the summary into sections based on headers
      const sections = summary.split("\n\n"); // Adjust the separator based on your content structure

      return (
        <div>
          {sections.map((section, index) => (
            <p key={index}>{section}</p>
          ))}
      
        </div>
      );
    }
  };

  return (
    <div className="h-[80vh] overflow-scroll p-9 text-white">
      {renderContent()}
      
    </div>
  );
}

export default Display;
