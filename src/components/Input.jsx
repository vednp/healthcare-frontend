import React from "react";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import { useDispatch } from "react-redux";
import { setLoading, setPrompt } from "../app/promptSlice";
import { useState } from "react";
import axios from "axios";
function Input() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const iconStyle = {
    color: "rgb(203 213 225",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true));
    try {
      const response = await axios.post("http://127.0.0.1:5000/prompt", {
        prompt: input,
      });

      setInput(" ");
      dispatch(setLoading(false));
      console.log("Input Request");
      console.log(response.data);
      dispatch(setPrompt(response.data.text));

    } catch (error) {
      console.error("Error sending prompt:", error);
    } finally {
      dispatch(setLoading(false)); // Set loading to false
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <input
            className="bg-black border border-slate-400 w-4/5 h-14 rounded-3xl pl-6 text-white"
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter Your Medical Condition Here"
          />
          <span onClick={handleSubmit} className="cursor-pointer">
            <SendSharpIcon className="mt-4 ml-4" style={iconStyle} />
          </span>
        </div>
      </form>
    </div>
  );
}

export default Input;
