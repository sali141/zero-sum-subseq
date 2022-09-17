import { useEffect, useState } from "react";
import "./App.css";
import exampleFile from "./sample/example.in";
import largeFile from "./sample/large.in";

const App = () => {
  const [lines, setLines] = useState([]);
  const [output, setOutput] = useState([]);

  useEffect(() => { // trigers when the changes in lines array
    if (lines.length > 0) {
      const outputList = [];
     
      lines.forEach((line) => {  //itarete lines
        const numberList = line.split(" "); // covernt line text to an array

        if (numberList.length > 1) { // check if list has more than 1 elements
          let hasSubseq = false;

          if (numberList.some((n) => n === "0")) { //check if array has "O" element 
            hasSubseq = true;
          } else {
            hasSubseq = subSeqExists(numberList);
          }
          outputList.push(hasSubseq);
        }
      });
      setOutput(outputList);
    }
  }, [lines]);

  const subSeqExists = (arr) => {
    //=========================================================
    //improved code to compute large number of lines
    //=========================================================
    let sum = 0;
    // generating an array with the list of sum of each subsequent element
    const sumArray = arr.reduce( (a,n) => {
        sum += Number(n);
        a.push(sum);
        return a;
    },[])

    //check if sum array has value 0 or duplicate entries
    return sumArray.includes(0) || (new Set(sumArray)).size !== sumArray.length;

    //=========================================================
    // below code is for small number of lines.
    //=========================================================
    // const sumArray = [];
    // let sum = 0;
    // for (let i = 0; i < arr.length; i++) {
    //   sum += Number(arr[i]);
    //   if (sum === 0 || sumArray.includes(sum)) return true;

    //   sumArray.push(sum);
    // }
    // return false;
  };

  const readSampleFile = (file) => {
    // read file
    fetch(file)
      .then((r) => r.text())
      .then((text) => {
        if (text) {
          // store the file text as an array in lines state variable
          setLines(text.split("\n"));
        }
      });
  };

  return (
    <div className="App">
      <div className="buttons">
        <button onClick={() => readSampleFile(exampleFile)}>
          Click to Test a Sample
        </button>
        <button onClick={() => readSampleFile(largeFile)}>
          Click to Test a Large File
        </button>
      </div>

      <div className="output-console">
        {output.map((line, i) => (
          <pre key={i}>
            {line ? "Yes" : "No"}
          </pre>
        ))}
      </div>
    </div>
  );
}

export default App;
