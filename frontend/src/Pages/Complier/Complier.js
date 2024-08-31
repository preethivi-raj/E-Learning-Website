import MonacoEditor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import baseUrl from "../../baseUrl/baseUrl";

const Complier = () => {
  const [output, setOutput] = useState("");
  const [creditsBalance, setCreditsBalance] = useState(0);

  const inputRef = useRef(null);

  const handleRef = (editor, monaco) => {
    inputRef.current = editor;
  };

  const { mutate: compile, isPending } = useMutation({
    mutationFn: async (script) => {
      try {
        const response = await fetch(`${baseUrl}/complier`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ script }),
        });
        const data = await response.json();
     
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: (data) => {
      setOutput(data.output);
    },
    onError: (error) => {
      setOutput(error.message);
    },
  });

  const { mutate: credits } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(
          `${baseUrl}/complier/criedtBalance`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: (data) => {
      setCreditsBalance(data.used);
    },
  });

  const complie = () => {
    const val = inputRef.current.getValue();
    compile(val);
  };

  useEffect(() => {
    credits();
  }, [credits]);

  return (
    <div className="flex flex-col ">
      <p className="flex mb-2 outline justify-center text-sm bg-green-400 text-white rounded-full p-2 mx-auto">
        Credit Used: {creditsBalance}{" "}
      </p>

      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col gap-4 rounded-sm ">
          <MonacoEditor
            height="50vh"
            width="80vw"
            defaultLanguage="javascript"
            defaultValue="console.log('Hello World')"
            theme="vs-dark"
            onMount={handleRef}
          />
          <button
            onClick={complie}
            className="btn uppercase bg-green-500 text-white rounded-lg  mx-auto "
          >
            {isPending ? <Loading /> : "Compile"}
          </button>
        </div>
        <div className="flex">
          <textarea
            className="border-2 lg:max-h-none  lg:max-w-screen-lg lg:w-screen border-gray-300 rounded-lg p-4 bg-black text-white"
            placeholder="Output..."
            defaultValue={output}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Complier;
