// // "use client";
// // import { useState } from "react";

// // const DeepSeekChat = () => {
// //   const [input, setInput] = useState("");
// //   const [response, setResponse] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null); // ✅ Allow string

// //   const handleGenerate = async () => {
// //     if (!input.trim()) return;
// //     setLoading(true);
// //     setResponse(null);
// //     setError(null);

// //     try {
// //       const res = await fetch("/api/deepseek", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ prompt: input }),
// //       });

// //       if (!res.ok) {
// //         throw new Error(`Server error: ${res.statusText}`);
// //       }

// //       const data = await res.json();

// //       if (data?.response) {
// //         setResponse(data.response);
// //       } else {
// //         setError("No valid response from DeepSeek"); // ✅ Now it works
// //       }

// //     } catch (err: unknown) {
// //       console.error("Fetch error:", err);

// //       // ✅ Proper error handling
// //       if (err instanceof Error) {
// //         setError(err.message);
// //       } else {
// //         setError("Error fetching response");
// //       }
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <div className="flex flex-col items-center p-4">
// //       <textarea
// //         className="w-full p-2 text-black rounded-md"
// //         rows={3}
// //         placeholder="Enter your query..."
// //         value={input}
// //         onChange={(e) => setInput(e.target.value)}
// //       />
// //       <button
// //         onClick={handleGenerate}
// //         className="mt-2 px-4 py-2 bg-blue-500 rounded-lg text-white"
// //         disabled={loading}
// //       >
// //         {loading ? "Generating..." : "Ask DeepSeek"}
// //       </button>

// //       {error && <p className="text-red-500 mt-2">{error}</p>}

// //       {response && (
// //         <div className="mt-4 w-full text-center p-3 bg-gray-200 rounded-md">
// //           <p>{response}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default DeepSeekChat;
 



// //? DEEPSEEK API


// // "use client";
// // import { useState } from "react";

// // const AIImageGenerator = () => {
// //   const [input, setInput] = useState("");
// //   const [response, setResponse] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   const handleGenerate = async () => {
// //     if (!input.trim()) return;
// //     setLoading(true);
// //     setResponse(null);
// //     setError(null);

// //     try {
// //       const res = await fetch("/api/deepseek", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ prompt: input }),
// //       });

// //       if (!res.ok) {
// //         throw new Error(`Server error: ${await res.text()}`);
// //       }

// //       const data = await res.json();

// //       if (data?.response) {
// //         setResponse(data.response);
// //       } else {
// //         setError("Invalid response from API");
// //       }

// //     } catch (err) {
// //       console.error("Fetch error:", err);
// //       setError(err instanceof Error ? err.message : "Error fetching response");
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <div className="flex flex-col items-center p-4">
// //       <textarea
// //         className="w-full p-2 text-black rounded-md"
// //         rows={3}
// //         placeholder="Enter image description..."
// //         value={input}
// //         onChange={(e) => setInput(e.target.value)}
// //       />
// //       <button
// //         onClick={handleGenerate}
// //         className="mt-2 px-4 py-2 bg-blue-500 rounded-lg text-white"
// //         disabled={loading}
// //       >
// //         {loading ? "Generating..." : "Generate Image"}
// //       </button>

// //       {error && <p className="text-red-500 mt-2">{error}</p>}

// //       {response && (
// //         <div className="mt-4 w-full text-center p-3 bg-gray-200 rounded-md">
// //           <p>{response}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AIImageGenerator;











//   "use client";
// import React, { useState } from "react";

