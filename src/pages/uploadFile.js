import { getFirebase } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const { storage } = getFirebase();

export default function uploadFile(file, path, filename, setUrl) {
  let fileExt = file.type.substring(
    file.type.lastIndexOf("/") + 1,
    file.type.length
  );

  const storageRef = ref(storage, `${path}/${filename}.${fileExt}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(progress);
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setUrl(downloadURL);
      });
    }
  );
}
