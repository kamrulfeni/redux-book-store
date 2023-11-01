/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

interface MyResponseData {
  error: any;
 // error(arg0: string, error: any): unknown;
  data: {
    url: string;
  };
  status: number;
}
interface ImageUploadProps {
  setImageUrl: (url: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ setImageUrl }) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = e.target.files;

    if (!files || !files[0]) return;

    const file = files[0];

    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      alert("You can only upload JPG/PNG files!");
      return;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      alert("Image must be smaller than 2MB!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post<MyResponseData>(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            key: "2dc5a55c87e2b12334a12e4a99ca665c",
          },
        }
      );

      if (response.data.status === 200) {
        const imageURL = response.data.data.url;
        setLoading(false);
        setImageUrl(imageURL);
      } else {
       
        console.error("Image upload failed:", response.data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="image-upload-input"
        type="file"
        onChange={handleFileChange}
      />

      <div className=" h-full w-full">
        <label htmlFor="image-upload-input">
          <Button
            className="w-full h-12"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            <input type="file" className="w-full" onChange={handleFileChange} />
          </Button>
        </label>
      </div>
    </>
  );
};

/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */

// import React, { useState } from "react";
// //import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import axios from "axios";
// import Button from "react-bootstrap/Button";

// export const ImageUpload = ({ setImageUrl }: any) => {
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;

//     if (!files || !files[0]) return;

//     const file = files[0];

//     const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//     if (!isJpgOrPng) {
//       alert("You can only upload JPG/PNG files!");
//       return;
//     }

//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       alert("Image must be smaller than 2MB!");
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const response = await axios.post(
//         "https://api.imgbb.com/1/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           params: {
//             key: "2dc5a55c87e2b12334a12e4a99ca665c",
//           },
//         }
//       );

//       if (response.data.status === 200) {

//         const imageURL = response.data.data.url;
//         setLoading(false);
//         setImageUrl(imageURL);
//       } else {

//         console.error("Image upload failed:", response.data.error);
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

//   return (
//     <>
//       <input
//         accept="image/*"
//         style={{ display: "none" }}
//         id="image-upload-input"
//         type="file"

//         onChange={handleFileChange}
//       />

//       <div className=" h-full w-full">
//         <label htmlFor="image-upload-input">
//           <Button
//             className="w-full h-12"
//             variant="contained"
//             color="primary"
//             // component="span"
//             // startIcon={loading ? <CloudUploadIcon /> : null}
//             disabled={loading}
//           >
//             <input
//               type="file"
//               className="w-full "

//               onChange={handleFileChange}
//             />
//             {/* {loading ? "Uploading..." : "Upload Image"} */}
//           </Button>
//         </label>
//       </div>
//     </>
//   );
// };