// const AIImageGenerator = () => {
//   const [input, setInput] = useState("");
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleGenerate = async () => {
//     if (!input.trim()) return;
//     setLoading(true);
//     setImageUrl(null);
//     setError(null);

//     try {
//       const res = await fetch("/api/huggingface", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: input }),
//       });

//       const data = await res.json();
//       if (data.imageUrl) {
//         setImageUrl(data.imageUrl);
//       } else {
//         setError("Failed to generate image");
//       }
//     } catch (err) {
//       setError("Error generating image");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center p-4">
//       <textarea
//         className="w-full p-2 text-black rounded-md"
//         rows={3}
//         placeholder="Enter image description..."
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />
//       <button
//         onClick={handleGenerate}
//         className="mt-2 px-4 py-2 bg-blue-500 rounded-lg text-white"
//         disabled={loading}
//       >
//         {loading ? "Generating..." : "Generate Image"}
//       </button>

//       {error && <p className="text-red-500 mt-2">{error}</p>}

//       {imageUrl && (
//         <div className="mt-4 w-full text-center">
//           <img src={imageUrl} alt="Generated" className="mt-4 rounded-md max-w-full" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default AIImageGenerator;

















// "use client";
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion"; // ✅ Animation Import

// const AIImageGenerator = () => {
//   const [input, setInput] = useState("");
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [quote, setQuote] = useState("");

//   const API_URL = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5";
//   const HF_API_KEY = process.env.NEXT_PUBLIC_HF_API_KEY;

//   // ✅ Unique Quotes List
//   const funnyQuotes = [
//     "Error 404: Brain not found! 🤯",
//     "Wi-Fi went down for five minutes, so I had to talk to my family. They seem like nice people. 😂",
//     "The best way to predict the future is to create it! 🚀",
//     "There are 10 types of people in this world: those who understand binary and those who don’t. 🤖",
//     "I’m not arguing, I’m just explaining why I’m right. 😆",
//     "Artificial Intelligence is no match for natural stupidity. 😜",
//     "Have you tried turning it off and on again? 🛠️",
//     "Tech is like magic, but with more debugging. 🧙‍♂️",
//     "Code is poetry, until it throws an error. 🤦‍♂️",
//     "I told my Wi-Fi we were out of money. Now it won’t connect. 💸",
//     "My password is 5 stars. ⭐⭐⭐⭐⭐",
//     "Behind every great developer, there’s a half-written bug report. 📝",
//     "Ctrl + Alt + Del: My solution for every problem. 🔥",
//     "Why don’t programmers like nature? Too many bugs! 🐞",
//     "Life is like JavaScript: Sometimes it just doesn’t make sense. 😂",
//   ];

//   // ✅ Function to Generate Random Quote with Animation
//   const updateQuote = () => {
//     const newQuote = funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)];
//     setQuote(newQuote);
//   };

//   useEffect(() => {
//     updateQuote(); // Initial quote on load
//   }, []);

//   // ✅ AI Image Generator Function
//   const handleGenerate = async () => {
//     if (!input.trim()) return;
//     setLoading(true);
//     setImageUrl(null);
//     setError(null);
//     updateQuote(); // ✅ Update quote when button is clicked

//     try {
//       let attempts = 0;
//       let data = null;

//       while (attempts < 5) {
//         const res = await fetch(API_URL, {
//           method: "POST",
//           headers: { 
//             "Authorization": `Bearer ${HF_API_KEY}`, 
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({ inputs: input }),
//         });

//         data = await res.json();

//         if (!data.error || !data.error.includes("currently loading")) {
//           break;
//         }

//         console.log(`❌ Model Loading... Retrying in 10 seconds...`);
//         await new Promise((resolve) => setTimeout(resolve, 10000));
//         attempts++;
//       }

//       if (data && data.image) {
//         setImageUrl(data.image);
//       } else {
//         setError("Failed to generate image");
//       }
//     } catch (err) {
//       setError("API request failed");
//     }

//     setLoading(false);
//   };

//   // ✅ Download Image Function
//   const handleDownload = () => {
//     if (imageUrl) {
//       const link = document.createElement("a");
//       link.href = imageUrl;
//       link.download = "generated_image.png";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-4">🚀 AI Image Generator</h1>
      
//       {/* ✅ Animated Quote */}
//       <AnimatePresence mode="wait">
//         <motion.p
//           key={quote} // Unique key for smooth animation
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 10 }}
//           transition={{ duration: 0.5 }}
//           className="text-gray-600 italic text-lg mb-4 text-center"
//         >
//           {quote}
//         </motion.p>
//       </AnimatePresence>

//       <textarea
//         className="w-full p-3 text-black rounded-md border border-gray-300 shadow-sm"
//         rows={3}
//         placeholder="Enter image description..."
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />

//       <button
//         onClick={handleGenerate}
//         className="mt-3 px-5 py-2 bg-blue-600 rounded-lg text-white font-medium shadow-md hover:bg-blue-700 transition"
//         disabled={loading}
//       >
//         {loading ? "Generating..." : "Generate Image"}
//       </button>

//       {error && <p className="text-red-500 mt-2">{error}</p>}

//       {/* ✅ Show Generated Image & Download Button */}
//       {imageUrl && (
//         <div className="mt-6 text-center">
//           <img src={imageUrl} alt="Generated" className="rounded-lg shadow-lg max-w-full" />
//           <button
//             onClick={handleDownload}
//             className="mt-3 px-5 py-2 bg-green-600 rounded-lg text-white font-medium shadow-md hover:bg-green-700 transition"
//           >
//             Download Image
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AIImageGenerator;













"use client";
import React, { useState } from "react";

const AIChatBot = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MISTRAL_API_KEY = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;
  const API_URL = "https://api.mistral.ai/v1/chat/completions";

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse("");
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral-medium",
          messages: [{ role: "user", content: input }],
        }),
      });

      const data = await res.json();
      console.log("API Response:", data); // Debugging

      if (res.ok && data.choices) {
        setResponse(data.choices[0].message.content);
      } else {
        setError(data.error?.message || "Failed to get response");
      }
    } catch (err: unknown) {
      let errorMessage = "API request failed";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🤖 AI Chatbot (Mistral AI)</h1>
      
      <textarea
        className="w-full p-3 text-black rounded-md border border-gray-300 shadow-sm"
        rows={3}
        placeholder="Enter your question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="mt-3 px-5 py-2 bg-blue-600 rounded-lg text-white font-medium shadow-md hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {response && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-lg text-gray-800">
          <p className="font-semibold">AI Response:</p>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;
